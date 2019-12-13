// for syntax highlighting (glsl-literal extension)
const glsl = x => x;

export const vert = glsl`
precision highp float;
attribute vec2 position;

uniform float time;
uniform float width;
uniform float height;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const frag = glsl`
precision highp float;

uniform float width;
uniform float height;
uniform float time;

uniform sampler2D texture1;
uniform sampler2D texture2;

// normalize coords and correct for aspect ratio
vec2 normalizeScreenCoords()
{
  float aspectRatio = width / height;
  vec2 result = 2.0 * (gl_FragCoord.xy / vec2(width, height) - 0.5);
  result.x *= aspectRatio; 
  return result;
}

vec4 invert(vec4 color) {
  return vec4(1.0 - color.x, 1.0 - color.y, 1.0 - color.z, 1.0);
}

void main() {
  vec2 p = normalizeScreenCoords();
  vec2 texCoords = vec2(gl_FragCoord.x / width, 1.0 - (gl_FragCoord.y / height)); 
  vec4 tex1Color = texture2D(texture1, texCoords);  
  vec4 tex2Color = texture2D(texture2, texCoords);
  gl_FragColor = mix(tex1Color, tex2Color, .5 + .5 * sin(time * .25 + p.x * p.y * 6.0));
}
`;
