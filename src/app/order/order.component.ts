import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../shared/order/order.service';
import { UserdataService } from '../shared/userdata/userdata.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService, private toastr : ToastrService, private order : OrderService, private userdata : UserdataService) { }

  UserId:any
  ngOnInit(): void {
    this.UserId = this.userdata.getUserId()
    this.getOrders()
  }

  orderForm :any
  orderdata = []
  getOrders(){
    this.spinner.show()
    this.orderForm = {
      user_id : this.UserId
    }
    this.order.getMyOrder(this.orderForm).subscribe(
      (res:any)=>{
        this.spinner.hide()
        // console.log(res.data)
        this.orderdata = res.data
      },
      err=>{
        this.spinner.hide()

      }
    )
  }

  cnclorderForm :any
  cancelOrder(_id:any){
    this.spinner.show()
    this.cnclorderForm = {
      order_status : 'cancel'
    }
    this.order.cancelsMyOrder(_id,this.cnclorderForm).subscribe(
      (res:any)=>{
        this.spinner.hide()
        // console.log(res.data)
        this.toastr.success('Success','Your order has been successfully cancelled')
        this.getOrders()
      },
      err=>{
        this.toastr.error(err.message, 'Error')
        this.spinner.hide()

      }
    )
  }

}
