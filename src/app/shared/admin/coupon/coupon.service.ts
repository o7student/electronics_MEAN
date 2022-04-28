import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  BaseURL: any
  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any) {
    this.BaseURL = _baseurl
  }

  add(form:any){
    return this.http.post(this.BaseURL+"/admin/coupon",form);
  }

  list(){
    return this.http.get(this.BaseURL+"/admin/coupon");
  }

  delete(id:any){
    return this.http.delete(this.BaseURL+"/admin/coupon/"+id);
  }

}
