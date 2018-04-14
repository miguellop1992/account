import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationPage, PopoverObservation } from './operation';
import { AccountProvider } from '../../providers/account.provider';
import { OperationProvider } from '../../providers/operation.provider';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OperationPage,
    PopoverObservation
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(OperationPage),
  ],
  exports: [
    OperationPage
  ],
  providers: [
    AccountProvider,
    OperationProvider
  ],
  entryComponents:[
    PopoverObservation
  ]
})
export class OperationPageModule {}
