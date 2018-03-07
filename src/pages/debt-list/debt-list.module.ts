import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DebtListPage } from './debt-list';

@NgModule({
  declarations: [
    DebtListPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(DebtListPage),
  ],
  exports: [
    DebtListPage
  ]
})
export class DebtListPageModule {}
