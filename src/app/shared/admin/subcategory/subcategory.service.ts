import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  BaseURL: any
  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any) {
    this.BaseURL = _baseurl
  }

  addsubcategory(form: any) {
    return this.http.post(this.BaseURL + "/admin/addSubCategory", form);
  }

  listsubcategory() {
    return this.http.get(this.BaseURL + "/admin/getSubCategory");
  }

  singlesubcategory(id: any) {
    return this.http.get(this.BaseURL + "/admin/getSubCategoryById/" + id);
  }

  updatesubcategory(form: any, id: any) {
    return this.http.post(this.BaseURL + "/admin/updateSubcategory/" + id, form);
  }

  subcatBycategory(id: any) {
    return this.http.get(this.BaseURL + "/customer/getSubCategoryById/" + id);
  }

}
