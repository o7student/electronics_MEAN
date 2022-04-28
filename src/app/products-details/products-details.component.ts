import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart/cart.service';
import { OrderService } from '../shared/order/order.service';
import { ProductService } from '../shared/product/product.service';
import { UserdataService } from '../shared/userdata/userdata.service';
import { WishlistService } from '../shared/wishlist/wishlist.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  id: any
  imageURL = ''
  productData: any
  dataform:any
  wishform:any

  formModel = {
    quantity: '',
    category_id : '',
    product_id: '',
    user_id:''
  }

  constructor(private product: ProductService, private router: Router, private route: ActivatedRoute, private order: OrderService,
    private wishlist: WishlistService, private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any, private userdata: UserdataService, private cartservice : CartService, private toastr : ToastrService) {
    this.imageURL = _imageurl
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL+"/" + photoname)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.getCategoryList()
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.getProductById()

    })
  }

  getProductById() {
    this.product.getProductById(this.id).subscribe(
      (res: any) => {
        // this.spinner.hide()
        // console.log(res.data)
        this.productData = res.data
      },
      err => {
        // this.spinner.hide()
        // console.log(err)
      }
    )
  }

  cartarray:any = Array()
  cat_id : any
  pro_id : any
  qty : any
  usr_id : any
  cartobj :any = Array

  cart(cat_id:any){
    if(this.userdata.getToken != null)
    {
      this.usr_id = this.userdata.getUserId()
      if(!this.formModel.quantity)
      {
        this.qty = 1
      }
      else{
        this.qty = this.formModel.quantity
      }

      this.product.getProductById(this.id).subscribe(
        (res:any)=>{
          console.log(res.data)
          // this.cartobj = {
          //   'category_id' : res.data.category_id,
          //   'product_id' : res.data,
          //   'quantity' : this.qty
          // }
          // this.cartarray.push(this.cartobj)
          // // console.log(this.cartarray)
          // sessionStorage.setItem('cart',JSON.stringify(this.cartarray))
          // sessionStorage.setItem('cartcount',this.cartarray.length)

          this.formModel.user_id = this.usr_id
          this.formModel.category_id = res.data.category_id._id
          this.formModel.product_id = res.data._id
          this.formModel.quantity = this.qty

          // console.log(this.formModel)
          this.cartservice.addcartList(this.formModel).subscribe(
            (resp:any)=>{
              this.toastr.success("Success",'Added to Cart')
              setTimeout(() => {
                window.location.reload()
              }, 2000);
            },
            err=>{

            }
          )
        },
        err=>{
        }
      )
    }
    else{
      this.router.navigateByUrl('/layout/login')
    }
    // console.log(sessionStorage.getItem('cart'))
    // console.log(sessionStorage.getItem('cartcount'))
  }

  placeOrder(){
    this.dataform = {
      "user_id": "abc",
      "total_amount": "BLOG",
      "category_id": true,
      "product_id": true,
      "quantity": true,
      "price_per_item": true,
      "is_coupoun_applied": true,
      "coupon_discount": true,
      "coupon_id": true
    }

    this.order.makeOrder(this.dataform).subscribe(
      (res: any) => {
        if (res.message = "Login successfully") {
          console.log(res)
          // this.spinner.hide()
          // this.toastr.success('Member Logged In Successfully!', 'SUCCESS', { positionClass: 'toast-bottom-right' });
          // this.userdata.setData(res)
          this.router.navigateByUrl('/layout/home')
        }

        else {
          console.log(res.error)
          // this.spinner.hide()
          // this.toastr.error('res.message', 'ERROR', { positionClass: 'toast-bottom-right' });
        }

      },
    )
  }

  addWishlist(){
    this.wishform = {
      "user_id": this.userdata.getUserId(),
      "category_id": this.productData.category_id,
      "product_id": this.productData._id
    }

    this.wishlist.addWishList(this.wishform).subscribe(
      (res: any) => {
        if (res.message = "Added to wishlist") {
          console.log(res)
          // this.spinner.hide()
          // this.toastr.success('Member Logged In Successfully!', 'SUCCESS', { positionClass: 'toast-bottom-right' });
          // this.userdata.setData(res)
          this.router.navigateByUrl('/layout/products')
        }

        else {
          console.log(res.error)
          // this.spinner.hide()
          // this.toastr.error('res.message', 'ERROR', { positionClass: 'toast-bottom-right' });
        }

      },
    )
  }

}
