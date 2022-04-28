import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/admin/category/category.service';
import { ProductService } from 'src/app/shared/admin/product/product.service';
import { SubcategoryService } from 'src/app/shared/admin/subcategory/subcategory.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  addForm = new FormGroup({
    category_id: new FormControl(),
    product_name: new FormControl(),
    product_price: new FormControl(),
    description: new FormControl(),
    author_name: new FormControl(),
    image: new FormControl(),
    discount_applicable: new FormControl(),
    discounted_price: new FormControl(),
    stock: new FormControl(),
    subCategory_id: new FormControl(),
  })

  id: any
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private category: CategoryService, private suubcategory: SubcategoryService, private router: Router, private product: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getcategory()
    this.getsubcategory()
    this.edit()
  }

  edit() {
    this.spinner.show()
    this.product.single(this.id).subscribe(
      (res:any)=>{
        this.spinner.hide()
        // console.log(res.data)
        this.addForm.patchValue({category_id:res.data.category_id._id})
        this.addForm.patchValue({subCategory_id:res.data.subCategory_id ? res.data.subCategory_id._id : ''})
        this.addForm.patchValue({product_name:res.data.product_name})
        this.addForm.patchValue({product_price:res.data.product_price})
        this.addForm.patchValue({description:res.data.description})
        this.addForm.patchValue({author_name:res.data.author_name})
        this.addForm.patchValue({discounted_price:res.data.discounted_price})
        this.addForm.patchValue({stock:res.data.stock})
      },
      err=>{
        this.spinner.hide()

      }
    )
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
    if (this.addForm.value.discounted_price) {
      this.addForm.patchValue({ 'discount_applicable': true })
    }
    else {
      this.addForm.patchValue({ 'discount_applicable': false })
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

    this.product.update(data,this.id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.toastr.success('success', 'Product update successfully')
        this.router.navigateByUrl("/adminlayout/listproduct")
      },
      err => {
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listproduct")
      }
    )
  }

}
