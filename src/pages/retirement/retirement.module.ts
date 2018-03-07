import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetirementModal } from './retirement';
import { OperationProvider } from '../../providers/operation.provider';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RetirementModal,
  ],
  imports: [
    TranslateModule,
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
