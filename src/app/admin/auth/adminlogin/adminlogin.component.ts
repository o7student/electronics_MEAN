import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/admin/auth/auth.service';
import { LoginService } from 'src/app/shared/admin/login/login.service';
import { UserdataService } from 'src/app/shared/userdata/userdata.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  hide = true
  dataBool = false
  dataform: any

  formModel = {
    email: '',
    password: '',
  }

  constructor(private login: LoginService, private userdata: AuthService, private router: Router, private spinner: NgxSpinnerService,private toastr: ToastrService) { }


  ngOnInit(): void {

  }

  onLogin() {
    this.spinner.show()
    this.dataBool = true
    this.login.login(this.formModel).subscribe(
      (res: any) => {
        if (res.message = "Login successfully") {
          // console.log(res)
          this.dataBool = false
          this.spinner.hide()
          this.toastr.success('User Logged In Successfully!', 'SUCCESS', { positionClass: 'toast-bottom-right' });
          this.userdata.setdata(res)
          this.router.navigateByUrl('/adminlayout/dashboard')
        }

        else {
          // console.log(res.error)
          this.spinner.hide()
          this.toastr.error('res.message', 'ERROR', { positionClass: 'toast-bottom-right' });
        }
      },
      err=>{
        this.spinner.hide()
        this.toastr.error('Error','Invalid Credentials')
      }
    )
  }
}
