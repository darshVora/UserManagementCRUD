import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { UserModel } from '../interface/user-model';

var apiUrl = "http://localhost:5265";

var httpLink = {
  getAllUsers: apiUrl + "/api/User/GetUsers",
  deleteUserById: apiUrl + "/api/User/DeleteUser",
  getUserDetailById: apiUrl + "/api/User/GetUser",
  addUser: apiUrl + "/api/User/AddUser",
  editUser: apiUrl + "/api/User/EditUser"
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private webApiService: WebApiService) { }

  public getAllUser(): Observable<UserModel[]> {
    return this.webApiService.get(httpLink.getAllUsers);
  }
  public deleteUserById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteUserById + '/' + model, "");
  }
  public getUserDetailById(model: any): Observable<UserModel> {
    return this.webApiService.get(httpLink.getUserDetailById + '/' + model);
  }
  public addUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.addUser, model);
  }
  public updateUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.editUser, model);
  }  
}                          