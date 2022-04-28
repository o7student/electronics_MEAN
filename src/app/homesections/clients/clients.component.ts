import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AdvertiseService } from 'src/app/shared/advertise/advertise.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  imageURL
  constructor(private advertise : AdvertiseService, private trusturl: DomSanitizer, @Inject('BASE_IMAGE_URL') _imageurl: any) {
    this.imageURL = _imageurl
  }

  ngOnInit(): void {
    this.get()
  }

  add = []
  public getSanitizerUrl(photoname: any) {
    return this.trusturl.bypassSecurityTrustUrl(this.imageURL + '/' + photoname)
  }
  get(){
    this.advertise.getAdvertise().subscribe(
      (res:any)=>{

        this.add = res.data
        // console.log(res.data)
      },
      err=>{

      }
    )
  }

}
