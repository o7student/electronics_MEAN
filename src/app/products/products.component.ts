import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productData = []
  imageURL

  constructor(private product: ProductService, private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any,
    private router: Router) {
    this.imageURL = _imageurl
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }

  eventClick(id: any) {
    this.router.navigateByUrl("/layout/products-info/" + id)
  }

  getAllProducts() {
    // this.spinner.show()
    this.product.getAllProducts().subscribe(
      (res: any) => {
        // this.spinner.hide()
        console.log(res.data)
        this.productData = res.data
      },
      err => {
        // this.spinner.hide()
        console.log(err)
      }
    )
  }

}
