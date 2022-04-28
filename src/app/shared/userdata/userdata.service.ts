import { Injectable } from '@angular/core';
import { UsersessionService } from '../usersession/usersession.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private usersession: UsersessionService) { }

  public setData(userdata: any) {
    // console.log(userdata)
    sessionStorage.setItem("email", userdata.user.email)
    sessionStorage.setItem("token", userdata.token)
    sessionStorage.setItem("name", userdata.user.name)
    sessionStorage.setItem("userId", userdata.user._id)

    this.usersession.setSession(true)
  }

  public getData(){
    return sessionStorage.getItem("email")
  }

  public getToken(){
    return sessionStorage.getItem("token")
  }

  public getName(){
    return sessionStorage.getItem("name")
  }

  public getUserId(){
    return sessionStorage.getItem("userId")
  }

  public removeData() {
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("role")

    this.usersession.setSession(false)
  }
}
