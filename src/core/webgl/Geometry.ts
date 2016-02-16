export class Geometry
{
	public static QUAD = Geometry.createQuad();

	public static createQuad():Geometry
	{
		var vertices = [
			-1.0, -1.0,  0.0,
			1.0, -1.0,  0.0,
			1.0,  1.0,  0.0,
			-1.0,  1.0,  0.0,
		];

		var indices = [0,  1,  2, 0,  2,  3];
		return new Geometry(vertices, indices);
	}

	public vertex:Float32Array;
	public index:Uint16Array;
	public length:number;

	constructor(vertex:Array<number>, index:Array<number>)
	{
		this.vertex = new Float32Array(vertex);
		this.index = new Uint16Array(index);
		this.length = index.length;
	}
}