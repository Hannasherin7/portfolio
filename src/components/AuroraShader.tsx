import { useEffect, useRef } from 'react'

/**
 * Fullscreen raw-WebGL fragment shader — a flowing aurora / liquid gradient
 * that drifts over time and warps toward the cursor. One quad, one draw call,
 * DPR-capped and paused off-screen, so it stays cheap. Silently no-ops if
 * WebGL is unavailable or reduced-motion is set (blobs still provide colour).
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// smooth value noise
vec2 hash(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(in vec2 p){
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++){
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.06;
  vec2 m = (u_mouse - 0.5) * 0.6;

  vec2 q = vec2(fbm(p + t + m), fbm(p - t * 0.8 - m));
  vec2 r = vec2(fbm(p + q * 1.6 + t), fbm(p + q * 1.4 - t));
  float f = fbm(p + r * 1.2);

  vec3 c1 = vec3(0.49, 0.36, 1.0);   // violet
  vec3 c2 = vec3(0.18, 0.90, 0.79);  // teal
  vec3 c3 = vec3(1.0, 0.54, 0.36);   // amber
  vec3 base = vec3(0.02, 0.02, 0.03);

  vec3 col = base;
  col = mix(col, c1, smoothstep(-0.2, 0.9, f) * 0.9);
  col = mix(col, c2, smoothstep(0.0, 1.0, r.x) * 0.5);
  col = mix(col, c3, smoothstep(0.2, 1.0, q.y) * 0.25);

  // radial vignette so edges fall into the page background
  float vig = smoothstep(1.25, 0.25, length(uv - vec2(0.5, 0.42)));
  col *= vig;
  col *= 0.85;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

export default function AuroraShader() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: 0.5, y: 0.5 }
    const tMouse = { x: 0.5, y: 0.5 }
    const onMove = (e: MouseEvent) => {
      tMouse.x = e.clientX / window.innerWidth
      tMouse.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)

    let raf = 0
    let running = true
    const io = new IntersectionObserver((es) => (running = es[0].isIntersecting), { threshold: 0 })
    io.observe(canvas)

    const start = performance.now()
    const loop = (now: number) => {
      if (running) {
        mouse.x += (tMouse.x - mouse.x) * 0.05
        mouse.y += (tMouse.y - mouse.y) * 0.05
        gl.uniform1f(uTime, (now - start) / 1000)
        gl.uniform2f(uMouse, mouse.x, mouse.y)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      io.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}
