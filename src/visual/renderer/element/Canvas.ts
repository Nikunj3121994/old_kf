import {Signal} from "../../../core/event/Signal";
import Signal2 from "../../../core/event/Signal2";
/**
 * Creates a Canvas element of the given size.
 *
 * @class CanvasBuffer
 * @param width {number} the width for the newly created canvas
 * @param height {number} the height for the newly created canvas
 */
export class Canvas
{
	/**
	 * The Canvas object that belongs to this CanvasBuffer.
	 *
	 * @member {HTMLCanvasElement}
	 */
	public domElement:HTMLCanvasElement;

	protected _width:number;
	protected _height:number;

	public onResize:Signal2<number, number> = new Signal2<number, number>();

	constructor(domElement?:HTMLCanvasElement, width?:number, height?:number)
	{
		if(!domElement){
			domElement = <HTMLCanvasElement> document.createElement('canvas');

			if(width == null || height == null ){
				throw new Error('width and height are required when not providing a HTMLCanvasElement');
			}
		} else {
			if(width == null)
			{
				width = domElement.width;
			}

			if(height == null)
			{
				height = domElement.height;
			}
		}

		this.domElement = domElement;
		this.setSize(width, height);
	}

	public appendTo(element:Element):void
	{
		element.appendChild(this.domElement);
	}

	set width(value:number)
	{
		this.setWidth(value);
	}

	get width():number
	{
		return this._width;
	}

	set height(value:number)
	{
		this.setHeight(value);
	}

	get height():number
	{
		return this._height;
	}

	/**
	 *
	 * @param width
	 * @param height
	 */
	public setSize(width:number, height:number):void
	{
		this.domElement.width = this._width = width;
		this.domElement.height = this._height = height;
		this.onResize.emit(width, height);
	}

	public setHeight(value:number):void
	{
		this.domElement.height = this._height = value;
		this.onResize.emit(this._width, this._height);
	}

	public setWidth(value:number):void
	{
		this.domElement.width = this._width = value;
		this.onResize.emit(this._width, this._height);
	}

	public getHeight():number
	{
		return this._height;
	}

	public getWidth():number
	{
		return this._width;
	}

	public destruct():void
	{
		this.domElement = void 0;
		this._width = void 0;
		this._height = void 0;
	}
}