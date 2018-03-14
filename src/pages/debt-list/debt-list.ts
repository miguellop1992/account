import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';
import { IAccount } from '../../providers/account.provider';
import { OperationPage } from '../../pages/operation/operation';
import { TranslateService } from '@ngx-translate/core';
import { DebtListProvider } from '../../providers/debt-list.provider';

export interface IAccount2 extends IAccount {
  status?: number;
}

/**
 * Generated class for the DebtListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-debt-list',
  templateUrl: 'debt-list.html',
})
export class DebtListPage {
  static title: string = "debt-list.title";
  public list: IAccount2[] = [];
  private dataText;

  constructor(public navCtrl: NavController, private debList: DebtListProvider, public plt: Platform, public translate: TranslateService, public actSheet: ActionSheetController) {

  }

  get title() {
    return DebtListPage.title;
  }

  ionViewWillEnter() {
    this.plt.ready().then(() => {
      this.load();
    })
    this.translate.get([
      "label.add",
      "label.remove",
      "label.coin",
      "label.exit",
      "label.delete",
      "debt-list.to-account",
      "debt-list.observation"
    ]).subscribe((data) => this.dataText = data);
  }

  save(value) {
    this.debList.update(value).then();
  }

  load() {
    this.debList.getAll().then((data: IAccount2[]) => {
      if (data.length > 0) {
        this.list = data;
      } else {
        this.add(true);
      }
    });
  }

  add(add = false) {
    let value = this.list[this.list.length - 1];
    if ((value && value.name && value.balance) || add) {
      this.debList.insert({}).then((data: IAccount2) => {
        data.status= (value) ? value.status : 0 ;
        this.list.push(data);
      });
    } else {
      return;
    }
  }

  

  option( index) {
    let value:IAccount2= this.list[index];
    let actionSheet = this.actSheet.create({
      buttons: [
        {
          text: ` ${(value.status > 0) ? this.dataText["label.remove"] : this.dataText["label.add"]} ${this.dataText["label.coin"]}`,
          handler: () => {
            if (value.status > 0) {
              value.status = 0;
              value.coin=null;
              this.debList.update(value).then();
            } else {
              value.status = 1;
            };
          }
        }, {
          text: this.dataText["debt-list.to-account"],
          handler: () => {
            if(value && value.name && value.balance){
              value.observation=this.dataText["debt-list.observation"];
              this.debList.toAccount(value).then(()=>{
                this.navCtrl.push(OperationPage, value);
                this.load();
              });
            }
          }
        }, {
          text: this.dataText["label.delete"],
          role: 'destructive',
          handler: () => {
            if (this.list.length == 1) {
              value.name= '';
              value.balance=null;
              this.debList.update(value).then();
            }else{
              this.debList.delete(value._id).then(data => this.list.splice(index, 1));
            }
          }
        }, {
          text: this.dataText["label.exit"],
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }




}
