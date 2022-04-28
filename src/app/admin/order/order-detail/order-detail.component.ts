import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from 'src/app/shared/admin/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  id : any
  constructor(private spinner : NgxSpinnerService, private order : OrderService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.show()
  }

  orderdata : any
  orderproducts = []

  show(){
    this.spinner.show()
    this.order.orderdetail({'id':this.id}).subscribe(
      (res:any)=>{
        this.spinner.hide()
        // console.log(res.data)
        this.orderdata = res.data
        this.orderproducts = res.data.order_detail
        // console.log(this.orderdata)
      },
      err=>{
        this.spinner.hide()

      }
    )
  }
}
