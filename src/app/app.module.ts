import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccountPageModule } from '../pages/account/account.module';
import { OperationPageModule } from '../pages/operation/operation.module';
import { DepositPageModule } from '../pages/deposit/deposit.module';
import { RetirementPageModule } from '../pages/retirement/retirement.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    OperationPageModule,
    DepositPageModule,
    RetirementPageModule,
    AccountPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    SQLite,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
