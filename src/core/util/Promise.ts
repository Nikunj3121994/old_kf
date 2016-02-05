

// Use polyfill for setImmediate for performance gains
var asap = (typeof setImmediate === 'function' && setImmediate) || function(fn) { setTimeout(fn, 1); };

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs   = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP    = function() {},
			fBound  = function() {
				return fToBind.apply(this instanceof fNOP
						? this
						: oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		if (this.prototype) {
			// native functions don't have a prototype
			fNOP.prototype = this.prototype;
		}
		fBound.prototype = new fNOP();

		return fBound;
	};
}

var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };


function resolve(newValue)
{
	try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
		if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
		if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
			var then = newValue.then;
			if (typeof then === 'function') {
				doResolve(then.bind(newValue), resolve.bind(this), reject.bind(this));
				return;
			}
		}
		this['_state'] = true;
		this['_value'] = newValue;
		finale.call(this);
	} catch (e) {
		reject.call(this, e);
	}
}

function reject(newValue) {
	this._state = false;
	this._value = newValue;
	finale.call(this);
}

function finale() {
	for (var i = 0, len = this._deferreds.length; i < len; i++) {
		handleHandler.call(this, this._deferreds[i]);
	}
	this._deferreds = null;
}

class Handler {

	public onFulfilled:Function;
	public onRejected:Function;
	public resolve:Function;
	public reject:Function;

	constructor(onFulfilled, onRejected, resolve, reject){
		this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		this.resolve = resolve;
		this.reject = reject;

	}
}

function handleHandler(promise:Promise<any>, deferred:Handler) {



	if (this._state === null) {
		this._deferreds.push(deferred);
		return;
	}

	asap(() => {
		var callback = this['_state'] ? deferred.onFulfilled : deferred.onRejected;
		if (callback === null) {
			(this['_state'] ? deferred.resolve : deferred.reject)(this._value);
			return;
		}

		var ret;
		try {
			ret = callback(this._value);
		}
		catch (e) {
			deferred.reject(e);
			return;
		}
		deferred.resolve(ret);
	})
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn:Function, onFulfilled:Function, onRejected:Function) {
	var done = false;
	try {
		fn(function (value) {
			if (done) return;
			done = true;
			onFulfilled(value);
		}, function (reason) {
			if (done) return;
			done = true;
			onRejected(reason);
		})
	} catch (ex) {
		if (done) return;
		done = true;
		onRejected(ex);
	}
}

interface Thenable<R> {
	then<U>(onFulfilled?: (value: R) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
	then<U>(onFulfilled?: (value: R) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
	catch<U>(onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
}

class Promise<T> implements Thenable<T>
{
	/**
	 *
	 * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
	 * the array passed to all can be a mixture of promise-like objects and other objects.
	 * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
	 *
	 * @param promiseList
	 * @returns {Promise}
	 */
	public static all<U>(promises: Array<U | Thenable<U>>): Promise<Array<U>>
	{
		return new Promise(function(resolve:(response:Array<U>) => any, reject:(response:Error) => any)
		{
			if(promises.length === 0) return resolve([]);
			var remaining = promises.length;
			var resultCollection:Array<U> = [];

			function res(i, val)
			{
				try
				{
					if(val && (typeof val === 'object' || typeof val === 'function'))
					{
						var then = val.then;
						if(typeof then === 'function')
						{
							then.call(val, function (val)
							{
								res(i, val)
							}, reject);
							return;
						}
					}
					resultCollection[i] = val;
					if(--remaining === 0)
					{
						resolve( resultCollection );
					}
				} catch(ex)
				{
					reject(ex);
				}
			}

			for(var i = 0; i < promises.length; i++)
			{
				res(i, promises[i]);
			}
		});
	}

	/**
	 *
	 * Make a new promise from the thenable.
	 * A thenable is promise-like in as far as it has a "then" method.
	 *
	 * @param value
	 */
	public static resolve<U>(value?: U | Thenable<U>): Promise<U>
	{
		if(value && typeof value === 'object' && value.constructor === Promise)
		{
			return <Promise<U>> value;
		}

		return new Promise<U>(function(resolve)
		{
			resolve(value);
		});
	}

	/**
	 * @method reject
	 * @param error
	 * @returns {Promise<any>}
     */
	public static reject(error: any): Promise<any>
	{
		return new Promise<any>(function(resolve, reject)
		{
			reject(error);
		});
	}

	public static race<U>(promises: Array<Thenable<U>>): Promise<U>
	{
		return new Promise<U>(function(resolve, reject)
		{
			for(var i = 0, len = promises.length; i < len; i++)
			{
				promises[i].then(resolve, reject);
			}
		});
	}

	private _state:boolean = null;
	private _value:T = null;
	private _deferreds:Array<Handler> = [];

	constructor(init: (resolve :(value?: T | Thenable<T>) => void, reject: (error?: any) => void) => void)
	{
		if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		if (typeof init !== 'function') throw new TypeError('not a function');

		doResolve(init, resolve.bind(this), reject.bind(this));
	}

	/**
	 * @method catch
	 * @param onRejected
	 * @returns {Promise<T>}
	 */
	public catch(onRejected:(value:any) => any):Promise<T>
	{
		return this.then(null, onRejected);
	}

	/**
	 * Alias `.caught();` for compatibility with earlier ECMAScript version.
	 *
	 * @method cought
	 * @param onRejected
	 * @returns {Promise<U>}
	 */
	public cought(onRejected:(value:any) => any):Promise<T>
	{
		return this.then(null, onRejected);
	}

	/**
	 * @then then
	 * @param onFulfilled
	 * @param onRejected
	 * @returns {Promise}
	 */
	public then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
	public then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Promise<U>
	{
		return new Promise<U>((resolve, reject) =>
		{
			handleHandler.call(this, new Handler(onFulfilled, onRejected, resolve, reject));
		})
	}
}

export default Promise;