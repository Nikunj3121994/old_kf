/*
 * DisplayObject
 *
 * Copyright (c) 2015-2016 Mient-jan Stelling.
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


import DisplayType from "../enum/DisplayType";
import UID from "../../core/util/UID";
import Container from "./Container";
import Rectangle from "../data/Rectangle";
import Promise from "../../core/util/Promise";
import Point from "../geom/Point";
import Matrix2 from "../geom/Matrix2";
import ILoadable from "../../core/interface/ILoadable";

/**
 * @author Mient-jan Stelling <mientjan.stelling@gmail.com>
 * @class DisplayObject
 */
abstract class DisplayObject implements ILoadable
{
	public type:DisplayType = DisplayType.DISPLAYOBJECT;

	/**
	 * Unique ID for this display object. Makes display objects easier for some uses.
	 * @property id
	 * @type {Number}
	 * @default -1
	 **/
	public id:number = UID.get();

	/**
	 * A reference to the {{#crossLink "Container"}}{{/crossLink}} or {{#crossLink "Stage"}}{{/crossLink}} object that
	 * contains this display object, or null if it has not been added
	 * to one.
	 *
	 * @property parent
	 * @final
	 * @type {Container}
	 * @default null
	 * @readonly
	 **/
	public parent:Container<DisplayObject> = null;

	/**
	 * Indicates whether this display object should be rendered to the canvas and included when running the Stage
	 * {{#crossLink "Stage/getObjectsUnderPoint"}}{{/crossLink}} method.
	 * @property visible
	 * @type {Boolean}
	 * @default true
	 **/
	public visible:boolean = true;

	/**
	 * The alpha (transparency) for this display object. 0 is fully transparent, 1 is fully opaque.
	 * @property alpha
	 * @type {Number}
	 * @default 1
	 **/
	public alpha:number = 1;

	/**
	 * @property _bounds
	 * @protected
	 * @type {Rectangle}
	 * @default null
	 **/
	protected _bounds:Rectangle = null;

	protected _matrix:Matrix2 = new Matrix2();

	protected _hasLoaded:boolean = false;

	public width:number = 0;
	public height:number = 0;

	public x:number = 0;
	public y:number = 0;
	public scaleX:number = 1;
	public scaleY:number = 1;
	public rotation:number = 0;
	public skewX:number = 0;
	public skewY:number = 0;
	public regX:number = 0;
	public regY:number = 0;

	/**
	 * when true will not render, some added hack by the createjs exporter.
	 *
	 * @type {boolean}
	 * @private
	 */
	public _off:boolean = false;

	constructor(x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		//super();

		this.setTransform(x, y, regX, regY);
	}


	public hasLoaded():boolean{
    	return this._hasLoaded;
    }

