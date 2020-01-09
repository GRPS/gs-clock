import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


import { Storage } from '@ionic/storage';
import { Const, Global } from '../../providers/const';
import { ClockClass } from './../../models/clock-class';
import { ClockProvider } from './../../providers/clock';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clock: ClockClass;

  constructor(
    public navCtrl: NavController,
    private clockProvider: ClockProvider,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    if (Global.clock == null) {
      this.storage.get('clock').then(clock => {
        if (clock == null) {
          this.clock = new ClockClass();
          this.clock.colorIndex = 0;
          this.clock.shadeIndex = 0;
          this.clock.size = Const.DEFAULT.SIZE;
          this.clock.brightness = Const.DEFAULT.BRIGHTNESS;
          this.clock.weight = Const.DEFAULT.WEIGHT;
          this.clock.gestures = false;
          Global.clock = this.clock;
        } else {
          Global.clock = JSON.parse(clock);
          this.clock = Global.clock;
        }
        this.clockProvider.SetBrightness(false);
        this.clockProvider.SetColour(false);
        this.clockProvider.GetTime();
      });
    }
  }

  SetColour(doSave: boolean = true) {
    this.clockProvider.SetColour(doSave);
  }

  swipeLeft() {
    this.clockProvider.ChangeColorLeft();
  }

  swipeRight() {
    this.clockProvider.ChangeColorRight();
  }

  swipeUp() {
    this.clockProvider.ChangeColorUp();
  }

  swipeDown() {
    this.clockProvider.ChangeColorDown();
  }

  pinchIn() {
    this.clockProvider.ChangeFontSize(true);
  }

  pinchOut() {
    this.clockProvider.ChangeFontSize(false);
  }

  tap() {
    this.clockProvider.ChangeBrightness();
  }

  press() {
    this.clockProvider.SetWeight();
  }

  config() {
    this.navCtrl.push(Const.PAGES.CONFIG);
  }

  toggleGesture() {
	  this.clockProvider.ToggleGesture();
  }
}