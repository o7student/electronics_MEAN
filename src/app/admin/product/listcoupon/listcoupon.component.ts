import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CouponService } from 'src/app/shared/admin/coupon/coupon.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listcoupon',
  templateUrl: './listcoupon.component.html',
  styleUrls: ['./listcoupon.component.css']
})
export class ListcouponComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService, private coupon : CouponService) {
  }

  ngOnInit(): void {
    this.getcoupon()
  }

  allcoupon = []
  getcoupon(){
    this.spinner.show()
    this.coupon.list().subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.allcoupon = res.data
      },
      err=>{
        this.spinner.hide()
      }
    )
  }


  del(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coupon.delete(id).subscribe(
          (res:any)=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getcoupon()
          },
          err=>{
            Swal.fire(
              'Error!',
              'Try again.',
              'error'
            )
          }
        )
      }
    })
  }
}
