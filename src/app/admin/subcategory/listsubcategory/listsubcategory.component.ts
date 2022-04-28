import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubcategoryService } from 'src/app/shared/admin/subcategory/subcategory.service';

@Component({
  selector: 'app-listsubcategory',
  templateUrl: './listsubcategory.component.html',
  styleUrls: ['./listsubcategory.component.css']
})
export class ListsubcategoryComponent implements OnInit {

  imageURL=''
  constructor(private spinner : NgxSpinnerService, private subcategory : SubcategoryService,private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any) {
    this.imageURL = _imageurl
  }

  ngOnInit(): void {
    this.getsubcategory()
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }

  allsubcategory = []
  getsubcategory(){
    this.spinner.show()
    this.subcategory.listsubcategory().subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.allsubcategory = res.data
      },
      err=>{
        this.spinner.hide()
      }
    )
  }

}
