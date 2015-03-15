///<reference path="../lib/gsap/greensock.d.ts" />

import Container = require('../lib/easelts/display/Container');
import Text = require('../lib/easelts/display/Text');
import BitmapNinePatch = require('../lib/easelts/component/BitmapNinePatch');
import NinePatch = require('../lib/easelts/component/bitmapninepatch/NinePatch');
import Rectangle = require('../lib/easelts/geom/Rectangle');
import ButtonBehavior = require('../lib/easelts/behavior/ButtonBehavior');

class TopButton extends Container
{
	private _ninepatch:NinePatch = new NinePatch('assets/image/ninepatch_blue.png', new Rectangle(5, 12, 139, 8) );
	private _bg:BitmapNinePatch = new BitmapNinePatch(this._ninepatch);
	private _text:Text = new Text('top');

	constructor()
	{
		super(200, 50, '50%', '0%', '50%', '0%');

		this.addBehavior(new ButtonBehavior);
		this.hitArea = this._bg;

		this.addChild(this._bg);
		this.addChild(this._text);

	}
}

export = TopButton;