
/*
 * HttpRequest
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Mient-jan Stelling
 * Copyright (c) 2015 MediaMonks B.V
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
 * The above * copyright notice and this permission notice shall be
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

import IHashMap from "../interface/IHashMap";
import {Promise} from "../util/Promise";
import {ILoadable} from "../interface/ILoadable";

/**
 * @class HttpRequest
 */
export class HttpRequest<T> implements ILoadable<T>
{
	/**
	 * @static
	 * @method request
	 * @param {string} method
	 * @param {string} url
	 * @param {Array<string>} args
	 * @returns {Promise}
	 */
	private static request(method:string, url:string, args:IHashMap<string>):Promise<any>
	{
		// Creating a promise
		return new Promise(function(resolve:Function, reject:Function) {

			// Instantiates the XMLHttpRequest
			var client = new XMLHttpRequest();
			var uri = url;

			if(args && (method === 'POST' || method === 'PUT')){
				uri += '?';
				var argcount = 0;
				for (var key in args) {
					if (args.hasOwnProperty(key)) {
						if (argcount++) {
							uri += '&';
						}

						uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
					}
				}
			}

			client.open(method, uri);
			client.send();

			client.onload = function ()
			{
				if ( (this.status >= 200 && this.status < 400) || this.status === 0)
				{
					// Performs the function "resolve" when this.status is equal to 200
					resolve(this.response || this.responseText);
				} else {
					// Performs the function "reject" when this.status is different than 200
					reject(this.statusText);
				}
			};

			client.onerror = function () {
				reject(this.statusText);
			};
		});
	}

	/**
	 *
	 * @param {string} url
	 * @param {IHashMap<any>} query
	 * @returns {Promise<string>}
	 */
	public static getString<T>(url:string, query:IHashMap<any> = {}):Promise<T>
	{
		return HttpRequest.request('GET', url, query);
	}

	/**
	 *
	 * @param {string} url
	 * @param {IHashMap<any>} query
	 * @returns {Promise}
	 */
	public static getJSON(url:string, query:IHashMap<any> = {}):Promise<any>
	{
		return HttpRequest.getString(url, query)
			.then((response:string) => JSON.parse(response));
	}

	public path:string;
	public query:IHashMap<any>;
	public data:T;
	public type:any;

	protected _promise:any;
	protected _hasLoaded:boolean = false;

	constructor(path:string, query:IHashMap<any> = {}, type?:T)
	{
		this.path = path;
		this.query = query;
		this.type = type;
	}


	public hasLoaded():boolean
	{
		return this._hasLoaded;
	}

	public load(onProgress?:(progress:number)=>any):Promise<T>
	{
		if(!this._promise){
			this._promise = HttpRequest.getString(this.path, this.query).then((data:T) => {
				if(onProgress) {
					onProgress(1);
				}
				this._hasLoaded = true;
				this.data = data;
				return data;
			});
		}

		return this._promise;
	}
}

export enum Type {
	JSON,
	STRING
}