import { IGlobal } from '../models/clock-interface';

export const Global: IGlobal = {
    clock: null
};

export const Const = {

  DEFAULT: {
    COLOUR: 0,
    SHADE: 0,
    SIZE: "50px",
    BRIGHTNESS: 0.5,
    WEIGHT: 100,
  },

  MAX_SHADES: 3,

  COLOURS: [
    { name: 'Green',	hex: ['#008202', '#004F00', '#001C00'] },
    { name: 'White',	hex: ['#FFFFFF', '#666666', '#1A1A1A'] },
    { name: 'Red',		hex: ['#820000', '#4F0000', '#1C0000'] },
    { name: 'Gold',		hex: ['#828000', '#4F4D00', '#1C1A00'] },
    { name: 'Cyan',		hex: ['#007082', '#003D4F', '#000A1C'] }
  ],

  PAGES: {
    HOME: "HomePage",
    CONFIG: "ConfigPage"
  }
}