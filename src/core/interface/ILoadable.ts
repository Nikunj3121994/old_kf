import {Promise} from "../util/Promise";

export interface ILoadable<T>
{

	hasLoaded():boolean;

	/**
	 *
	 * @param onProgress
	 */
	load(onProgress?:(progress:number) => any):Promise<T>
}