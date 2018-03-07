import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { AccountProvider } from '../../providers/account.provider';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AccountPage,
    ],
    imports: [
        TranslateModule,
        IonicPageModule.forChild(AccountPage),
    ],
    exports: [
        AccountPage
    ],
    providers: [
        AccountProvider
    ]
})
export class AccountPageModule { }