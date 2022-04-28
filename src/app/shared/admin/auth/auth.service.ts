import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setdata(res: any) {
    // console.log(res)
    localStorage.setItem('email', res.data.email)
    localStorage.setItem('_id', res.data._id)
    localStorage.setItem('token', res.token)
  }

  public getToken() {
    localStorage.getItem('token')
  }

  public getemail() {
    localStorage.getItem('email')
  }

  public getid() {
    localStorage.getItem('_id')
  }

  public removedata() {
    localStorage.removeItem('_id')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
  }

}
