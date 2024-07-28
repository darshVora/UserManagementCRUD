import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { RoleValue } from '../interface/role-value';
import { UserModel } from '../interface/user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  roles : string[] =[];
  enums = RoleValue;
  addUserForm: UserModel = new userForm();

  @ViewChild("userForm")
  userForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.roles= Object.keys(RoleValue).filter(x=>parseInt(x)>=0)
  }

  ngOnInit(): void {  }
  AddUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      console.log(this.addUserForm);
      this.userService.addUser(this.addUserForm).subscribe(async data => {
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
