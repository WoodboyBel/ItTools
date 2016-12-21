//importeren van de nodige functies/libraries

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';    //, Request, RequestOptions, Response
import { Page2 } from '../page2/page2';
import {Observable} from "rxjs";
import { ProductList } from '../page3/ProductList';


//het instellen van de html-tag, en te inhoud die deze tag bevat
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
        <input name="code" type="number" class="numberRecord" placeholder="Barcode cijfers"/><br />
        <!--<button  class="addCart" (click)="getProduct(getElementById(code))" [navPush]="pageScanner">Voeg toe aan kar</button>-->
        <button  class="addCart" [navPush]="pageScanner">Voeg toe aan kar</button>
      </ion-content>    
    
  `
})
export class Page5 {
// het linken van de scanner pagina aan een variabelen
  pageScanner = Page2;
  produc:ProductList
  dummyNaam = "Een naam";
  dummyPrice = 2.53;
  //in de html template bij de knop "Voeg toe aan kar" wordt deze pagina gepusht en weergegeven op het scherm

  constructor(public navCtrl: NavController, public  http:Http) {

  }
  // de fucntie die als taak heeft de ingegeven ean code naar de restServer te sturen voor de gegevens van het overeenkomstige product op te vragen
  // en aan de lijst van producten toe te voegen


  //getProduct(eancode){ // bij werking van post deze regel uit comment halen en onder staande regel samen met code in de functie
getProduct(eancode){

    // weer een van de zoveelste pogingen om een post te sturen naar de restServer

  //  let url = "http://http://192.168.1.7:8800/api/Store/";
  //  let body = JSON.stringify(eancode);
  //  console.log(eancode);
  //  let headers = new Headers({'Content-Type': 'application/json'});
  //  let options = new RequestOptions({headers:headers});
  //  return this.http.post(url,body,options)
  //    .map(res => res.json())
  //    .catch(this.handleError);


  //Toevoegen van product aan de array met producten
  //let producten:ProductList[] = [];
  //producten.push(
  //    new ProductList(this.dummyNaam,eancode,this.dummyPrice)
  // );


  }
  //het opvangen van eventuele errors
  handleError(error){
    console.error(error);
    return Observable.throw(error.json().error || 'server error');
  }
}
