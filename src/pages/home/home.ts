import { Component } from '@angular/core';
import { IonicPage, NavController,  AlertController, Alert,Platform } from 'ionic-angular';
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
  // private list: IAccount[] = [{
  //   balance:400000000000,
  //   name: "Pago Mami",
  //   coin: "$"
  // }];

  constructor(public navCtrl: NavController, private accProv: AccountProvider, private alertCtrl: AlertController,public plt: Platform) {

  }

  ionViewWillEnter() {
    this.plt.ready().then(() => {
      this.load();
    })
  }

  load(){
    
    this.accProv.getAll().then(data => this.list = data);
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

  delete(acc) {
    
    let alert = this.alertCtrl.create({
      title: 'Advertencia',
      subTitle: '¿Esta seguro que desea eliminar esta cuenta?',
      buttons: [
        {
          text: 'Si',
          handler: data => {
            this.accProv.delete(acc._id).then(data => {
              if (data) {
                this.load();
              }
            })
          }
        }, {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
