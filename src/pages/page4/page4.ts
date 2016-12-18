import { Component } from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import {Http, Headers} from '@angular/http';
import {httpFactory} from "@angular/http/src/http_module";    //, Request, RequestOptions, Response

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html',
  template:`
      <ion-header>
        <ion-navbar>
          <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
          </button>
          <ion-title>Klanten Kaart</ion-title>
        </ion-navbar>
      </ion-header>
      
      <ion-content>
        <button id="ScanKlantenKaart" block (click)="ScanCode()" outline dark>Scan Klantenkaart</button>
        <h3>Gelieven uw klantenkaart te scannen</h3>
        <h3>of klikt verdergaan</h3>
        <button id="Verdergaan" block [navPush]="pageScanner" outline dark>Verdergaan</button>
      </ion-content>

    
`
})
export class Page4 {
  pageScanner = Page2;
  klantEan;

  constructor(public navCtrl: NavController, public params:NavParams, public http: Http) {  }

  ScanCode = function(){
    console.log("Test fired");
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      this.klantEan=barcodeData;
      this.klantEan=barcodeData.resolve;

      var json = JSON.stringify(this.EanCode=barcodeData);
      var params = '{'+json+'}';
      var headers = new Headers({'Content-Type':'application/json'})
      //let result = HTTP.post('http://192.168.1.7:8800/api/Costumer/',params,headers)
      let result = this.http.post('http://192.168.1.7:8800/api/Costumer/',params,headers);
      console.log(result);
      alert(result);

      console.log(this.testen);
    },(err)=>{
      this.klantEan= err.message;
      console.log(this.klantEan);
    });
  }
}
