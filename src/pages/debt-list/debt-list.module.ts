import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DebtListPage } from './debt-list';
import { DebtListProvider } from '../../providers/debt-list.provider';

@NgModule({
  declarations: [
    DebtListPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(DebtListPage),
  ],
  exports: [
    DebtListPage,
  ],
  providers: [
    DebtListProvider
  ]

})
export class DebtListPageModule {}
