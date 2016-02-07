import SpriteSheet from "../../visual/display/SpriteSheet";
import {Texture} from "./Texture";
import Rectangle from "../../visual/data/Rectangle";
import DisplayObject from "../../visual/display/DisplayObject";

class Sprite extends DisplayObject {

    sheet:Texture;
    rect:Rectangle;

    uv:Array<number>;

    constructor(sheet:Texture, rect:Rectangle|Array<number> = null){
        super();

        this.sheet = sheet;

        if(rect instanceof Rectangle){
            this.rect = <Rectangle> rect;
        } else {
            this.uv = <Array<number>> rect;
        }
    }

    hasLoaded():boolean {
        return null;
    }

    public draw2d(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean {
        return null;
    }

    public draw3d(gl:WebGLRenderingContext):boolean {
        return null;
    }


}