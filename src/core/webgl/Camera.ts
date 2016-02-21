import {Canvas} from "../../visual/renderer/element/Canvas";
import {mat4, vec3} from "../../vendor/gl-matrix/gl-matrix";
import {SignalConnection} from "../event/SignalConnection";

export class Camera
{
	protected _element:Canvas;
	protected _resizeConnection:SignalConnection;

	private _projectionMatrix:any;
	private _cameraMatrix:any;
	private _viewMatrix:any;

	protected _fovY:number = 45;
	protected _near:number = 0.1;
	protected _far:number = 100.0;
	protected _position:any = vec3.create();

	constructor(element:Canvas){
		this._element = element;

		this._projectionMatrix = mat4.create();
		this._cameraMatrix = mat4.create();
		this._viewMatrix = mat4.create();

		this._element.onResize.connect(this.handleResize);
		this.handleResize(this._element.getWidth(), this._element.getHeight());
	}

	// public setX()

	public update():void
	{
		var v3 = vec3.create();
		vec3.set(v3, 0, 0, 300);

		mat4.identity(this._cameraMatrix);
		mat4.translate(this._cameraMatrix, this._cameraMatrix, v3)
		mat4.invert(this._viewMatrix, this._cameraMatrix);
	}

	public append(m4:any){
		mat4.multiply(m4, m4, this._viewMatrix);
		mat4.multiply(m4, m4, this._projectionMatrix);
	}

	public setPerspective(fovY:number, near:number, far:number):void
	{
		this._fovY = fovY;
		this._near = near;
		this._far = far;
	}

	protected handleResize = (width:number, height:number) => {
		mat4.perspective(this._projectionMatrix, this._fovY, width / height, this._near, this._far)
	}

	public destruct():void
	{
		this._resizeConnection.dispose();
		this._resizeConnection = null;
		this._projectionMatrix = null;
	}
}