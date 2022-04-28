import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../shared/login/login.service';
import { UserdataService } from '../shared/userdata/userdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true
  dataBool = false
  dataform: any

  formModel = {
    email: '',
    password: '',
  }

  constructor(private login: LoginService, private userdata: UserdataService, private router: Router, private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }


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
          this.userdata.setData(res)
          this.router.navigateByUrl('/layout/home')
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
