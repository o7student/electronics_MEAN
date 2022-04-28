import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BaseURL: any
  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any) {
    this.BaseURL = _baseurl
  }

  addcategory(form:any){
    return this.http.post(this.BaseURL+"/admin/addCategory",form);
  }

  listcategory(){
    return this.http.get(this.BaseURL+"/admin/getcategory");
  }

  singlecategory(id:any){
    return this.http.get(this.BaseURL+"/admin/getCategoryById/"+id);
  }

  updatecategory(form:any,id:any){
    return this.http.post(this.BaseURL+"/admin/updateCategory/"+id,form);
  }

  deletecategory(id:any){
    return this.http.delete(this.BaseURL+"/admin/deleteCategory/"+id);
  }

}
