precision lowp float;
varying vec3 color;
uniform sampler2D uTexture;
varying vec2 vTexcoord;

void main(void) {
	gl_FragColor = texture2D(uTexture, vTexcoord) * vec4(color, 1.0);
	//gl_FragColor = vec4(color, 1.0);
}