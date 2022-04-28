import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/admin/category/category.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  addcategoryForm = new FormGroup({
    category_name : new FormControl(),
    category_image : new FormControl(),
  })

  id : any
  constructor(private spinner : NgxSpinnerService, private toastr : ToastrService, private category : CategoryService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    this.edit()
  }

  edit(){
    this.spinner.show()
    this.category.singlecategory(this.id).subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.addcategoryForm.patchValue({category_name : res.data.category_name})
      },err=>{
        this.spinner.hide()
      }
    )
  }

  upload(evnt:any){
    if(evnt.target.files[0])
    {
      this.addcategoryForm.patchValue({category_image:evnt.target.files[0]})
    }
  }

  submit(){
    this.spinner.show()
    const data = new FormData()
    data.append('category_name',this.addcategoryForm.value.category_name)
    data.append('category_image',this.addcategoryForm.value.category_image)
    this.category.updatecategory(data,this.id).subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.toastr.success('success','Category update successfully')
        this.router.navigateByUrl("/adminlayout/listcategory")
      },
      err=>{
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listcategory")
      }
    )
  }

}
