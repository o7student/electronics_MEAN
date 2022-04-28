import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../shared/profile/profile.service';
import { UserdataService } from '../shared/userdata/userdata.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {


  formModel = {
    old_password: '',
    new_password: '',
    confirm_password: ''
  }

  profileData: any

  constructor(private userdata: UserdataService, private profile: ProfileService, private router: Router, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  passwordform: any
  updatePassword(){
    this.passwordform = {
      user_id: this.userdata.getUserId(),
      old_password: this.formModel.old_password,
      new_password: this.formModel.new_password,
      confirm_password: this.formModel.confirm_password
    }

    this.profile.changePassword(this.passwordform).subscribe(
      (res: any) => {
        this.toastr.success('SUCCESS','Password Updated');
        // window.location.reload()
      },
      err=>{
        this.toastr.error('Error',err.error.message)
      }
    )
  }

}
