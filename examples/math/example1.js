define(["require", "exports", "../../src/easelts/display/Stage", "../../src/easelts/display/Bitmap", "../../src/core/math/Matrix4", "../../src/core/math/Vector3", "../../src/core/math/Quaternion", "../../src/core/math/MathUtil", "../../src/core/util/Interval"], function (require, exports, Stage_1, Bitmap_1, Matrix4_1, Vector3_1, Quaternion_1, MathUtil_1, Interval_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true);
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, '50%', '50%', '50%', '50%');
    stage.addChild(image);
    var m = new Matrix4_1.Matrix4();
    var x = new Matrix4_1.Matrix4();
    var y = new Matrix4_1.Matrix4();
    var z = new Matrix4_1.Matrix4();
    var alpha = 0;
    var beta = Math.PI;
    var gamma = Math.PI / 2;
    var position = new Vector3_1.Vector3();
    var rotation = new Quaternion_1.Quaternion();
    var scale = new Vector3_1.Vector3();
    var test = function () {
        alpha += .01;
        beta += .01;
        x.makeRotationX(alpha);
        y.makeRotationY(beta);
        z.makeRotationZ(gamma);
        m.multiplyMatrices(x, y);
        m.multiply(z);
        m.setPosition(new Vector3_1.Vector3(300, 250, 10));
        m.decompose(position, rotation, scale);
        image.x = position.x;
        image.y = position.y;
        image.rotation = MathUtil_1.default.radToDeg(rotation.z);
    };
    var inter = new Interval_1.default(60).attach(test);
    stage.start();
});