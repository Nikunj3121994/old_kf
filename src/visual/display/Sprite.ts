import {Texture} from "./Texture";
import {Rectangle} from "../data/Rectangle";

export class Sprite
{
	public texture:Texture;
	public rectangle:Rectangle;
	public uv:Float32Array;

	constructor(sheet:Texture, rectangle:Rectangle)
	{
		this.texture = sheet;
		this.rectangle = rectangle;
	}

	hasLoaded():boolean
	{
		return null;
	}
}