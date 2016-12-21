
//inladen van de nodige libraries
import { Component } from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {RestServer} from '../../providers/rest-server';
import {Observable} from "rxjs";


//opstellen van de html tag samen met de inhoud ervan
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [RestServer],
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
        <button id="ScanStore" (click)="ScanCode()">Scan Winkelcode</button>
        <!--<button id="ScanStore" (click)="getStore(13585002)">Scan Winkelcode</button>-->
        <label>Winkel:</label>
        <label>{{testen}}</label>
      </ion-content>    
`
})
export class Page1 {
  //declareren van variabelen met dummy data voor iets te laten zien in de app omdat het post requiest niet werkt
  testen:string="Waterschei"
  ipStore:any;
  public dattta: any;
  constructor(public http: Http, public restserver:RestServer) {   //public http: Http
  }

  //methode voor het openen van de barcode scanner en het opvragen van de winkel gegeven a.d.h.v. de gescande data
  ScanCode = function(){
    console.log("Test fired");
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      this.ipStore=barcodeData;
      this.testen=barcodeData.resolve;
      console.log(this.testen);

      //opvragen van store gegevens
      this.getStore(this.ipStore);

      //var json = JSON.stringify(StoreAdress);
      //var params = '{'+json+'}';
      //var headers = new Headers({'Content-Type':'application/json'});
      //let result = HTTP.post('http://192.168.1.7:8800/api/Store/',params,headers);

      //console.log(result);
      //alert(result);

    },(err)=>{
      this.testen= err.message;
      console.log(this.testen);
    });
  }

  //static  get parameters(){
  //  return[[Http]];
  //}
  StoreAdress="192168100124";

  //functie voor het opvragen van de store gegeven bij de RestServer a.d.h.v. de terug gekregen data uit de barcodescanner
  getStore(StoreAdress){

        //////Hier volgen een heel deel pogingen voor een post te verzenden naar de restService geen enkele hiervan blijkt te werken

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

  //////// var json = JSON.stringify(StoreAdress);
  //// var params = '{'+json+'}';
  ////let url = 'http://192.168.1.7:8800/api/Product/' + params;
  ////console.log(url);
  ////HTTP.post(url, {}, {})
  ////  .then(data => {

  ////    let testvar: string = data.data;

  ////    console.log(testvar);

  ////  })
  ////  .catch(error => {
  ////    console.log("http error on getting items");
  ////    console.log("error");
  ////  });


   ////////// var json = JSON.stringify(StoreAdress);
   ////////// var params = '{'+json+'}';
  //////////  var headers = new Headers({'Content-Type':'application/json'});
  //////////  let result =  this.http.post('http://192.168.1.7:8800/api/Costumer/',params,headers);;
  //////////
  //////////  console.log(result);
  //////////  alert(result);

  //  this.restserver.load()
  //    .then(data1 => {
  //      this.dattta = data1;
  //    });

    let url = "http://http://192.168.1.7:8800/api/Store/";
    let body = JSON.stringify(StoreAdress);
    console.log(StoreAdress);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
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


