import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-provider-listing',
  templateUrl: './provider-listing.component.html',
  styleUrls: ['./provider-listing.component.css']
})
export class ProviderListingComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  PolicyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  constructor() { }

  ngOnInit(): void {
  }
  url1: string = "../../../../../assets/images/img1.jpg";
  url2: string = "../../../../../assets/images/img2.jpg";
  url3: string = "../../../../../assets/images/img3.jpg";
  url4: string = "../../../../../assets/images/img4.jpg";
  imageChange1(event: any){
      this.url1 = event.target.src;
  }
  imageChange2(event: any){
    this.url2 = event.target.src;
}
imageChange3(event: any){
  this.url3 = event.target.src;
}
imageChange4(event: any){
  this.url4 = event.target.src;
}

partnerArray: any=[
  {imgName: "../../../../../assets/images/rolex.png"},
  {imgName: "../../../../../assets/images/rolex.png"},
  {imgName: "../../../../../assets/images/rolex.png"},
  {imgName: "../../../../../assets/images/rolex.png"},
  {imgName: "../../../../../assets/images/rolex.png"},
  {imgName: "../../../../../assets/images/rolex.png"}
]
}