	/**
	 *
	 * @param onProgress
	 * @returns {*|Promise}
	 */
	public load(onProgress?:(progress:number)=>any):Promise<DisplayObject>
	{
		return Promise.resolve(this);
	}

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns <code>true</code> if the draw was handled (useful for overriding functionality).
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw2d
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache. For example,
	 * used for drawing the cache (to prevent it from simply drawing an existing cache back into itself).
	 * @return {Boolean}
	 **/
	public abstract draw2d(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean;

	public abstract draw3d(gl:WebGLRenderingContext):boolean;

	/**
	 * Applies this display object's transformation, alpha, globalCompositeOperation, clipping path (mask), and shadow
	 * to the specified context. This is typically called prior to {{#crossLink "DisplayObject/draw"}}{{/crossLink}}.
	 *
	 * @method updateContext
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D to update.
	 **/
	public updateContext(ctx:CanvasRenderingContext2D):void
	{
		var mtx, o = this;

		mtx = o._matrix.identity().appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
		var tx = mtx.tx, ty = mtx.ty;

		//ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, tx, ty);
		//ctx.globalAlpha *= o.alpha;

	}

	/**
	 * Transforms the specified x and y position from the coordinate space of the display object
	 * to the global (stage) coordinate space. For example, this could be used to position an HTML label
	 * over a specific point on a nested display object. Returns a Point instance with x and y properties
	 * correlating to the transformed coordinates on the stage.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.x = 300;
	 *      displayObject.y = 200;
	 *      stage.addChild(displayObject);
	 *      var point = myDisplayObject.localToGlobal(100, 100);
	 *      // Results in x=400, y=300
	 *
	 * @method localToGlobal
	 * @param {Number} x The x position in the source display object to transform.
	 * @param {Number} y The y position in the source display object to transform.
	 * @return {Point} A Point instance with x and y properties correlating to the transformed coordinates
	 * on the stage.
	 **/
	public localToGlobal(x:number, y:number):Point
	{
		var mtx = this.getConcatenatedMatrix(this._matrix);
		if(mtx == null)
		{
			return null;
		}
		mtx.append(1, 0, 0, 1, x, y);
		return new Point(mtx.tx, mtx.ty);
	}

	/**
	 * Transforms the specified x and y position from the global (stage) coordinate space to the
	 * coordinate space of the display object. For example, this could be used to determine
	 * the current mouse position within the display object. Returns a Point instance with x and y properties
	 * correlating to the transformed position in the display object's coordinate space.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.x = 300;
	 *      displayObject.y = 200;
	 *      stage.addChild(displayObject);
	 *      var point = myDisplayObject.globalToLocal(100, 100);
	 *      // Results in x=-200, y=-100
	 *
	 * @method globalToLocal
	 * @param {Number} x The x position on the stage to transform.
	 * @param {Number} y The y position on the stage to transform.
	 * @return {Point} A Point instance with x and y properties correlating to the transformed position in the
	 * display object's coordinate space.
	 **/
	public globalToLocal(x:number, y:number):Point
	{
		var mtx = this.getConcatenatedMatrix(this._matrix);
		if(mtx == null)
		{
			return null;
		}
		mtx.invert();
		mtx.append(1, 0, 0, 1, x, y);
		return new Point(mtx.tx, mtx.ty);
	}

	/**
	 * Transforms the specified x and y position from the coordinate space of this display object to the coordinate
	 * space of the target display object. Returns a Point instance with x and y properties correlating to the
	 * transformed position in the target's coordinate space. Effectively the same as using the following code with
	 * {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}} and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
	 *
	 *      var pt = this.localToGlobal(x, y);
	 *      pt = target.globalToLocal(pt.x, pt.y);
	 *
	 * @method localToLocal
	 * @param {Number} x The x position in the source display object to transform.
	 * @param {Number} y The y position on the source display object to transform.
	 * @param {DisplayObject} target The target display object to which the coordinates will be transformed.
	 * @return {Point} Returns a Point instance with x and y properties correlating to the transformed position
	 * in the target's coordinate space.
	 **/
	public localToLocal(x:number, y:number, target:DisplayObject):Point
	{
		var pt = this.localToGlobal(x, y);
		return target.globalToLocal(pt.x, pt.y);
	}

	/**
	 * Shortcut method to quickly set the transform properties on the display object. All parameters are optional.
	 * Omitted parameters will have the default value set.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.setTransform(100, 100, 2, 2);
	 *
	 * @method setTransform
	 * @param {Number} [x=0] The horizontal translation (x position) in pixels
	 * @param {Number} [y=0] The vertical translation (y position) in pixels
	 * @param {Number} [scaleX=1] The horizontal scale, as a percentage of 1
	 * @param {Number} [scaleY=1] the vertical scale, as a percentage of 1
	 * @param {Number} [rotation=0] The rotation, in degrees
	 * @param {Number} [skewX=0] The horizontal skew factor
	 * @param {Number} [skewY=0] The vertical skew factor
	 * @param {Number} [regX=0] The horizontal registration point in pixels
	 * @param {Number} [regY=0] The vertical registration point in pixels
	 * @return {DisplayObject} Returns this instance. Useful for chaining commands.
	 */
	public setTransform(x:number = 0, y:number = 0, scaleX:number = 1, scaleY:number = 1, rotation:number = 0, skewX:number = 0, skewY:number = 0, regX:number = 0, regY:number = 0)
	{
		this.x = x;
		this.y = y;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.rotation = rotation;
		this.skewX = skewX;
		this.skewY = skewY;
		this.regX = regX;
		this.regY = regY;

		return this;
	}

	/**
	 * Returns a matrix based on this object's transform.
	 * @method getMatrix
	 * @param {Matrix2D} matrix Optional. A Matrix2D object to populate with the calculated values. If null, a new
	 * Matrix object is returned.
	 * @return {Matrix2D} A matrix representing this display object's transform.
	 **/
	public getMatrix(matrix?:Matrix2)
	{
		var o = this;
		return (matrix ? matrix.identity() : new Matrix2())
			.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY)
			.appendProperties(o.alpha, o.shadow, o.compositeOperation, 1);
	}

