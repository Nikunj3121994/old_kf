import {Texture} from "./Texture";

class Sprite {

    sheet:Texture;
    uv:Array<number>;

    constructor(sheet:Texture, uv:Array<number> = null){
        super(0, 0);

        this.sheet = sheet;
        this.uv = <Array<number>> uv;
    }

    hasLoaded():boolean {
        return null;
    }
}