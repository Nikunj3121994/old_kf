import Stage from '../../src/easelts/display/Stage';
import Bitmap from '../../src/easelts/display/Bitmap';
import Debug from '../../src/easelts/display/Debug';
import Container from '../../src/easelts/display/Container';
import CanvasBuffer from "../../src/easelts/display/buffer/CanvasBuffer";

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

var container = new Container().setBuffer(new CanvasBuffer(500, 500))
var image = new Bitmap('../assets/image/ninepatch_red.png', '100%', '100%', 0, 0, 0, 0);
var mask = new Bitmap('../assets/image/mask-image.png', 0, 0, '50%', '50%', '50%', '50%');
mask.compositeOperation = Bitmap.COMPOSITE_OPERATION_DESTINATION_OUT;

container.addChild(image);
container.addChild(mask);

stage.addChild(container);

var container = new Container().setBuffer(new CanvasBuffer(500, 500));

var mask = new Bitmap('../assets/image/mask-image.png', 0, 0, 20, 20, 0, 0);
var image = new Bitmap('../assets/image/ninepatch_red.png', '50%', '50%', 0, 0, 0, 0);
mask.compositeOperation = Bitmap.COMPOSITE_OPERATION_DESTINATION_IN;

container.addChild(image);
container.addChild(mask);
stage.addChild(container);

stage.start();