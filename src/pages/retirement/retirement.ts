import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { OperationProvider, IOperation } from '../../providers/operation.provider';

/**
 * Generated class for the RetirementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-retirement',
  templateUrl: 'retirement.html',
})
export class RetirementModal {
private data:IOperation;
  public form: FormGroup;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private opeProv: OperationProvider, private fb: FormBuilder) {
    this.form = this.fb.group({
      description: new FormControl("", [Validators.required]),
      subtract: new FormControl("", [Validators.required,Validators.minLength(1)]),
    });

    this.data = {
      account_id: navParams.data.id,
      multitype_id: "2.2",
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
    this.data.subtract = parseFloat(this.form.value.subtract);
  }
}
