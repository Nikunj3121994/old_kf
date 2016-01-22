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

	constructor(domElement:HTMLCanvasElement = <HTMLCanvasElement> document.createElement('canvas'), width:number, height:number)
	{
		this.domElement = domElement;

		this.setSize(width, height);
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
		this.setWidth(width);
		this.setHeight(height);
	}

	public setHeight(value:number):void
	{
		this.domElement.height = this._height = value;
	}

	public setWidth(value:number):void
	{
		this.domElement.height = this._width = value;
	}

	public destruct():void
	{
		this.domElement = void 0;
		this._width = void 0;
		this._height = void 0;
	}
}