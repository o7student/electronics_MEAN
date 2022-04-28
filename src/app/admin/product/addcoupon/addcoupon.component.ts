import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from 'src/app/shared/admin/coupon/coupon.service';

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.css']
})
export class AddcouponComponent implements OnInit {

  addForm = new FormGroup({
    coupon_code: new FormControl(),
    offer_amount: new FormControl(),
    description: new FormControl(),
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private coupon: CouponService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.spinner.show()
    this.coupon.add(this.addForm.value).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.toastr.success('success', 'Coupons insert successfully')
        this.router.navigateByUrl("/adminlayout/listcoupon")
      },
      err => {
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listcoupon")
      }
    )
  }


}
