import { Component } from '@angular/core';
import { NavController,  AlertController, Alert,Platform } from 'ionic-angular';
import { AccountPage } from '../../pages/account/account';
import { OperationPage } from '../../pages/operation/operation';
import { AccountProvider, IAccount } from '../../providers/account.provider';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    AccountProvider
  ]
})
export class HomePage {

  static title: string = "account.title";
  private list: IAccount[] = [];
  // private list: IAccount[] = [{
  //   balance:400000000000,
  //   name: "Pago Mami",
  //   coin: "$",
  //   observation: " Data Prieba"
  // },
  // {
  //   balance:400000000000,
  //   name: "Pago Mami",
  //   coin: "$"
  // }];

  constructor(public navCtrl: NavController, private accProv: AccountProvider, private alertCtrl: AlertController,public plt: Platform, public translate:TranslateService) {

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
    this.translate.get(['label.warn','account.msg-delete','label.yes','label.no']).subscribe(data=>{
      let alert = this.alertCtrl.create({
        title: data['label.warn'],
        subTitle: data['account.msg-delete'],
        buttons: [
          {
            text: data['label.yes'],
            handler: data => {
              this.accProv.delete(acc._id).then(data => {
                if (data) {
                  this.load();
                }
              })
            }
          }, {
            text: data['label.no'],
            role: 'cancel'
          }
        ]
      });
      alert.present();
    });
    
  }
}
