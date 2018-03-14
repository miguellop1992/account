import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Modal, AlertController, Alert, PopoverController } from 'ionic-angular';
import { DepositModal } from '../../pages/deposit/deposit';
import { RetirementModal } from '../../pages/retirement/retirement';
import { AccountProvider, IAccount } from '../../providers/account.provider';
import { OperationProvider, IOperation } from '../../providers/operation.provider';
import { TranslateService } from '@ngx-translate/core';

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
  private balance: number = 0;
  private add: number = 0;
  private subtract: number = 0;
  private dataText;
  private list: IOperation[] = [];
  private data: IAccount;
  // private data: IAccount = {
  //   balance: 400000000000,
  //   name: "Pago Mami",
  //   coin: "$",
  //   observation: "Esta cuenta se origino en \"Lista de deudas\""
  // };
  // private list: IOperation[] = [{
  //   account_id: 0,
  //   description: "Mas",
  //   add: 500,
  //   multitype_id: "2.1",
  //   balance: 400000000000,
  // },
  // {
  //   account_id: 0,
  //   description: "Menos",
  //   multitype_id: "2.2",
  //   subtract: 300,
  //   balance: 400000000000,
  // }];

  private onDismiss = (data) => {
    if (data) {
      this.ionViewWillEnter();
    }
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private accProv: AccountProvider, private alertCtrl: AlertController, private opeProv: OperationProvider, private popCtrl: PopoverController, public translate: TranslateService) {
    this.data = this.navParams.data;
    this.balance = this.data.balance;
  }



  ionViewWillEnter() {
    this.load();
    this.translate.get([
      'label.warn',
      'account.msg-delete',
      'operation.msg-delete',
      'label.yes',
      'label.no'
    ]).subscribe(data => this.dataText = data);

  }

  load(){
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
  deleteOpe(value) {
    let alert = this.alertCtrl.create({
      title: this.dataText['label.warn'],
      subTitle: this.dataText['operation.msg-delete'],
      buttons: [
        {
          text: this.dataText['label.yes'],
          handler: data => {
            this.opeProv.delete(value._id).then(data => {
              if (data) {
                this.load();
                // alert.dismiss();
              }
            })
          }
        }, {
          text: this.dataText['label.no'],
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: this.dataText['label.warn'],
      subTitle: this.dataText['account.msg-delete'],
      buttons: [
        {
          text: this.dataText['label.yes'],
          handler: data => {

            this.accProv.delete(this.data._id).then(data => {
              if (data) {
                this.navCtrl.getActive().dismiss();
              }
            })
          }
        }, {
          text: this.dataText['label.no'],
          role: 'cancel'
        }
      ]
    });
    alert.present();

  }

  popover(ev) {
    let popover = this.popCtrl.create(PopoverObservation, {
      title: "observacion",
      body: this.data.observation
    })
    popover.present({
      ev: ev
    });
  }

}

@Component({
  template: `
    <ion-list radio-group class="popover-page">
      <ion-item>
        {{'label.observation' | translate}}
        <hr>
        <p text-wrap>{{body}}</p>
      </ion-item>
    </ion-list>

  `,
})
export class PopoverObservation {
  private body: string;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.body = this.navParams.data.body;
    }
  }
}
