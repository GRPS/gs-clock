import { ClockClass } from './../models/clock-class';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Brightness } from '@ionic-native/brightness';

import { Const, Global } from '../providers/const';

@Injectable()
export class ClockProvider {
  constructor(private brightness: Brightness, private storage: Storage) {}

  SetDefaults() {
    Global.clock = new ClockClass();
    Global.clock.colorIndex = 0;
    Global.clock.shadeIndex = 0;
    Global.clock.size = Const.DEFAULT.SIZE;
    Global.clock.brightness = Const.DEFAULT.BRIGHTNESS;
    Global.clock.weight = Const.DEFAULT.WEIGHT;
    this.Save();
  }

  private _AreGesturesAllowed() {
    return Global.clock.gestures;
  }

  ToggleGesture() {
    Global.clock.gestures = !Global.clock.gestures;
    this.Save();
  }

  ChangeColorLeft() {
    if (!this._AreGesturesAllowed()) return;

    Global.clock.colorIndex--;
    if (Global.clock.colorIndex < 0)
      Global.clock.colorIndex = Const.COLOURS.length - 1;
    this.SetColour();
  }

  ChangeColorRight() {
    if (!this._AreGesturesAllowed()) return;

    Global.clock.colorIndex++;
    if (Global.clock.colorIndex > Const.COLOURS.length - 1)
      Global.clock.colorIndex = 0;
    this.SetColour();
  }

  ChangeColorUp() {
    if (!this._AreGesturesAllowed()) return;

    Global.clock.shadeIndex--;
    if (Global.clock.shadeIndex < 0) Global.clock.shadeIndex = 0;
    this.SetColour();
  }

  ChangeColorDown() {
    if (!this._AreGesturesAllowed()) return;

    Global.clock.shadeIndex++;
    let max: number = Const.COLOURS[0].hex.length - 1;
    if (Global.clock.shadeIndex > max) Global.clock.shadeIndex = max;
    this.SetColour();
  }

  ChangeFontSize(isIn: boolean) {
    if (!this._AreGesturesAllowed()) return;

    let size: number = Number(Global.clock.size.replace('px', ''));
    if (isIn) {
      size--;
    } else {
      size++;
    }
    if (size < 0) size = 0;
    Global.clock.size = size + 'px';
    this.Save();
  }

  ChangeBrightness() {
    if (!this._AreGesturesAllowed()) return;

    Global.clock.brightness = Global.clock.brightness + 0.25;
    if (Global.clock.brightness > 1) Global.clock.brightness = 0;
    else if (Global.clock.brightness == 0.75) Global.clock.brightness = 1;
    this.SetBrightness();
  }

  ChangeWeight() {
    if (!this._AreGesturesAllowed()) return;

    this.SetWeight();
  }

  GetTime() {
    setTimeout(() => {
      Global.clock.dt = new Date();
      this.GetTime();
    }, 1000);
  }

  SetBrightness(doSave: boolean = true) {
    this.brightness.setBrightness(Global.clock.brightness);
    if (doSave) this.Save();
  }

  SetWeight(doSave: boolean = true) {
    Global.clock.weight = Global.clock.weight == 100 ? 400 : 100;
    if (doSave) this.Save();
  }

  SetColour(doSave: boolean = true) {
    let colourObj = Const.COLOURS[Global.clock.colorIndex];
    Global.clock.color = colourObj.hex[Global.clock.shadeIndex];
    if (doSave) this.Save();
  }

  Save() {
    this.storage.set('clock', JSON.stringify(Global.clock));
  }
}
