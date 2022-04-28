import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/admin/auth/auth.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  constructor(private adminauth : AuthService, private router : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  logout(){
    this.adminauth.removedata()
    this.router.navigateByUrl("/admin")
  }

}
