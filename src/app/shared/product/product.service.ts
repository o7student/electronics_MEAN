import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BaseURL = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private userdata: UserdataService) {
    this.BaseURL = _baseurl
  }

  getAllProducts(){
    return this.http.get(this.BaseURL+"/customer/getAllproduct")
  }

  getProductById(id:any){
    return this.http.get(this.BaseURL+"/customer/getProductById/"+id)
  }

  getDiscountedProduct(id:any){
    return this.http.get(this.BaseURL+"/customer/getDiscountedProduct")
  }

  customergetproductbycategory(id:any){
    return this.http.get(this.BaseURL+"/customer/customergetproductbycategory/"+id)
  }

  customergetproductbysubcategory(id:any){
    return this.http.get(this.BaseURL+"/customer/customergetproductbysubcategory/"+id)
  }

}
