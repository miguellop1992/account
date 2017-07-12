import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositModal } from './deposit';
import { OperationProvider } from '../../providers/operation.provider';

@NgModule({
  declarations: [
    DepositModal,
  ],
  imports: [
    IonicPageModule.forChild(DepositModal),
  ],
  exports: [
    DepositModal
  ],
  providers: [
    OperationProvider
  ]
})
export class DepositPageModule {}
