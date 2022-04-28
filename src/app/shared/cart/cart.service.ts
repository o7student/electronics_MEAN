import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  addcartList(form: any){
    return this.http.post(this.BaseURL+"/customer/cart", form)
  }

  getcartList(id: any){
    return this.http.get(this.BaseURL+"/customer/cart/"+id)
  }

  deletecartList(id: any){
    return this.http.delete(this.BaseURL+"/customer/cart/"+id)
  }
  deletecart(id: any){
    // console.log(this.BaseURL+"/customer/deletecart/"+id)
    return this.http.delete(this.BaseURL+"/customer/deletecart/"+id)
  }

}
