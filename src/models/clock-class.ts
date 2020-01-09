export class ClockClass {
    dt:         any;    //Datetime.

    color:      string; //Hex colour of text.
    size:       string; //Font size of clock.
    brightness: number; //Screen brightness.
    weight:     number; //Font weight.

    colorIndex: number; //Colour index of text.
    shadeIndex: number; //Brightness index  of text.
    chunkIndex: number; //Font weight index of text.

    gestures: boolean;  //Allow getures.

    constructor( values: Object = {} ) {
        Object.assign(this, values);		
    }
    
}
