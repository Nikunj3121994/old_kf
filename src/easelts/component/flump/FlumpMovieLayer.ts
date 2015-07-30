import DisplayObject = require('../../display/DisplayObject');
import FlumpLibrary = require('../FlumpLibrary');
import FlumpLayerData = require('./FlumpLayerData');
import FlumpKeyframeData = require('./FlumpKeyframeData');
import FlumpTexture = require('./FlumpTexture');
import FlumpMovie = require('./FlumpMovie');
import FlumpLabelData = require('./FlumpLabelData');

class FlumpMovieLayer extends DisplayObject
{
	public name:string = '';
	private _frame:number = -1;
	public flumpLayerData:FlumpLayerData;

	_symbol; // BitmapDrawable
	_symbols = {};
	_storedMtx = {
		a:0,
		b:0,
		c:0,
		d:0,
		tx:0,
		ty:0
	};

	constructor(flumpMove:FlumpMovie, flumpLayerData:FlumpLayerData)
	{
		super();

		this.flumpLayerData = flumpLayerData;
		this.name = flumpLayerData.name;

		var flumpLibrary = flumpMove.flumpLibrary;

		for(var i = 0; i < flumpLayerData.flumpKeyframeDatas.length; i++)
		{
			var keyframe = flumpLayerData.flumpKeyframeDatas[i];

			if( keyframe.label )
			{
				flumpMove['_labels'][keyframe.label] = new FlumpLabelData(keyframe.label, keyframe.index, keyframe.duration);
			}

			if( ( ( <any> keyframe.ref) != -1 && ( <any> keyframe.ref) != null) && ( keyframe.ref in this._symbols ) == false)
			{
				this._symbols[keyframe.ref] = flumpMove.flumpLibrary.createSymbol(keyframe.ref, false);
			}
		}
		
		
		this.setFrame(0);
	}

	//Matrix get transformationMatrix => _transformationMatrix;

	public onTick(delta:number):boolean
	{
		if( this._symbol != null && !(this._symbol instanceof FlumpTexture))
		{
			return this._symbol.onTick(delta);
		}
		else
		{
			return false;
		}
	}

	public setFrame(frame:number):void
	{
		if(this._frame == frame){
			return;
		}

		this._frame = frame;

		var keyframe:FlumpKeyframeData = this.flumpLayerData.getKeyframeForFrame(frame);
		if(!(keyframe instanceof FlumpKeyframeData))
		{
			this._symbol = null;
			return;
		}

		var x:number = keyframe.x;
		var y:number = keyframe.y;
		var scaleX:number = keyframe.scaleX;
		var scaleY:number = keyframe.scaleY;
		var skewX:number = keyframe.skewX;
		var skewY:number = keyframe.skewY;
		var pivotX:number = keyframe.pivotX;
		var pivotY:number = keyframe.pivotY;
		var alpha:number = keyframe.alpha;

		if(keyframe.index != frame && keyframe.tweened)
		{
			var nextKeyframe = this.flumpLayerData.getKeyframeAfter(keyframe);
			
			if(nextKeyframe instanceof FlumpKeyframeData)
			{
				var interped = (frame - keyframe.index) / keyframe.duration;
				var ease = keyframe.ease;

				if(ease != 0)
				{
					var t = 0.0;
					if(ease < 0)
					{
						var inv = 1 - interped;
						t = 1 - inv * inv;
						ease = 0 - ease;
					}
					else
					{
						t = interped * interped;
					}
					interped = ease * t + (1 - ease) * interped;
				}

				x = x + (nextKeyframe.x - x) * interped;
				y = y + (nextKeyframe.y - y) * interped;
				scaleX = scaleX + (nextKeyframe.scaleX - scaleX) * interped;
				scaleY = scaleY + (nextKeyframe.scaleY - scaleY) * interped;
				skewX = skewX + (nextKeyframe.skewX - skewX) * interped;
				skewY = skewY + (nextKeyframe.skewY - skewY) * interped;
				alpha = alpha + (nextKeyframe.alpha - alpha) * interped;
			}
		}

		/*
		 _transformationMatrixPrivate.identity();
		 _transformationMatrixPrivate.translate(-pivotX, -pivotY);
		 _transformationMatrixPrivate.scale(scaleX, scaleY);
		 _transformationMatrixPrivate.skew(skewX, skewY);
		 _transformationMatrixPrivate.translate(x, y);
		 */

		//pivotX *= 2;
		//pivotY *= 2;

		this._storedMtx.a =   scaleX * Math.cos(skewY);
		this._storedMtx.b =   scaleX * Math.sin(skewY);
		this._storedMtx.c = - scaleY * Math.sin(skewX);
		this._storedMtx.d =   scaleY * Math.cos(skewX);
		this._storedMtx.tx =  x - (pivotX * this._storedMtx.a + pivotY * this._storedMtx.c);
		this._storedMtx.ty =  y - (pivotX * this._storedMtx.b + pivotY * this._storedMtx.d);
		//
		//console.log(frame, pivotX, pivotY);
		
		//console.log( skewX, skewY, pivotX, pivotY);
		
		
		//this.setTransform(x, y, scaleX, scaleY, 0, skewX * (180/Math.PI), skewY * (180/Math.PI), pivotX * 2, pivotY* 2);
		//console.log(frame, x, y, scaleX, scaleY, 0, skewX, skewY, pivotX, pivotY);
		
		//_transformationMatrix.setTo(a, b, c, d, tx, ty);

		this.alpha = alpha;
		this.visible = keyframe.visible;

		this._symbol = ( ( <any> keyframe.ref) != -1 || ( <any> keyframe.ref) != null) ? this._symbols[keyframe.ref] : null;

		//if( this._symbol.instanceOf)

		//this._symbol.x = x;
		//this._symbol.y = x;
		//this._symbol.scaleX = scaleX;
		//this._symbol.scaleY = scaleY;
		//this._symbol.rotation = 0;
		//this._symbol.x = x;
	}


	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean
	{
		if (this._symbol != null){
			this._symbol.draw(ctx);
		}
		return true;
	}
}

export = FlumpMovieLayer;