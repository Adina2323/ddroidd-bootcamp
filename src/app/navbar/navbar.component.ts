import { Component } from '@angular/core';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private url: LocationStrategy){}
  

  checkPage():boolean{
    if(this.url.path()==='/join-us'){
      return false;
    }
    return true;
  }
}
