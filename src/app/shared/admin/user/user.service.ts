import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BaseURL: any
  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any) {
    this.BaseURL = _baseurl
  }

  list(form:any){
    return this.http.post(this.BaseURL+"/admin/allUsers",form)
  }


}
