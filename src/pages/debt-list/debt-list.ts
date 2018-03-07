import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DebtListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-debt-list',
  templateUrl: 'debt-list.html',
})
export class DebtListPage {
  static title: string = "debt-list.title";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  get title() {
    return DebtListPage.title;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtListPage');
  }

}
