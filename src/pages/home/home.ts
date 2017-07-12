import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AccountPage } from '../../pages/account/account';
import { OperationPage } from '../../pages/operation/operation';
import { AccountProvider, IAccount } from '../../providers/account.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    AccountProvider
  ]
})
export class HomePage {

  static title: string = "Cuentas";
  private list: IAccount[] = [];

  constructor(public navCtrl: NavController, private accProv: AccountProvider, public plt: Platform) {

  }

  ionViewWillEnter() {
    this.plt.ready().then(() => {
      this.accProv.getAll().then(data => this.list = data);
    })
  }

  get title() {
    return HomePage.title;
  }

  openOperation(item) {
    this.navCtrl.push(OperationPage, item);
  }

  add() {
    this.navCtrl.push(AccountPage);
  }
}
