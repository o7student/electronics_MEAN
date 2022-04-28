import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  register(form: any){
    return this.http.post(this.BaseURL+"/customer/register", form)
  }
}
