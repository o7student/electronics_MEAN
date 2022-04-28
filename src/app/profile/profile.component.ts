import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../shared/profile/profile.service';
import { UserdataService } from '../shared/userdata/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formModel = {
    name: '',
    email: '',
    contact: '',
    address: ''
  }

  profileData: any

  constructor(private userdata: UserdataService, private profile: ProfileService, private router: Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  dataform: any
  getProfile(){
    this.dataform = {
      user_id: this.userdata.getUserId()
    }
    this.profile.getProfile(this.dataform).subscribe(
      (res: any) => {
        if (res.message = "Profile loaded") {
          // console.log(res)
          this.profileData = res.data
          this.formModel.name = this.profileData.name
          this.formModel.email = this.profileData.email
          this.formModel.contact = this.profileData.contact
          this.formModel.address = this.profileData.address

        }
        else {
          // console.log(res.error)
          // this.spinner.hide()
          // this.toastr.error('res.message', 'ERROR', { positionClass: 'toast-bottom-right' });
        }

      },
    )
  }

  profileform: any
  updateProfile(){
    this.profileform = {
      user_id: this.userdata.getUserId(),
      name: this.formModel.name,
      contact: this.formModel.contact,
      address: this.formModel.address
    }

    this.profile.updateProfile(this.profileform).subscribe(
      (res: any) => {
        this.toastr.success('SUCCESS','Profile Updated');
        window.location.reload()
      },
    )
  }

}