	/**
	 * Generates a concatenated Matrix2D object representing the combined transform of the display object and all of its
	 * parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}). This can
	 * be used to transform positions between coordinate spaces, such as with {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
	 * and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
	 * @method getConcatenatedMatrix
	 * @param {Matrix2D} [matrix] A {{#crossLink "Matrix2D"}}{{/crossLink}} object to populate with the calculated values.
	 * If null, a new Matrix2D object is returned.
	 * @return {Matrix2D} a concatenated Matrix2D object representing the combined transform of the display object and
	 * all of its parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}).
	 **/
	public getConcatenatedMatrix(matrix:Matrix2):Matrix2
	{
		if(matrix)
		{
			matrix.identity();
		}
		else
		{
			matrix = new Matrix2();
		}
		var o:any = this;
		while(o != null)
		{
			matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).prependProperties(o.alpha, o.shadow, o.compositeOperation, o.visible);
			o = o.parent;
		}
		return matrix;
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	public toString()
	{
		return "[DisplayObject (name=" + this.name + ")]";
	}

	/**
	 * @method _tick
	 * @param {number} delta
	 * @protected
	 **/
	public onTick(delta:number)
	{

	}

	/**
	 * @method _getBounds
	 * @param {Matrix2D} matrix
	 * @param {Boolean} ignoreTransform If true, does not apply this object's transform.
	 * @return {Rectangle}
	 * @protected
	 **/
	protected _getBounds(matrix?:Matrix2, ignoreTransform?:boolean):Rectangle
	{
		return this._transformBounds(this.getBounds(), matrix, ignoreTransform);
	}

	/**
	 * @method _transformBounds
	 * @param {Rectangle} bounds
	 * @param {Matrix2D} matrix
	 * @param {Boolean} ignoreTransform
	 * @return {Rectangle}
	 * @protected
	 **/
	protected _transformBounds(bounds:Rectangle, matrix:Matrix2, ignoreTransform:boolean):Rectangle
	{
		if(!bounds)
		{
			return bounds;
		}
		var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
		var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);

		if(x || y)
		{
			mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y);
		}
		if(matrix)
		{
			mtx.prependMatrix(matrix);
		}

		var x_a = width * mtx.a, x_b = width * mtx.b;
		var y_c = height * mtx.c, y_d = height * mtx.d;
		var tx = mtx.tx, ty = mtx.ty;

		var minX = tx, maxX = tx, minY = ty, maxY = ty;

		if((x = x_a + tx) < minX)
		{
			minX = x;
		}
		else if(x > maxX)
		{
			maxX = x;
		}
		if((x = x_a + y_c + tx) < minX)
		{
			minX = x;
		}
		else if(x > maxX)
		{
			maxX = x;
		}
		if((x = y_c + tx) < minX)
		{
			minX = x;
		}
		else if(x > maxX)
		{
			maxX = x;
		}

		if((y = x_b + ty) < minY)
		{
			minY = y;
		}
		else if(y > maxY)
		{
			maxY = y;
		}
		if((y = x_b + y_d + ty) < minY)
		{
			minY = y;
		}
		else if(y > maxY)
		{
			maxY = y;
		}
		if((y = y_d + ty) < minY)
		{
			minY = y;
		}
		else if(y > maxY)
		{
			maxY = y;
		}

		return bounds.setProperies(minX, minY, maxX - minX, maxY - minY);
	}

	public onResize(width:number, height:number):void
	{

	}

	public destruct():void
	{
		if(this.parent)
		{
			this.parent.removeChild(this);
		}

		this.parent = <any> null;
	}
}

export default DisplayObject;
