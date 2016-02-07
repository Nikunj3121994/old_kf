import Signal from "../event/Signal";
import Rectangle from "../../visual/data/Rectangle";

export class Texture extends AbstractTexture
{
    public static createFromUrl(gl:WebGLRenderingContext, src:string):Texture
    {
        var img = document.createElement('img');
        img.src = src;

        return new Texture(gl, img);
    }

    public static getFullUV():Array<number>
    {
        return [
            0.0 , 0.0,  // 0
            0.0 , 1.0,  // 1
            1.0 , 0.0,  // 2

            0.0 , 1.0,  // 1
            1.0 , 1.0,  // 3
            1.0 , 0.0   // 2
        ];
    }

    width:number = 0;
    height:number = 0;

    _hasLoaded:boolean = false;

    signalLoad:Signal = new Signal();

    constructor(gl:WebGLRenderingContext, source:ImageData | HTMLCanvasElement | HTMLImageElement ){
        super(gl, source);

        if( (<HTMLImageElement> source).nodeName
            && (<HTMLImageElement> source).tagName.toLowerCase() == 'img')
        {
            var img = <HTMLImageElement> this.source;
            if(!img.complete){
                var load = () => {
                    img.removeEventListener('load',load);
                    this.width = img.naturalWidth;
                    this.height = img.naturalHeight;
                    this._hasLoaded = true;
                    this.signalLoad.emit();
                };
                img.addEventListener('load',load)
            } else {
                this.width = this.source.width;
                this.height = this.source.height;
                this._hasLoaded = true;

                setImmediate(() => this.signalLoad.emit());
            }
        } else {
            this.width = this.source.width;
            this.height = this.source.height;
            this._hasLoaded = true;

            setImmediate(() => this.signalLoad.emit());
        }
    }

    /**
     * 0---2
     * | / |
     * 1---3
     * @param rect
     * @returns {number[]}
     */
    getUVFromRect(rect:Rectangle):Array<number>
    {
        var width = this.width;
        var height = this.height;

        var f = [rect.x / width,  rect.y / height, rect.w / width,  rect.h / height];


        return [
            f[0]        , f[1],         // 0
            f[0]        , f[1] + f[3],  // 1
            f[0] + f[2] , f[1],         // 2

            f[0]        , f[1] + f[3],  // 1
            f[0] + f[2] , f[1] + f[3],  // 3
            f[0] + f[2] , f[1]          // 2
        ];
    }

    getFullUV():Array<number>
    {
        return Texture.getFullUV();
    }

}