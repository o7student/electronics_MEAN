import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/admin/user/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private user: UserService) {
  }

  ngOnInit(): void {
    this.getuser()
  }

  alluser = []
  getuser() {
    this.spinner.show()
    this.user.list({}).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.alluser = res.data
        console.log(this.alluser)
      },
      err => {
        this.spinner.hide()

      }
    )
  }
}
