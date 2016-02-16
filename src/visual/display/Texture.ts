import {AbstractTexture} from "./AbstractTexture";
import {Rectangle} from "../../visual/data/Rectangle";
import {Signal} from "../../core/event/Signal";
import ILoadable from "../../core/interface/ILoadable";
import Promise from "../../core/util/Promise";

export class Texture extends AbstractTexture implements ILoadable<Texture>
{

	public static createFromUrl(src:string):Texture
	{
		var img = document.createElement('img');
		img.src = src;

		return new Texture(img);
	}

	public static getFullUV():Array<number>
	{
		//3, 2, 1, 3, 1, 0

		//return [
		//    0.0 , 0.0,  // 0
		//    0.0 , 1.0,  // 1
		//    1.0 , 0.0,  // 2
		//
		//    0.0 , 1.0,  // 1
		//    1.0 , 1.0,  // 3
		//    1.0 , 0.0   // 2
		//];
		return [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0
		];
	}

	public static getUVFromRect(text:Texture, rect:Rectangle):Float32Array
	{
		var w = text.width;
		var h = text.height;
		var rx = rect.x;
		var ry = rect.y;
		var rw = rect.width;
		var rh = rect.height;

		return new Float32Array([
			rx / w, ry / h,
			rx / w + rw / w, ry / h,
			rx / w + rw / w, ry / h + rh / h,
			rx / w, ry / h + rh / h
		]);
	}

	width:number = 0;
	height:number = 0;

	onload:Signal = new Signal();
	_hasLoaded:boolean = false;

	constructor(source:ImageData | HTMLCanvasElement | HTMLImageElement)
	{
		super(source);

		if((<HTMLImageElement> source).nodeName
			&& (<HTMLImageElement> source).tagName.toLowerCase() == 'img')
		{
			var img = <HTMLImageElement> this.source;
			if(!img.complete)
			{
				var load = () =>
				{
					this._hasLoaded = true;
					img.removeEventListener('load', load);
					this.width = img.naturalWidth;
					this.height = img.naturalHeight;
					this.onload.emit();
				};
				img.addEventListener('load', load)
			}
			else
			{
				this._hasLoaded = true;
				this.width = this.source.width;
				this.height = this.source.height;

				setImmediate(() => this.onload.emit());
			}
		}
		else
		{
			this._hasLoaded = true;
			this.width = this.source.width;
			this.height = this.source.height;

			setImmediate(() => this.onload.emit());
		}
	}

	public hasLoaded():boolean
	{
		return this._hasLoaded;
	}


	public load(onProgress?:(progress:number)=>any):Promise<Texture>
	{
		var result:Promise<Texture>;
		if(this.hasLoaded())
		{
			if(onProgress)
			{
				onProgress(1);
			}

			result = Promise.resolve<Texture>(this);
		}
		else
		{

			result = new Promise<Texture>((resolve) => {
				if(this.hasLoaded())
				{
					if(onProgress)
					{
						onProgress(1);
					}

					resolve(this)
				} else {
					this.onload.connect(() => {
						if(onProgress)
						{
							onProgress(1);
						}

						resolve(this);
					}).once();
				}
			})
		}

		return result;
	}

	getFullUV():Array<number>
	{
		return Texture.getFullUV();
	}

}