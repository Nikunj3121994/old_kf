import FlumpLibrary = require('./FlumpLibrary');
import FlumpLayerData = require('./FlumpLayerData');
import IFlumpLibrary = require('./IFlumpLibrary');

class FlumpMovieData {

	public id:string;
	public flumpLibrary;
	public flumpLayerDatas:Array<FlumpLayerData>;

	public frames:number = 0;

	constructor(flumpLibrary:FlumpLibrary, json:IFlumpLibrary.IMovie)
	{
		this.flumpLibrary = flumpLibrary;
		this.id = json.id;

		var layers = json.layers;
		this.flumpLayerDatas = new Array(layers.length);
		for(var i = 0; i < layers.length; i++)
		{
			var layer = new FlumpLayerData(layers[i]);
			this.flumpLayerDatas[i] = layer;
			this.frames = Math.max(this.frames, layer.frames)
		}

		//this.flumpLayerDatas = json["layers"].map((layer) => new FlumpLayerData(layer)).toList() {

		//this.frames = flumpLayerDatas.fold(0, (f, data) => max(f, data.frames));
	}
}

export = FlumpMovieData;