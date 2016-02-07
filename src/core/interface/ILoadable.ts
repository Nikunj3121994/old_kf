import Promise from "../util/Promise";

interface ILoadable<T>
{

	hasLoaded():boolean;

	/**
	 *
	 * @param onProgress
	 */
	load(onProgress?:(progress:number) => any):Promise<T>
}

export default ILoadable;