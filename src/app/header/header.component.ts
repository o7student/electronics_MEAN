import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart/cart.service';
import { CategoryService } from '../shared/category/category.service';
import { UserdataService } from '../shared/userdata/userdata.service';
import { UsersessionService } from '../shared/usersession/usersession.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile = false

  constructor(private userdata: UserdataService, private usersession: UsersessionService, private router: Router, private toastr: ToastrService , private category :CategoryService, private cartservice : CartService) { }
  cartcount:any = 0
  ngOnInit(): void {
    if(this.userdata.getToken() != null){
      this.usersession.setSession(true)

      this.cartservice.getcartList(this.userdata.getUserId()).subscribe(
        (res:any)=>{
          this.cartcount = res.data.length
        }
        )
      }
      // if(sessionStorage.getItem('cartcount') != null){
        //   this.cartcount = sessionStorage.getItem('cartcount')
        //   // console.log(this.cartcount)
        // }

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.usersession.getUserSession.subscribe(res => {
      // console.log(res)
      this.profile = Boolean(res)
    })

    this.getCat()
    // console.log(this.cartcount)
  }

  logout(){
    this.router.navigateByUrl("layout/login")
    this.userdata.removeData()
    this.usersession.setSession(false)
  }

  categorydata = []

  getCat(){
    this.category.getCategory().subscribe(
      (res:any)=>{
        // console.log(res.data)
        this.categorydata = res.data
      },
      err=>{

      }
    )
  }
}
