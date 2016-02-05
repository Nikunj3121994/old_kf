class Time
{
	//maxSaveTimeMs = 60 * 60 * 24 * 2 * 1000;
	//maxSaveTimeMs = 60 * 60 * 24 * 2 * 1000;
	//public static maxSaveTimeMs = 20 * 1000;// * 60 * 24 * 2 * 1000;
	public static maxSaveTimeMs = 2147483647;// * 60 * 24 * 2 * 1000;

	/**
	 *
	 * @return {number}
	 */
	public static getDelta:(time:number) => number = (() => {
		var startTime = 0;
		return function(time){
			time = time || new Date().getTime();
			if(!startTime){
				startTime = time;
			}
			var returnTime = time - startTime;
			startTime = time;

			return returnTime;
		}
	})();

	/**
	 *
	 * @return {number}
	 */
	public static getFromStart:(time:number) => number = (() => {
		var startTime = 0;
		return function(time){
			time = time || new Date().getTime();
			if(!startTime){
				startTime = time;
			}

			return time - startTime;
		}
	})();

	/**
	 *
	 * @return {number}
	 */
	public static getSafeFromStart:(time?:number) => number = (() => {
		var startTime = 0;
		var maxSaveTimeMs = Time.maxSaveTimeMs;
		return function(time){
			time = time || new Date().getTime();


			if(!startTime){
				startTime = time;
			}

			var rtime = time - startTime;

			if( rtime > maxSaveTimeMs )
			{
				rtime = rtime - maxSaveTimeMs * Math.floor(rtime/maxSaveTimeMs);
			}

			return rtime;
		}
	})();
}

export default Time;