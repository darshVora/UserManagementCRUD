import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../Service/user.service';
import { UserModel } from '../interface/user-model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from '../Service/message-service.service';
import { RoleValue } from '../interface/role-value';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: any = [];
  constructor(private router: Router,private http: HttpClient,
              private httpProvider : UserService,private modalService: BsModalService,
              private messageService : MessageService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllUsers()
  }

  async getAllUsers() {
    this.httpProvider.getAllUser().subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.users = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.users = [];
            }
          }
        }
      });
  }

  AddUser() {
    this.router.navigate(['AddUser']);
  }

  deleteUserConfirmation(User: any) {
    this.messageService.confirm(
      "Delete User",
      "Are you sure you want to proceed?",
      ["Yes", "No"])
      .subscribe((answer:any) => {
        if(answer == 'Yes'){
          this.deleteUser(User);
        }
        else{
          console.log(answer);
        }
      });
  }

  deleteUser(User: any) {
    this.httpProvider.deleteUserById(User.id).subscribe((data : any) => {
      if (data != null && data.ok) {
        this.toastr.success(data.body.message);
        this.getAllUsers();
      }
    },
    (error : any) => {});
  }

  getRoleName(roleId:any){
    var roleName = RoleValue[roleId];
    return roleName;
  }
}
