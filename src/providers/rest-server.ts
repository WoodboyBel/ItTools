import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestServer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

//Deze klasse was nodig in bij een van de vele pogingen voor het posten/getten van data naar de rest Server


@Injectable()
export class RestServer {
  data1: any;
  constructor(public http: Http) {
    console.log('Hello RestServer Provider');
    this.http.post
  }
  load() {
    if (this.data1) {
      return Promise.resolve(this.data1);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('http://192.168.1.7:8800/api/product')
        .map(res => res.json())
        .subscribe(data => {
          this.data1 = data.results;
          resolve(this.data1);
          console.log(data.result)
        });
    });
  }


}
