import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/admin/category/category.service';
import { SubcategoryService } from 'src/app/shared/admin/subcategory/subcategory.service';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.css']
})
export class EditsubcategoryComponent implements OnInit {


  addForm = new FormGroup({
    subCategory_name: new FormControl(),
    categoryId: new FormControl(),
    subCategory_image: new FormControl(),
  })

  id: any
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private category: CategoryService, private router: Router, private subcategory: SubcategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    this.edit()
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

  edit() {
    this.spinner.show()
    this.subcategory.singlesubcategory(this.id).subscribe(
      (res: any) => {
        this.spinner.hide()
        // console.log(res.data)
        this.addForm.patchValue({ subCategory_name: res.data.subCategory_name })
        this.addForm.patchValue({ categoryId: res.data.categoryId })
      }, err => {
        this.spinner.hide()
      }
    )
  }

  upload(evnt: any) {
    if (evnt.target.files[0]) {
      this.addForm.patchValue({ subCategory_image: evnt.target.files[0] })
    }
  }

  submit() {
    this.spinner.show()
    const data = new FormData()
    data.append('categoryId', this.addForm.value.categoryId)
    data.append('subCategory_name', this.addForm.value.subCategory_name)
    data.append('subCategory_image', this.addForm.value.subCategory_image)
    this.subcategory.updatesubcategory(data, this.id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.toastr.success('success', 'Sub Category update successfully')
        this.router.navigateByUrl("/adminlayout/listsubcategory")
      },
      err => {
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listsubcategory")
      }
    )
  }


}
