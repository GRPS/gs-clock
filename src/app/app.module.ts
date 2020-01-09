import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Insomnia } from '@ionic-native/insomnia';
import { Brightness } from '@ionic-native/brightness';
import { IonicStorageModule } from '@ionic/storage';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from './app.component';
import { ClockProvider } from '../providers/clock';

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		// override hammerjs default configuration
		'pan': { threshold: 5 },
		'swipe': {
			velocity: 0.4,
			threshold: 20,
			direction: 31 // /!\ ugly hack to allow swipe in all direction
		}
	}
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot( {
			name: '__gs-clock',
			driverOrder: [ 'indexeddb', 'sqlite', 'websql' ]
			})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    Insomnia,
    Brightness,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    ClockProvider
  ]
})
export class AppModule {}
