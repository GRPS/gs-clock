import { ClockClass } from './../../models/clock-class';
import { ClockProvider } from './../../providers/clock';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Global, Const } from './../../providers/const';

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  clock: ClockClass;
  colours: any = Const.COLOURS;
  shades: string[] = ['High', 'Medium', 'Low'];
  shades2: any[] = [];

  constructor(
    public navCtrl: NavController,
    private clockProvider: ClockProvider
  ) {
    this.clock = Global.clock;
    this.shades2 = [
      { name: 'Bright', level: 1 },
      { name: 'Medium', level: 0.5 },
      { name: 'Low', level: 0.25 },
      { name: 'Dimmed', level: 0 }
    ];
  }

  ToggleGestures() {
	  Global.clock.gestures = this.clock.gestures ? false : true;
    this._UpdateClock();
  }

  SetColour(index) {
    Global.clock.colorIndex = index;
    this.clockProvider.SetColour(false);
    this._UpdateClock();
  }

  DoShade(index: number) {
    Global.clock.shadeIndex = index;
    this.clockProvider.SetColour(false);
    this._UpdateClock();
  }

  DoShade2(value: number) {
    Global.clock.brightness = value;
    this.clockProvider.SetBrightness();
    this._UpdateClock();
  }

  private _UpdateClock() {
    this.clock = Global.clock;
    this.clockProvider.Save();
  }
}
