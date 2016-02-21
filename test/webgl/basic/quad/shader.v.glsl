attribute vec3 aVertexPosition;

uniform mat4 uMatrix;
uniform float uTime;

varying vec3 color;

void main(void) {
 color = vec3(sin(uTime) * .5 + .5, cos(uTime) * .5 + .5, sin(uTime*.5) * .5 + .5);
 //gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
 gl_Position = uMatrix * vec4(aVertexPosition, 1.0);
}