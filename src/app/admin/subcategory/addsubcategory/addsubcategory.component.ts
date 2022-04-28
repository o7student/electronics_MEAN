import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/admin/category/category.service';
import { SubcategoryService } from 'src/app/shared/admin/subcategory/subcategory.service';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {

  addForm = new FormGroup({
    subCategory_name: new FormControl(),
    categoryId: new FormControl(),
    image: new FormControl(),
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private category: CategoryService, private router: Router, private subcategory: SubcategoryService) { }

  ngOnInit(): void {
    this.getcategory()
  }

  allcategory = []
  getcategory() {
    this.spinner.show()
    this.category.listcategory().subscribe(
      (res: any) => {
        this.spinner.hide()
        this.allcategory = res.data
      },
      err => {
        this.spinner.hide()
      }
    )
  }

  upload(evnt: any) {
    if (evnt.target.files[0]) {
      this.addForm.patchValue({ image: evnt.target.files[0] })
    }
  }

  submit() {
    this.spinner.show()
    const data = new FormData()
    data.append('categoryId', this.addForm.value.categoryId)
    data.append('subCategory_name', this.addForm.value.subCategory_name)
    data.append('image', this.addForm.value.image)
    this.subcategory.addsubcategory(data).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.toastr.success('success', 'Sub Category insert successfully')
        this.router.navigateByUrl("/adminlayout/listsubcategory")
      },
      err => {
        this.spinner.hide()
        console.log(err)
        this.router.navigateByUrl("/adminlayout/listsubcategory")
      }
    )
  }

}
