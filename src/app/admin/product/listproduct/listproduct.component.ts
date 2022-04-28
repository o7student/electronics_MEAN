import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/shared/admin/category/category.service';
import { ProductService } from 'src/app/shared/admin/product/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  imageURL=''
  constructor(private spinner : NgxSpinnerService, private product : ProductService,private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any) {
    this.imageURL = _imageurl
  }

  ngOnInit(): void {
    this.getproduct()
  }
  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }
  allproduct = []
  getproduct(){
    this.spinner.show()
    this.product.list().subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.allproduct = res.data
      },
      err=>{
        this.spinner.hide()
      }
    )
  }

}
