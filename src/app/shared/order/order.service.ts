import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  makeOrder(form: any){
    return this.http.post(this.BaseURL+"/customer/order", form)
  }

  getMyOrder(form: any){
    return this.http.post(this.BaseURL+"/customer/myorder", form)
  }

  myorderdetail(id: any){
    return this.http.get(this.BaseURL+"/customer/myorder/"+id)
  }

  cancelsMyOrder(id:any,form: any){
    // console.log(this.BaseURL+"/customer/order/"+id)
    return this.http.patch(this.BaseURL+"/customer/order/"+id, form)
  }
  feedback(form: any){
    return this.http.post(this.BaseURL+"/customer/reviews", form)
  }
}
