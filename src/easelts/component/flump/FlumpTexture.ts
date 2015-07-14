import IFlumpLibrary = require('./IFlumpLibrary');

class FlumpTexture {

	//RenderTextureQuad _renderTextureQuad;
	renderTexture:HTMLImageElement|HTMLCanvasElement;
	originX:number;
	originY:number;
	x:number;
	y:number;
	width:number;
	height:number;

	constructor( renderTexture:HTMLImageElement|HTMLCanvasElement, json:IFlumpLibrary.ITexture)
	{
		this.renderTexture = renderTexture;
		this.originX = json.origin[0];
		this.originY = json.origin[1];
		this.x = json.rect[0];
		this.y = json.rect[1];
		this.width = json.rect[2];
		this.height = json.rect[3];

		//_originX = originX;
		//_originY = originY;
		//_renderTextureQuad = new RenderTextureQuad(renderTexture,
		//	new Rectangle<int>(textureX, textureY, textureWidth, textureHeight),
		//	new Rectangle<int>(0, 0, textureWidth, textureHeight), 0, 1.0);
	}


	public draw(ctx:CanvasRenderingContext2D):boolean
	{
		//renderState.renderQuad(this.renderTextureQuad);
		ctx.drawImage(this.renderTexture, this.x, this.y, this.width, this.height, this.originX, this.originY, this.width, this.height);
		return true;
	}
}

export = FlumpTexture;