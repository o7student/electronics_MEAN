import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  login(form: any){
    console.log(this.BaseURL)
    return this.http.post(this.BaseURL+"/customer/login", form)
  }

}
