import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {Http, Headers} from '@angular/http';    //, Request, RequestOptions, Response
import 'rxjs/add/operator/map';
//import {map} from "rxjs/operator/map";


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  template:`
    	<ion-header>
        <ion-navbar>
          <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
          </button>
            <ion-title>Scan Direct</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content>
        <h1>Scan de winkel code</h1>
        <!--<button id="ScanStore" (click)="ScanCode()">Scan Winkelcode</button>-->
        <button id="ScanStore" (click)="getStore()">Scan Winkelcode</button>
        <label>Winkel:</label>
        <label>{{testen}}</label>
      </ion-content>    
`
})
export class Page1 {
  testen:string="Waterschei"
  ipStore:any;
  constructor(public http: Http) {
  }
  ScanCode = function(){
    console.log("Test fired");
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      this.ipStore=barcodeData;
      //this.ipStore=barcodeData.resolve;
      console.log(this.ipStore);
      //getStore();

      //var json = JSON.stringify(StoreAdress);
      //var params = '{'+json+'}';
      //var headers = new Headers({'Content-Type':'application/json'});
      //let result = HTTP.post('http://192.168.1.7:8800/api/Store/',params,headers);

      //console.log(result);
      //alert(result);
      //--> this.testen = result; <--//
    },(err)=>{
      this.testen= err.message;
      console.log(this.testen);
    });
  }

  //static  get parameters(){
  //  return[[Http]];
  //}
  StoreAdress="1157757677471";
  getStore(StoreAdress){
    //console.log("http request start");
    //var url = 'http://192.168.1.7:8800/api/Product'+ encodeURI(StoreAdress.toJson())+'';
    //var response = this.http.get(url).map(res => res.json());
    //console.log(response);
    //console.log("http request done");
    //return response;

    //HTTP.post("http://192.168.1.7:8800/api/Product",{json_string: JSON.stringify(1157757677471)},null);

    //  let body = JSON.stringify(StoreAdress);
    //  let adres = "http://192.168.1.7:8800/api/Product";
    //  let headers = new Headers({'Content-Type':'application/json'});
    //  let options = new RequestOptions({headers:headers});
    //  return HTTP.post(adres,body,options).map


    var json = JSON.stringify(StoreAdress);
    var params = '{'+json+'}';
    var headers = new Headers({'Content-Type':'application/json'});
    let result =  this.http.post('http://192.168.1.7:8800/api/Costumer/',params,headers);;

   console.log(result);
   alert(result);

  }



}


