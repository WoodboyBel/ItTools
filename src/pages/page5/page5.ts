import { Component } from '@angular/core';
//import {BarcodeScanner} from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-page5',
  templateUrl: 'page5.html',
  template: `
      <ion-header>
        <ion-navbar>
          <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
          </button>
            <ion-title>Scan Direct</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content>
        <h1>Code scant niet</h1>
        <p> Gelieven de cijfers onderaan de barcode op het artiekel in te geven in onderstaand invoer veld.</p>
        <input type="number" class="numberRecord" placeholder="Barcode cijfers"/><br />
        <button class="addCart" (click)="AddProduct()" [navPush]="pageScanner">Voeg toe aan kar</button>
      </ion-content>    
    
  `
})
export class Page5 {

  pageScanner = Page2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  AddProduct = function() {

  }
}
