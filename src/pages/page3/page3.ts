import { Component } from '@angular/core';
import { ProductLijst } from './ProductList';
import { NFC } from 'ionic-native';
//, Ndef

//import {ModalController, NavController} from "ionic-angular";


@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
  template:`
        <ion-header>
          <ion-navbar>
            <button ion-button menuToggle>
              <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>Winkel Kar</ion-title>
          </ion-navbar>
        </ion-header>
        
        <ion-content>
          <h1>Mijn kar</h1>
          <h3 class="totaal">Totaal: </h3>
          <h3 class="totaal">€ Prijs </h3>
          <button id="Afrekenen" (click)="SendBill()">Afrekenen</button>          
          <ion-list class="plijst" *ngFor="let ti of productlijst.productArray; let  i = index;">
            <input type="button" value="-" (click)="productlijst.productArray.splice(i,1)"/>
            <ion-item>{{ti.artiekelNaam}}{{ti.prijs}}</ion-item>
          </ion-list>
        </ion-content>

  
`
})
export class Page3 {
  productlijst;
  total=0;
  testString="Hello NFC";

  constructor(){
    this.productlijst = ProductLijst;
    this.total=0;
  }
  totaal = function (prijs) {
    this.total = this.total + prijs;
    return this.total;
  }
  SendBill=function() {
    //let message = Ndef.textRecord('Hello world');
    //NFC.share([message]).then(onSuccess).catch(onError);

    //let message = Ndef.textRecord(this.testString);
    //NFC.write(message);
    console.log(NFC.enabled());//kijkt of nfc op gsm is en of deze opstaat
    NFC.handover(this.productlijst); //stuurt data naar andere gsm over nfc
    console.log(this.productlijst);
  }



}
