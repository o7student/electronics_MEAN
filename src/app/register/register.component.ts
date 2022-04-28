import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../shared/register/register.service';
import { UserdataService } from '../shared/userdata/userdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dataBool = false

  formModel = {
    email: '',
    password: '',
    name: '',
    contact: '',
    address: ''
  }

  constructor(private register: RegisterService, private userdata: UserdataService, private router: Router,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.spinner.show()
    this.dataBool = true
    this.register.register(this.formModel).subscribe(
      (res: any) => {
        if (res.message = "User registered successfully") {
          // console.log(res)
          this.dataBool = false
          this.spinner.hide()
          this.toastr.success('User registered successfully!', 'SUCCESS', { positionClass: 'toast-bottom-right' });
          this.userdata.setData(res)
          this.router.navigateByUrl('/layout/home')
        }

        else {
          // console.log(res.error)
          this.spinner.hide()
          this.toastr.error('res.message', 'ERROR', { positionClass: 'toast-bottom-right' });
        }
      }
    )
  }

}
