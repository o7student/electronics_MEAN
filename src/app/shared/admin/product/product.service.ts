import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BaseURL: any

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any) {
    this.BaseURL = _baseurl
  }

  add(form:any){
    return this.http.post(this.BaseURL+"/admin/addProduct",form);
  }

  list(){
    return this.http.get(this.BaseURL+"/admin/getAllproduct");
  }

  single(id:any){
    return this.http.get(this.BaseURL+"/admin/getProductById/"+id);
  }

  update(form:any,id:any){
    return this.http.post(this.BaseURL+"/admin/updateProduct/"+id,form);
  }

}
