import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/admin/order/order.service';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.css']
})
export class AllorderComponent implements OnInit {


  constructor(private spinner: NgxSpinnerService, private order: OrderService, private toastr : ToastrService) {
  }

  ngOnInit(): void {
    this.getorder()
  }

  allorder = []
  getorder() {
    this.spinner.show()
    this.order.list({}).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.allorder = res.data
        // console.log(this.allorder)
      },
      err => {
        this.spinner.hide()
      }
    )
  }

  updateOrderstatus(id:any,status:any){
    // console.log(id)
    this.spinner.show()
    this.order.changeOrder({'order_id':id,'order_status':status}).subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.toastr.info('Order has been '+status,'Info')
        this.getorder()
      },
      err=>{
        this.spinner.hide()
        this.toastr.error('Try Again','Errro')
      }
    )
  }

}
