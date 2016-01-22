import {Canvas} from "./Canvas";
import QualityType from "../../visual/enum/QualityType";
import Rectangle from "../../visual/geom/Rectangle";

/**
 * Creates a Canvas element of the given size.
 *
 * @class CanvasBuffer
 * @param width {number} the width for the newly created canvas
 * @param height {number} the height for the newly created canvas
 */
export class Canvas2d extends Canvas
{
	protected _context:CanvasRenderingContext2D;
	protected _quality:QualityType = QualityType.NORMAL;

	public clearColor:string = null;

	public setHeight(value:number):void
	{
		super.setHeight(value);
		this.setQuality(this._quality);
	}

	public setWidth(value:number):void
	{
		super.setWidth(value);
		this.setQuality(this._quality);
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):void
	{
		var w = this._width, h = this._height;
		ctx.drawImage(this.domElement, 0, 0, w, h, 0, 0, w, h);
	}

	public reset():void
	{
		this.getContext().setTransform(1, 0, 0, 1, 0, 0);
		this.clear();
	}

	public clear():void
	{
		var context = this.getContext(), width = this._width, height = this._height;

		if(!this.clearColor)
		{
			context.clearRect(0, 0, width, height);
		} else {
			context.fillStyle = this.clearColor;
			context.fillRect(0, 0, width, height);
		}
	}

	/**
	 * @method toDataURL
	 * @param backgroundColor
	 * @param mimeType The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
	 * @param quality Quality of the image 0.1 low, 1.0 high
	 * @returns {string}
	 */
	public toDataURL(backgroundColor?:string, mimeType:string = "image/png", quality:number = 1.0):string
	{
		var ctx = this.getContext();
		var w = this.width;
		var h = this.height;

		var data;

		if(backgroundColor)
		{

			//get the current ImageData for the canvas.
			data = ctx.getImageData(0, 0, w, h);

			//store the current globalCompositeOperation
			var compositeOperation = ctx.globalCompositeOperation;

			//set to draw behind current content
			ctx.globalCompositeOperation = "destination-over";

			//set background color
			ctx.fillStyle = backgroundColor;

			//draw background on entire canvas
			ctx.fillRect(0, 0, w, h);
		}

		//get the image data from the canvas
		var dataURL = this.domElement.toDataURL(mimeType, quality);

		if(backgroundColor)
		{
			//clear the canvas
			ctx.clearRect(0, 0, w + 1, h + 1);

			//restore it with original settings
			ctx.putImageData(data, 0, 0);

			//reset the globalCompositeOperation to what it was
			ctx.globalCompositeOperation = compositeOperation;
		}

		return dataURL;
	}

	/**
	 *
	 * @returns {Rectangle}
	 */
	public getImageData(x:number = 0, y:number = 0, width:number = this._width, height:number = this._height):ImageData
	{
		return this._context.getImageData(x, y, width, height);
	}

	/**
	 *
	 * @returns {Rectangle}
	 */

	public getDrawBounds():Rectangle
	{
	 var width = Math.ceil(this.width);
	 var height = Math.ceil(this.height);

	 var pixels = this.getImageData();

	 var data = pixels.data,
	 x0 = width,
	 y0 = height,
	 x1 = 0,
	 y1 = 0;

	 for(var i = 3, l = data.length, p = 0; i < l; i += 4, ++p)
	 {
	 var px = p % width;
	 var py = Math.floor(p / width);

	 if(data[i - 3] > 0 ||
	 data[i - 2] > 0 ||
	 data[i - 1] > 0 ||
	 data[i] > 0)
	 {
	 x0 = Math.min(x0, px);
	 y0 = Math.min(y0, py);
	 x1 = Math.max(x1, px);
	 y1 = Math.max(y1, py);
	 }
	 }

	 return new Rectangle(x0, y0, x1 - x0, y1 - y0);
	}

	public getContext():CanvasRenderingContext2D
	{
		if(!this._context)
		{
			this._context = this.domElement.getContext('2d')
		}
		return this._context;
	}


	/**
	 * @method setQuality
	 * @param {string} name
	 */
	public setQuality(name:QualityType):void
	{
		var ctx = this.getContext();

		switch(name)
		{
			case QualityType.LOW:
			{
				this._quality = name;
				ctx['mozImageSmoothingEnabled'] = false;
				ctx['webkitImageSmoothingEnabled'] = false;
				ctx['msImageSmoothingEnabled'] = false;
				ctx['imageSmoothingEnabled'] = false;
				break;
			}

			case QualityType.NORMAL:
			{
				this._quality = name;
				ctx['mozImageSmoothingEnabled'] = true;
				ctx['webkitImageSmoothingEnabled'] = true;
				ctx['msImageSmoothingEnabled'] = true;
				ctx['imageSmoothingEnabled'] = true;
				break;
			}
		}

	}
}