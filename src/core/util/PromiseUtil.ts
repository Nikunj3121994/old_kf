import {Promise} from "./Promise";
import {ILoadable} from "../interface/ILoadable";


export class PromiseUtil
{
	/**
	 * @static
	 * @method wait
	 * @param {Array<Promise<any>>} list
	 * @param {(progress:number) => any} onProgress
	 * @returns {Promise}
	 */
	public static allWithProgress<T>(list:Array<Promise<T>>, onProgress:(progress:number) => any = (progress:number) => {}):Promise<Array<T>>
	{
		var count = list.length;
		var progressList = [];

		for(var i = 0; i < count; i++)
		{
			progressList.push(0);
		}

		var prvProgress = function(index:number, onProgress:Function, result:T)
		{
			var progress = 1;
			progressList[index] = progress;
			var total = 0;
			var length = progressList.length;

			for(var i = 0; i < length; i++)
			{
				total += progressList[i];
			}

			onProgress(total / count);

			return result;
		};

		var promiseList = [];
		for(var i = 0; i < count; i++)
		{
			promiseList[i] = list[i].then(prvProgress.bind(this, i, onProgress));
		}

		return Promise.all<T>(promiseList);
	}


	/**
	 * @method waitForLoadable
	 * @param {Array<ILoadable<any>>} list
	 * @param {(progress:number) => any} onProgress
	 * @returns {Promise}
	 */
	public static loadLoadable<T>(list:Array<ILoadable<T>>, onProgress:(progress:number) => any = (progress:number) => {}):Promise<Array<T>>
	{
		var count = list.length;
		var progressList = [];

		for(var i = 0; i < count; i++)
		{
			progressList.push(0);
		}

		var prvProgress = function(index:number, onProgress:Function, progress:number)
		{
			progressList[index] = progress;

			var total = 0;
			var length = progressList.length;

			for(var i = 0; i < length; i++)
			{
				total += progressList[i];
			}

			onProgress(total / count);
		};

		var promiseList = [];
		for(var i = 0; i < count; i++)
		{
			promiseList[i] = list[i].load(prvProgress.bind(this, i, onProgress));
		}

		return Promise.all<T>(promiseList);
	}
}