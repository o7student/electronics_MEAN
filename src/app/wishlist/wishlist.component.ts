import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../shared/userdata/userdata.service';
import { WishlistService } from '../shared/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  imageURL = ''
  productData = []

  constructor(private wishlist: WishlistService, private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any,
    private router: Router, private userdata: UserdataService, private toastr : ToastrService) {
    this.imageURL = _imageurl
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/image/' + photoname)
  }

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist() {
    // this.spinner.show()
    this.wishlist.getWishList(this.userdata.getUserId()).subscribe(
      (res: any) => {
       this.productData = res.data
      //  console.log(this.productData)
      },
    )
  }

  remove(_id:any)
  {
    this.wishlist.deleteWishList(_id).subscribe(
      (res:any)=>{
        this.toastr.success('Success', 'Removed from wishlist')
        this.getWishlist()
      },
      err=>{

      }
    )
  }
}
