import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { RoleValue } from '../interface/role-value';
import { UserModel } from '../interface/user-model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  
  roles : string[] =[];
  enums = RoleValue;
  userId: any;

  updateUserForm: UserModel = new userForm();

  @ViewChild("userForm")
  userForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.roles= Object.keys(RoleValue).filter(x=>parseInt(x)>=0)
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.getUserById(this.userId);
  }

  getUserById(userId:any){
    this.userService.getUserDetailById(userId).subscribe((data:any)=>{
      console.log(data)
      if(data.ok){
        var resultData = data.body;
        if (resultData) {
          this.updateUserForm.Id = resultData.id;
          this.updateUserForm.FirstName = resultData.firstName;
          this.updateUserForm.LastName = resultData.lastName;
          this.updateUserForm.Email = resultData.email;
          this.updateUserForm.Password = resultData.password;
          this.updateUserForm.RoleId = resultData.roleId;
        }
      }
    }),
    (error : any) => this.toastr.error("Can't load user");
  }

  AddUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.userService.updateUser(this.updateUserForm).subscribe(async data => {
        console.log(data);
        if (data != null && data.body != null && data.ok) {
          var resultData = data.body;
          this.toastr.success(resultData.message);
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 500);
        });
    }
  }
}

export class userForm implements UserModel {
  Id: number=0;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Password: string = "";
  RoleId: number = 2;
}
