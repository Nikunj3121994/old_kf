//
// Flambe - Rapid game development
// https://github.com/aduros/flambe/blob/master/LICENSE.txt

//package flambe.swf;
//
//import flambe.Component;
//import flambe.Entity;
//import flambe.swf.Library;
//import flambe.swf.MovieSprite;
//import flambe.util.Assert;
//import flambe.util.Value;

import FlumpLibrary = require('./FlumpLibrary');

/**
 * A convenient controller to play though multiple different movies. Designed for characters and
 * objects that have a separate Flump symbol for each of their animations, and need to switch
 * between them. The played movies will be added to a new child entity of the owner.
 */
class MoviePlayer
{
	/** The movie currently being shown. */
	//public var movie (default, null) :Value<MovieSprite>;
	//
	///** Whether the current movie is being looped. */
	//public var looping (get, null) :Bool;

	private _lib:FlumpLibrary;
	private _root:Entity;

	private _oneshotSprite:MovieSprite = null;
	private _loopingSprite:MovieSprite = null;

	//private _decorator:MovieSprite->Void;
	private _cache:{[name:string]:string|MovieSprite} [];

	constructor(lib:FlumpLibrary)
	{
		this._lib = lib;
		//_root = new Entity();

		movie = new Value<MovieSprite>(null);
		this.setCache(true);
	}

	/**
	 * Configures whether this MoviePlayer will keep a cache of all its MovieSprites, rather than
	 * creating a new instance for each play. This makes switching movies faster, at the expense of
	 * memory. By default, the cache is enabled. If this MoviePlayer plays lots of different movies,
	 * but doesn't switch through them too often, consider disabling the cache.
	 * @returns This instance, for chaining.
	 */
	//public function setCache(cache:Bool):MoviePlayer
	//{
	//    _cache = cache ? new Map() : null;
	//    return this;
	//}

	/**
	 * Configures the callback used to decorate newly created MovieSprites, if any. This can be used
	 * to dress up avatars or other custom initialization.
	 * @returns This instance, for chaining.
	 */
	//public function setDecorator (decorator :MovieSprite->Void) :MoviePlayer
	//{
	//    _decorator = decorator;
	//    return this;
	//}

	/**
	 * Shows a movie that plays once. When it completes, the last looping movie is returned to. It
	 * is an error to call this without starting a loop() first.
	 * @param name The symbol name of the movie to play.
	 * @param restart If this movie is already being played, whether it will restart it from the
	 *   beginning.
	 * @returns This instance, for chaining.
	 */
	public play(name:string, restart:boolean = true):MoviePlayer
	{
		Assert.that(_loopingSprite != null,
			"A loop must be started before the first call to play()");
		if(restart || _oneshotSprite == null || _oneshotSprite.symbol.name != name)
		{
			_oneshotSprite = playFromCache(name);
		}

		return this;
	}

	/**
	 * Shows a movie that loops forever.
	 * @param name The symbol name of the movie to loop.
	 * @param restart If this movie is already being looped, whether it will restart it from the
	 *   beginning.
	 * @returns This instance, for chaining.
	 */
	public loop(name:String, restart:Bool = true):MoviePlayer
	{
		if(restart || _loopingSprite == null || _loopingSprite.symbol.name != name)
		{
			_oneshotSprite = null;
			_loopingSprite = playFromCache(name);
		}
		return this;
	}

	public onAdded()
	{
		//owner.addChild(_root);
	}

	public onRemoved()
	{
		_root.dispose();
		_oneshotSprite = _loopingSprite = null;
		movie._ = null;
	}

	public onTick(delta:number)
	{
		// If this update would end the oneshot movie, replace it with the looping movie
		if(this._oneshotSprite != null && this._oneshotSprite.position + dt > this._oneshotSprite.symbol.duration)
		{
			this._oneshotSprite = null;
			this.setCurrent(_loopingSprite);
		}
	}

	public playFromCache(name:String):MovieSprite
	{
		var sprite;
		if(_cache != null)
		{
			sprite = _cache.get(name);
			if(sprite != null)
			{
				// Rewind it
				sprite.position = 0;
			}
			else
			{
				// Not in the cache, create the new entry
				sprite = createMovie(name);
				_cache.set(name, sprite);
			}
		}
		else
		{
			// Caching disabled, create a new movie each time
			sprite = createMovie(name);
		}
		return setCurrent(sprite);
	}

	private createMovie(name:string):MovieSprite
	{
		//var sprite = this._lib.createMovie(name);
		//if (_decorator != null) {
		//    _decorator(sprite);
		//}
		//
		//return sprite;
	}

	//private function get_looping () :Bool
	//{
	//    return _oneshotSprite == null && _loopingSprite != null;
	//}

	private function

	setCurrent(current:MovieSprite):MovieSprite
	{
		_root.add(current);

		return movie._ = current;
	}

}
