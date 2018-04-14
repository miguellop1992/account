import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  static title: string = "about.title";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  get title() {
    return AboutPage.title;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
