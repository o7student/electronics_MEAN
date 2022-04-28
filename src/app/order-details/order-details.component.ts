import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../shared/order/order.service';
import { UserdataService } from '../shared/userdata/userdata.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  formModel = {
    'order_id':'',
    'rate':'',
    'review':''
  }
  constructor(private spinner : NgxSpinnerService, private toastr : ToastrService, private order : OrderService, private userdata : UserdataService, private route : ActivatedRoute) { }

  orderId:any
  UserId:any
  ngOnInit(): void {
    this.UserId = this.userdata.getUserId()
    this.orderId = this.route.snapshot.paramMap.get('id')
    this.getOrders()
  }

  orderdata :any
  getOrders(){
    this.spinner.show()
    console.log("Order Id is ")
    console.log(this.orderId)
    this.order.myorderdetail(this.orderId).subscribe(
      (res:any)=>{
        this.spinner.hide()
        console.log("order data")
        console.log(res.data)
        this.orderdata = res.data
      },
      err=>{
        this.spinner.hide()

      }
    )
  }

  submit(){
    this.spinner.show()
    this.formModel.order_id = this.orderId
    console.log(this.formModel)
    this.order.feedback(this.formModel).subscribe(
      (res:any)=>{
        this.spinner.hide()
        // console.log(res)
        this.toastr.success('Success',res.message)
      },
      err=>{
        this.spinner.hide()

      }
    )
  }

}
