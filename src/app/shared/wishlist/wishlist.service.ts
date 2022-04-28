import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  addWishList(form: any){
    return this.http.post(this.BaseURL+"/customer/wishlist", form)
  }

  getWishList(id: any){
    return this.http.get(this.BaseURL+"/customer/wishlist/"+id)
  }

  deleteWishList(id: any){
    return this.http.delete(this.BaseURL+"/customer/wishlist/"+id)
  }

}
