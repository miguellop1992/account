import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { AccountProvider } from '../../providers/account.provider';

@NgModule({
    declarations: [
        AccountPage,
    ],
    imports: [
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