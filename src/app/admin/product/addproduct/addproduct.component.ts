import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/admin/category/category.service';
import { ProductService } from 'src/app/shared/admin/product/product.service';
import { SubcategoryService } from 'src/app/shared/admin/subcategory/subcategory.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  addForm = new FormGroup({
    category_id: new FormControl(),
    product_name: new FormControl(),
    product_price: new FormControl(),
    description : new FormControl(),
    author_name: new FormControl(),
    image: new FormControl(),
    discount_applicable: new FormControl(),
    discounted_price: new FormControl(),
    stock: new FormControl(),
    subCategory_id: new FormControl(),
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private category: CategoryService, private suubcategory: SubcategoryService, private router: Router, private product : ProductService) { }

  ngOnInit(): void {
    this.getcategory()
    this.getsubcategory()
  }

  upload(evnt: any) {
    if (evnt.target.files[0]) {
      this.addForm.patchValue({ image: evnt.target.files[0] })
    }
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

  allsubcategory = []
  getsubcategory() {
    this.spinner.show()
    this.suubcategory.listsubcategory().subscribe(
      (res: any) => {
        this.spinner.hide()
        this.allsubcategory = res.data
      },
      err => {
        this.spinner.hide()
      }
    )
  }

  submit() {
    this.spinner.show()
    const data = new FormData()
    if(this.addForm.value.discounted_price)
    {
      this.addForm.patchValue({'discount_applicable':true})
    }
    else{
      this.addForm.patchValue({'discount_applicable':false})
    }

    data.append('category_id', this.addForm.value.category_id)
    data.append('subCategory_id', this.addForm.value.subCategory_id)
    data.append('product_name', this.addForm.value.product_name)
    data.append('product_price', this.addForm.value.product_price)
    data.append('description', this.addForm.value.description)
    data.append('author_name', this.addForm.value.author_name)
    data.append('discount_applicable', this.addForm.value.discount_applicable)
    data.append('discounted_price', this.addForm.value.discounted_price)
    data.append('stock', this.addForm.value.stock)
    data.append('image', this.addForm.value.image)

    this.product.add(data).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.toastr.success('success', 'Product insert successfully')
        this.router.navigateByUrl("/adminlayout/listproduct")
      },
      err => {
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listproduct")
      }
    )
  }

}
