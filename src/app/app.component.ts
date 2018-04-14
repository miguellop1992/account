import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';

import { HomePage } from '../pages/home/home';
import { DebtListPage } from '../pages/debt-list/debt-list';
import { AboutPage } from '../pages/about/about';

import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  

  constructor(public platform: Platform,  private globalization: Globalization, public statusBar: StatusBar, public splashScreen: SplashScreen, public translate: TranslateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: HomePage.title, component: HomePage },
      { title: DebtListPage.title, component: DebtListPage },
    ];

  }

  
  initializeApp() {
    this.globalization.getPreferredLanguage()
      .then(res => {
        let lang="es";
        if(res.value.indexOf("es")<0){
          lang="en";
        }
        this.translate.setDefaultLang(lang);
      })
      .catch(e => this.translate.setDefaultLang("es"));

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.ads();


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openAbout() {
    this.nav.setRoot(AboutPage);
  }
}
