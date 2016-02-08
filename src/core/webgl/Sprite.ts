import SpriteSheet from "../../visual/display/SpriteSheet";
import {Texture} from "./Texture";
import DisplayObject from "../../visual/display/DisplayObject";

class Sprite extends DisplayObject {

    sheet:Texture;
    uv:Array<number>;

    constructor(sheet:Texture, uv:Array<number> = null){
        super();

        this.sheet = sheet;
        this.uv = <Array<number>> uv;
    }

    hasLoaded():boolean {
        return null;
    }
}