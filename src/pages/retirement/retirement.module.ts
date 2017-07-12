import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetirementModal } from './retirement';
import { OperationProvider } from '../../providers/operation.provider';

@NgModule({
  declarations: [
    RetirementModal,
  ],
  imports: [
    IonicPageModule.forChild(RetirementModal),
  ],
  exports: [
    RetirementModal
  ],
  providers: [
    OperationProvider
  ]
})
export class RetirementPageModule {}
