import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/admin/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminauth : AuthService, private router : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  logout(){
    this.adminauth.removedata()
    this.router.navigateByUrl("/admin")
  }
}
