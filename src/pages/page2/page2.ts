
//inladen van de benodige libraries
import { Component } from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';    //, Request, RequestOptions, Response
import { Page5 } from '../page5/page5';
import {Observable} from "rxjs";

// opstellen van de html tag en de inhoud hiervan
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  template:`
    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
          <ion-title>Scanner</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <h1>Scan het product</h1>
      <button id="ScanProduct" block (click)="ScanCode()" outline dark>Scan Product</button>
      <table class="gegevensTable">
        <tr class="rijen">
          <td>
            <label class="labelInfo">Artikel:</label>
          </td>
          <td>
            <input class="labelGegevenInfo" type="text" style="overflow: auto" readonly="readonly" [value]="Artikel"/>
          </td>
        </tr>      
        <tr class="rijen">
          <td>
            <label class="labelInfo">Prijs:</label>
          </td>
          <td>
            <input class="labelGegevenInfo" type="text" style="overflow: auto" readonly="readonly" [value]="prijs"/>
          </td>
        </tr>
        <tr>
          <td>
             <label class="labelInfo">Code:</label>
          </td>
          <td>
            <input class="labelGegevenInfo" type="text" style="overflow: auto" readonly="readonly" [value]="EanCode"/>
          </td>
        </tr>  
      </table>
      <button id="ScantNiet" [navPush]="pageEanIngeven" >Code scant niet</button>
    </ion-content>

`
})
export class Page2 {
//declareren van variabelen in dit geval wordt er dummy data ingestoken om weer te geven op de pagina omdat de post niet werkt
  EanCode:string="2548651245862";
  Artikel:string="Casillero Del Diablo - Chardonnay - 2015";
  prijs:any="€ "+"6.55";

  // de pagina voor de barcode handmatig in te geven in een variabelen steken om door te verwijzen als er op de knop "Code scant niet" gedrukt word
  pageEanIngeven = Page5;
  constructor(public navCtrl: NavController, public http: Http) {

  }

  //functie voor openen van de barcode scanner en het opvragen van de data bij de restServer
  ScanCode = function(){
    console.log("Test fired");
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      this.EanCode=barcodeData;
      this.EanCode=barcodeData.resolve;

      //functie die de gegeven bij de restServer gaat opvragen d.m.v. een post te doen met de eancode(= terug gekregen data van de barcode scanner)
      this.getProduct(this.EanCode);

      console.log(this.testen);
    },(err)=>{
      this.result= err.message;
      console.log(this.result);
    });
  }


  //functie voor het uitvoeren van een post met de eancode(= terug gekregen data van de barcode scanner) zou een json moeten terug krijgen met hierin de product naam, prijs en eancode van het opgevraagde product
 getProduct(eancode){

   ///var json = JSON.stringify(EanCode);
   ///var params = '{'+json+'}';
   ///var headers = new Headers({'Content-Type':'application/json'});

   ///let result = this.http.post('http://192.168.1.7:8800/api/Product/',params,headers);
   ///
   ///console.log(result);
   ///alert(result);

   let url = "http://http://192.168.1.7:8800/api/Store/";
   let body = JSON.stringify(eancode);
   console.log(eancode);
   let headers = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({headers:headers});
   console.log(this.http.post(url,body,options)
     .map(res => res.json())
     .catch(this.handleError));

 }
//het opvangen van eventuele errors
  handleError(error){
    console.error(error);
    return Observable.throw(error.json().error || 'server error');
  }


}

