import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/admin/category/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  addcategoryForm = new FormGroup({
    category_name : new FormControl(),
    image : new FormControl(),
  })

  constructor(private spinner : NgxSpinnerService, private toastr : ToastrService, private category : CategoryService, private router : Router) { }

  ngOnInit(): void {

  }

  upload(evnt:any){
    if(evnt.target.files[0])
    {
      this.addcategoryForm.patchValue({image:evnt.target.files[0]})
    }
  }

  submit(){
    this.spinner.show()
    const data = new FormData()
    data.append('category_name',this.addcategoryForm.value.category_name)
    data.append('image',this.addcategoryForm.value.image)
    this.category.addcategory(data).subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.toastr.success('success','Category insert successfully')
        this.router.navigateByUrl("/adminlayout/listcategory")
      },
      err=>{
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listcategory")
      }
    )
  }

}
