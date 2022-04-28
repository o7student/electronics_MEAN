import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from 'src/app/shared/admin/subcategory/subcategory.service';
import { ProductService } from 'src/app/shared/product/product.service';
import { UserdataService } from 'src/app/shared/userdata/userdata.service';
import { WishlistService } from 'src/app/shared/wishlist/wishlist.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  productData = []
  imageURL:any

  wishlistForm = {
    user_id: '',
    product_id: '',
    category_id: ''
  }
  u_id: any
  constructor(private product: ProductService, private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any, private router: Router, private route: ActivatedRoute, private userdata: UserdataService, private wish: WishlistService, private toastr: ToastrService, private spinner: NgxSpinnerService, private subcategory: SubcategoryService) {
    this.imageURL = _imageurl
  }

  id: any = ''

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.customergetproductbycategory()
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }

  eventClick(id: any) {
    this.router.navigateByUrl("/layout/products-info/" + id)
  }

  customergetproductbycategory() {
    this.spinner.show()
    this.subcategory.subcatBycategory(this.id).subscribe(
      (res: any) => {
        this.spinner.hide()
        // console.log(res.data)
        this.productData = res.data
      },
      err => {
        this.spinner.hide()
        // console.log(err)
      }
    )
  }
  wishlist(_id: any) {
    if (this.userdata.getUserId() != null) {
      this.u_id = this.userdata.getUserId()
      this.product.getProductById(_id).subscribe(
        (res: any) => {
          this.wishlistForm.user_id = this.u_id
          this.wishlistForm.product_id = _id
          this.wishlistForm.category_id = res.data.category_id._id

          // console.log(this.wishlistForm)
          this.wish.addWishList(this.wishlistForm).subscribe(
            (res: any) => {
              this.toastr.success('Success', 'Product Added To wishlist')
            },
            err => {

            }
          )
        },
        err => {

        }
      )

    }
    else {
      this.router.navigateByUrl('/layout/login')
    }
  }
}
