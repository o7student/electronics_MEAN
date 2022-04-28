import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  getCoupon(){
    return this.http.get(this.BaseURL+"/customer/coupon")
  }

  getCouponById(id: any){
    return this.http.get(this.BaseURL+"/customer/coupon/"+id)
  }

}
