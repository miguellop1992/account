import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { OperationProvider, IOperation } from '../../providers/operation.provider';

/**
 * Generated class for the DepositPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-deposit',
  templateUrl: 'deposit.html',
})
export class DepositModal {
  private data: IOperation;
  public form: FormGroup;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private opeProv: OperationProvider, private fb: FormBuilder) {
    this.form = this.fb.group({
      description: new FormControl("", [Validators.required]),
      add: new FormControl("", [Validators.required,Validators.minLength(1)]),
    });

    this.data = {
      account_id: navParams.data.id,
      multitype_id: "2.1",
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositModal');
  }

  dismiss(value = false) {
    this.viewCtrl.dismiss(value);
  }

  submit() {
    this.parse();
    this.opeProv.insert(this.data).then(data => this.dismiss(true))
  }

  parse(){
    this.data.description=this.form.value.description;

    let balance=Math.abs(this.form.value.add);
    if (isNaN(balance)) {
      balance = 0.0;
    }
    this.data.add = balance;
    // this.data.add = parseFloat(this.form.value.add);
    
  }

}
