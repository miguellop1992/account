import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositModal } from './deposit';
import { OperationProvider } from '../../providers/operation.provider';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DepositModal,
  ],
  imports: [
    TranslateModule,
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
