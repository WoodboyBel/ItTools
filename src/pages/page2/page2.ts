import { Component } from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import { NavController } from 'ionic-angular';
import {Http, Headers,Response} from '@angular/http';  //, Request, RequestOptions, Response
import { Page5 } from '../page5/page5';
import { Article } from 'Article';


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

  EanCode:string="2548651245862";
  Artikel:string="Casillero Del Diablo - Chardonnay - 2015";
  prijs:any="€ "+"6.55";

  pageEanIngeven = Page5;
  constructor(public navCtrl: NavController, public http: Http) {

  }
  ScanCode = function(){
    console.log("Test fired");
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      this.EanCode=barcodeData;
      this.EanCode=barcodeData.resolve;
      //getProduct(EanCode);

        var json = JSON.stringify(this.EanCode=barcodeData);
        var params = '{'+json+'}';
        var headers = new Headers({'Content-Type':'application/json'})
        let result = this.http.post('http://192.168.1.7:8800/api/Costumer/',params,headers);
        console.log(result);
        alert(result);

      console.log(this.testen);
    },(err)=>{
      this.result= err.message;
      console.log(this.result);
    });
  }

 //getProduct(EanCode){

 //  var json = JSON.stringify(ProductEan);
 //  var params = '{'+json+'}';
 //  var headers = new Headers({'Content-Type':'application/json'});

 //  let result = HTTP.post('http://192.168.1.7:8800/api/Product/',params,headers);

 //  console.log(result);
 //  alert(result);

 // }

  parseData(response: Response) {
    let body = response.json();
    let articles: Array<Article> = [];
    body.forEach((o: any) => {
      let p = new Article(o.ean,o.name,o.price); //////FOUT NEEMT ARTICLE NIET IDK WHY
      articles.push(p);
    });
    return articles;
  }

}

