precision mediump float;

const float n             = 2.0;
const float speed         = 6.0;
const float log_curvature = 6.0;

const float PI        = 3.141592653;
const float r60       = PI / 3.0;
const float theta_gap = (2.0 * PI) / float(n);

uniform vec2  uResolution;
uniform float uTime;

vec3 hue2rgb(in float H, in float S) {
    float pin = (1.0 - clamp(S * 8.0, 0.0, 1.0)) * 2.5;

    return vec3(H + pin);
}

vec2 coordTransform(in vec2 init) {
    return (init - 0.5 * uResolution.xy) / uResolution.y;
}

void computeImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2  uv    = coordTransform(fragCoord);
    vec2  uvMax = coordTransform(uResolution.xy);
    float r_max = length(uvMax);
    vec2  orig  = vec2(0.0);

    vec2       d = uv - orig;
    float      r = length(d);
    float  theta = uTime * speed;

    theta += log(r / n) * log_curvature;
    theta -= atan(d.y, d.x);
    theta  = mod(theta, 2.0 * PI);

    float Hue = theta_gap * floor(n * (theta / (2.0 * PI)));
    float Sat = sqrt(r / r_max);

    fragColor = vec4(hue2rgb(Hue, Sat), 1.0);
}

void main() {
    vec4 fragColor1,
         fragColor2,
         fragColor3,
         fragColor4,
         fragColor5;

    float c = 1.0,
          s = 0.25;

    // Fake antialiasing but it works
    computeImage(fragColor1, gl_FragCoord.xy);
    computeImage(fragColor2, gl_FragCoord.xy + vec2( 0.8,  0.8));
    computeImage(fragColor3, gl_FragCoord.xy + vec2(-0.8,  0.8));
    computeImage(fragColor4, gl_FragCoord.xy + vec2(-0.8, -0.8));
    computeImage(fragColor5, gl_FragCoord.xy + vec2( 0.8, -0.8));

    gl_FragColor = (
      fragColor1 * c +
      fragColor2 * s +
      fragColor3 * s +
      fragColor4 * s +
      fragColor5 * s
    ) / (c + 4.0 * s);
}
