import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/shared/admin/category/category.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {

  imageURL=''
  constructor(private spinner : NgxSpinnerService, private category : CategoryService,private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any) {
    this.imageURL = _imageurl
  }

  ngOnInit(): void {
    this.getcategory()
  }
  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }
  allcategory = []
  getcategory(){
    this.spinner.show()
    this.category.listcategory().subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.allcategory = res.data
      },
      err=>{
        this.spinner.hide()
      }
    )
  }

}
