import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertiseService } from 'src/app/shared/admin/advertise/advertise.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listadvertise',
  templateUrl: './listadvertise.component.html',
  styleUrls: ['./listadvertise.component.css']
})
export class ListadvertiseComponent implements OnInit {


  imageURL=''
  constructor(private spinner : NgxSpinnerService, private advertise : AdvertiseService,private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any) {
    this.imageURL = _imageurl
  }

  ngOnInit(): void {
    this.getadvertise()
  }

  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }

  alladvertise = []
  getadvertise(){
    this.spinner.show()
    this.advertise.list().subscribe(
      (res:any)=>{
        this.spinner.hide()
        this.alladvertise = res.data
      },
      err=>{
        this.spinner.hide()
      }
    )
  }



  del(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.advertise.delete(id).subscribe(
          (res:any)=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getadvertise()
          },
          err=>{
            Swal.fire(
              'Error!',
              'Try again.',
              'error'
            )
          }
        )
      }
    })
  }

}
