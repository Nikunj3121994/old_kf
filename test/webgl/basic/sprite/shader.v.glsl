attribute vec3 aVertexPosition;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uTime;
varying vec3 color;

void main(void) {

 color = vec3(sin(uTime) * .5 + .5, cos(uTime) * .5 + .5, sin(uTime*.5) * .5 + .5);
 vec3 pos = color * aVertexPosition;
 gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}