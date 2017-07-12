import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Modal, AlertController, Alert } from 'ionic-angular';
import { DepositModal } from '../../pages/deposit/deposit';
import { RetirementModal } from '../../pages/retirement/retirement';
import { AccountProvider, IAccount } from '../../providers/account.provider';
import { OperationProvider, IOperation } from '../../providers/operation.provider';

/**
 * Generated class for the OperationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html',
})
export class OperationPage {
  private data: IAccount ;
  private list: IOperation[] = [];
  private balance:number=0;
  private add:number=0;
  private subtract:number=0;
  
  private onDismiss = (data) => {
    if (data) {
      this.ionViewWillEnter();
    }
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private accProv: AccountProvider, private alertCtrl: AlertController, private opeProv: OperationProvider) {
    this.data = this.navParams.data;
    this.balance = this.data.balance;
  }

  

  ionViewWillEnter() {
    this.opeProv.balances(this.data._id).then(data => {
      this.balance = data.balance;
      this.add = data.add;
      this.subtract = data.subtract;
    });
    this.opeProv.getAll({ account_id: this.data._id }).then(data => this.list = data);
  }

  open(modal: string) {
    if (modal == "retirement") {
      let retirementModal = this.modalCtrl.create(RetirementModal, { id: this.data._id });
      retirementModal.onDidDismiss(this.onDismiss)
      retirementModal.present();
    } else {
      let depositModal = this.modalCtrl.create(DepositModal, { id: this.data._id });
      depositModal.onDidDismiss(this.onDismiss)
      depositModal.present();
    }
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: 'Advertencia',
      subTitle: '¿Esta seguro que desea eliminar esta cuenta?',
      buttons: [
        {
          text: 'Si',
          handler: data => {

            this.accProv.delete(this.data._id).then(data => {
              if (data) {
                this.navCtrl.getActive().dismiss();
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
