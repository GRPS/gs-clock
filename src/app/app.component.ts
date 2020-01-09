import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Insomnia } from '@ionic-native/insomnia';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = 'HomePage';

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, insomnia: Insomnia, androidFullScreen: AndroidFullScreen ) {
		platform.ready().then(() => {

			statusBar.styleDefault();
			splashScreen.hide();

			androidFullScreen.isImmersiveModeSupported()
				.then( 
					() => androidFullScreen.immersiveMode()
				)
				.catch( ( error: any ) => alert( JSON.stringify( error ) ) 
			);
			
			insomnia.keepAwake()
				.then( 
					() => {}
				)
				.catch( ( error: any ) => alert( JSON.stringify( error ) ) 
			);
	  			
		});
	}
}

