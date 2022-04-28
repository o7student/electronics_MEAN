import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formModel = {
    email: '',
  }
  constructor(private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  forgot(){
    this.toastr.success('Success','New Password sent')
  }
}
