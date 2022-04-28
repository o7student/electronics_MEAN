import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart/cart.service';
import { CouponService } from 'src/app/shared/coupon/coupon.service';
import { OrderService } from 'src/app/shared/order/order.service';
import { UserdataService } from 'src/app/shared/userdata/userdata.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  couponData = []
  placeOrderForm = {
    user_id : String,
    total_amount : '',
    category_id : Array,
    product_id : Array,
    quantity : Array,
    price_per_item : Array,
    is_coupoun_applied : false,
    coupon_discount:'',
    coupon_id : '',
    name:'',
    email:'',
    contact:'',
    shipping_address:'',
    card_number:'',
    cvv:'',
    expiry_date:''
  }

  u_id :any
  constructor(private coupon : CouponService, private spinner : NgxSpinnerService, private toastr : ToastrService, private userdata : UserdataService, private order : OrderService, private route : Router, private cartservice : CartService) { }

  isLoggedIn:boolean = false

  ngOnInit(): void {
    if(this.userdata.getToken() != null){
     this.isLoggedIn = true
     this.u_id = this.userdata.getUserId()
     this.placeOrderForm.user_id = this.u_id
     this.getCart()
     this.getCoupons()
    }
    else{
      this.route.navigateByUrl('/layout/login')
    }

  }

  cartarray: any = Array()
  data : any = Array()
  new_category_array:any = Array()
  new_product_array:any = Array()
  new_quantity_array:any = Array()
  new_price_per_item_array:any = Array()
  cartlenght = 0
  getCart(){
    // this.cartarray = (sessionStorage.getItem('cart'))
    // this.data = JSON.parse(this.cartarray)
    this.cartservice.getcartList(this.userdata.getUserId()).subscribe(
      (res:any)=>{
        // console.log(res)
        this.data = res.data
        this.cartlenght = res.data.length
        for(var c_cart =0;c_cart<res.data.length;c_cart++)
        {
          // console.log(res.data[c_cart])
          this.new_category_array.push(res.data[c_cart].category_id._id)
          this.new_product_array.push(res.data[c_cart].product_id._id)
          this.new_price_per_item_array.push(res.data[c_cart].product_id.product_price)
          this.new_quantity_array.push(res.data[c_cart].quantity)
        }

        this.placeOrderForm.category_id = this.new_category_array
        this.placeOrderForm.product_id = this.new_product_array
        this.placeOrderForm.quantity = this.new_quantity_array
        this.placeOrderForm.price_per_item = this.new_price_per_item_array

        // console.log(this.placeOrderForm)
      },
      err=>{

      }
    )
    // console.log(this.data.length)


  }

  getCoupons() {
    this.spinner.show()
    this.coupon.getCoupon().subscribe(
      (res: any) => {
        if (res.message = "Coupon loaded") {
          // console.log(res.data)
          this.spinner.hide()
          // this.toastr.success('User Logged In Successfully!', 'SUCCESS', { positionClass: 'toast-bottom-right' });
          this.couponData=res.data
        }

        else {
          // console.log(res.error)
          this.spinner.hide()
          // this.toastr.error('res.message', 'ERROR', { positionClass: 'toast-bottom-right' });
        }

      },
    )
  }

  removeCart(_id:any)
  {
    console.log('remove')
    // sessionStorage.removeItem('cart')
    // sessionStorage.removeItem('cartcount')
    // window.location.reload()
    this.cartservice.deletecartList(_id).subscribe(
      (res:any)=>{
        this.toastr.success('Success','Item removed from cart')
        this.getCart()
      },
      err=>{

        this.toastr.error('Error','Try Again')
      }
    )
  }

  applyCoupon(event:any)
  {
    // console.log(event.target.value)
    this.coupon.getCouponById(event.target.value).subscribe(
      (res:any)=>{
        // console.log(res.data)
        this.placeOrderForm.is_coupoun_applied = true
        this.placeOrderForm.coupon_discount = res.data.offer_amount
        this.placeOrderForm.coupon_id = res.data._id
        this.toastr.success('Success' , 'Coupon applied Successfully')
      },
      err=>{
        this.placeOrderForm.is_coupoun_applied = true
        this.placeOrderForm.coupon_discount = ''
        this.placeOrderForm.coupon_id = ''
        this.toastr.warning('Warning' , 'Invalid or removed coupon')
      }
    )
  }

  placeOrder(){
    console.log('HELLO')
      this.spinner.show()
    // console.log(this.placeOrderForm)
    this.order.makeOrder(this.placeOrderForm).subscribe(
      (res:any)=>{
        this.spinner.hide()
        // console.log(res)
        // sessionStorage.removeItem('cart')
        // sessionStorage.removeItem('cartcount')
        this.cartservice.deletecart(this.u_id).subscribe(
          (resp:any)=>{

          },
          err=>{

          }
        )
        this.toastr.success('Success',res.message)
        this.route.navigateByUrl('/layout/home')
      },
      err=>{
        this.spinner.hide()
        // console.log(err)
        this.toastr.error('Error','Something Went Wrong Try Again')
      }
    )
  }
}
