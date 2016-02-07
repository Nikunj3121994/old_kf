import Promise from "./Promise";
import ILoadable from "../interface/ILoadable";


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
        return new Promise(function(resolve:(response:Array<T>) => any)
        {
            var newList = [];

            var then = function(response:T)
            {
                newList.push(response);
                onProgress( newList.length / list.length);

                if(newList.length == list.length){
                    resolve(newList);
                }
            }

            for(var i = 0; i < list.length; i++)
            {
                list[i].then(then);
            }
        });
    }


    /**
     * @method waitForLoadable
     * @param {Array<ILoadable<any>>} list
     * @param {(progress:number) => any} onProgress
     * @returns {Promise}
     */
    public static allForLoadable<T>(list:Array<ILoadable<T>>, onProgress:(progress:number) => any = (progress:number) => {}):Promise<Array<T>>
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