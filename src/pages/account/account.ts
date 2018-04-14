import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AccountProvider, IAccount } from '../../providers/account.provider';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  public data: IAccount = {}

  public form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private accProv: AccountProvider, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl("", [Validators.required]),
      balance: new FormControl("", [Validators.minLength(0)]),
      coin: new FormControl("", []),
      observation: new FormControl("", []),
    });
  }

  ionViewDidLoad() {

  }

  submit() {
    this.parse();
    this.accProv.insert(this.data).then(data => this.navCtrl.getActive().dismiss());
  }

  parse() {
    this.data = this.form.value;
    if ( isNaN(this.data.balance) && isFinite(this.data.balance)) {
      this.data.balance = 0.0;
    }
  }

}
