//importeren van de nodige libraries etc
import { Component } from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import {Http, Headers, RequestOptions} from '@angular/http';    //, Request, RequestOptions, Response
import {Observable} from "rxjs";


//opstellen van de html tag en in houde van de tag
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

  //inladen van de scanner pagina in een variabelen
  //als op de knop "verdergaan" geklikt wordt opent de app de scanner pagina
  pageScanner = Page2;
  klantEan;

  //constructor voor de variabelen te binden
  constructor(public params:NavParams, public http: Http) {  }


  //functie voor de barcode scanner te openen en de gescande data door te sturen naar de restServer om in dit geval de klant gegevens op te vragen
  ScanCode = function(){
    console.log("Test fired");
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      this.klantEan=barcodeData;
      this.klantEan=barcodeData.resolve;

      this.getKlant(this.klantEan);

      console.log(this.testen);
    },(err)=>{
      this.klantEan= err.message;
      console.log(this.klantEan);
    });
  }

  //functie voor het opvragen van de klant gegeven aan de restServer a.d.h.v. de mee gekregen variabelen "eancode" deze is de data die uit de barcodescanner terug komt
  getKlant(eancode){

    //url van de RestServer
    let url = "http://http://192.168.1.7:8800/api/Store/";
    //inhoud van het post request
    let body = JSON.stringify(eancode);
    //loggen van de meegekregen variabelen in de console ter controle
    console.log(eancode);
    //opstellen van de headers voor het request
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    //het posten van de data met d.m.v bovenstaande gegevens en het resultaat returnen.
    return this.http.post(url,body,options)
      .map(res => res.json())
      .catch(this.handleError);

  }
  //het opvangen van eventuele errors

  handleError(error){
    console.error(error);
    return Observable.throw(error.json().error || 'server error');
  }
}
