import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController) {
    
  }
  ScanCode(){
        console.log("Test fired");
        BarcodeScanner.scan().then((barcodeData) => {
            console.log(barcodeData);
        }, (err) => {
            console.error(err);
        });
}

}
