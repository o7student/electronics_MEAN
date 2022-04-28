import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdvertiseService } from 'src/app/shared/admin/advertise/advertise.service';
import { CategoryService } from 'src/app/shared/admin/category/category.service';

@Component({
  selector: 'app-addadvertise',
  templateUrl: './addadvertise.component.html',
  styleUrls: ['./addadvertise.component.css']
})
export class AddadvertiseComponent implements OnInit {

  addForm = new FormGroup({
    title : new FormControl(),
    image : new FormControl(),
  })

  constructor(private spinner : NgxSpinnerService, private toastr : ToastrService, private advertise : AdvertiseService, private router : Router) { }

  ngOnInit(): void {

  }

  upload(evnt:any){
    if(evnt.target.files[0])
    {
      this.addForm.patchValue({image:evnt.target.files[0]})
    }
  }

  submit(){
    this.spinner.show()
    const data = new FormData()
    data.append('title',this.addForm.value.title)
    data.append('image',this.addForm.value.image)
    this.advertise.add(data).subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.toastr.success('success','Advertise insert successfully')
        this.router.navigateByUrl("/adminlayout/listadvertise")
      },
      err=>{
        this.spinner.hide()
        this.router.navigateByUrl("/adminlayout/listadvertise")
      }
    )
  }

}
