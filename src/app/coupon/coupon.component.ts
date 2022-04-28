import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CouponService } from '../shared/coupon/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  imageURL = ''
  couponData = []

  constructor(private coupon: CouponService, private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any,
    private router: Router, private spinner : NgxSpinnerService) {
    this.imageURL = _imageurl
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/image/' + photoname)
  }

  ngOnInit(): void {
    this.getCoupons()
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

}
