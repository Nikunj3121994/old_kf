/*
 * Rectangle
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module EaselJS
 */


/**
 * Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
 *
 * <h4>Example</h4>
 *
 *      var rect = new createjs.Rectangle(0, 0, 100, 100);
 *
 * @class Rectangle
 * @param {Number} [x=0] X position.
 * @param {Number} [y=0] Y position.
 * @param {Number} [width=0] The width of the Rectangle.
 * @param {Number} [height=0] The height of the Rectangle.
 * @constructor
 **/
export class Rectangle
{
	/**
	 * X position.
	 * @property x
	 * @type Number
	 **/
	public x:number = 0;

	/**
	 * Y position.
	 * @property y
	 * @type Number
	 **/
	public y:number = 0;

	/**
	 * Width.
	 * @property w
	 * @type Number
	 **/
	public w:number = 0;

	/**
	 * Height.
	 * @property h
	 * @type Number
	 **/
	public h:number = 0;

	constructor(x:number, y:number, width:number, height:number)
	{
		this.setProperies(x, y, width, height);
	}

	public setProperies(x:number, y:number, width:number, height:number):Rectangle
	{
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		return this;
	}

	/**
	 * Copies all properties from the specified rectangle to this rectangle.
	 * @method copy
	 * @param {Rectangle} rectangle The rectangle to copy properties from.
	 * @return {Rectangle} This rectangle. Useful for chaining method calls.
	 */
	public copy(rectangle:Rectangle):Rectangle
	{
		return this.setProperies(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
	}

	/**
	 * Returns a clone of the Rectangle instance.
	 * @method clone
	 * @return {Rectangle} a clone of the Rectangle instance.
	 **/
	public clone():Rectangle
	{
		return new Rectangle(this.x, this.y, this.w, this.h);
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	public toString():string
	{
		return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.w + " height=" + this.h + ")]";
	}
}