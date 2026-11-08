/** ¿El equipo dibuja WebGL con una GPU de verdad?
 *
 *  Sin aceleración gráfica (WebGL por software: SwiftShader, llvmpipe, "Microsoft Basic Render Driver"…)
 *  cada cuadro de la escena 3D lo calcula la CPU y la página se traba. En ese caso el hero se queda con la
 *  captura estática de la ciudad y ni siquiera se descarga three.js ni los modelos.
 *
 *  Se resuelve con un contexto WebGL descartable, sin cargar three: `failIfMajorPerformanceCaveat` hace que
 *  el navegador lo niegue si solo puede ofrecer WebGL por software, y el nombre del renderer cubre a los
 *  navegadores que igual lo conceden.
 *
 *  El primer contexto WebGL de la página inicializa la GPU y bloquea el hilo donde se crea (medido: hasta
 *  ~0.5 s con la GPU en frío). Por eso la prueba corre en un Web Worker con OffscreenCanvas: la página sigue
 *  respondiendo y, de paso, la GPU ya queda inicializada para cuando la escena cree su propio contexto.
 *  Si el navegador no tiene OffscreenCanvas en workers, se prueba en el hilo principal. */

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render/i

// Mismo chequeo para el worker y para el hilo principal (se serializa como texto para el worker)
function probe(canvas: HTMLCanvasElement | OffscreenCanvas, software: RegExp): boolean {
  try {
    const opts = { failIfMajorPerformanceCaveat: true }
    const gl = (canvas.getContext('webgl2', opts) ?? canvas.getContext('webgl', opts)) as WebGLRenderingContext | null
    if (!gl) return false
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER))
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return !software.test(renderer)
  } catch {
    return false
  }
}

const probeOnMainThread = () => probe(document.createElement('canvas'), SOFTWARE)

export function hasHardwareWebGL(timeoutMs = 4000): Promise<boolean> {
  if (typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') return Promise.resolve(probeOnMainThread())
  return new Promise((resolve) => {
    let url = ''
    let worker: Worker | null = null
    let timer = 0
    const done = (ok: boolean) => {
      clearTimeout(timer)
      worker?.terminate()
      if (url) URL.revokeObjectURL(url)
      resolve(ok)
    }
    try {
      const src = `const probe = ${probe.toString()};\npostMessage(typeof OffscreenCanvas.prototype.getContext === 'function' ? probe(new OffscreenCanvas(1, 1), ${SOFTWARE.toString()}) : null)`
      url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }))
      worker = new Worker(url)
      // null = el worker no puede crear contextos WebGL (OffscreenCanvas sin WebGL): se prueba en el hilo principal
      worker.onmessage = (e: MessageEvent<boolean | null>) => done(e.data ?? probeOnMainThread())
      worker.onerror = () => done(probeOnMainThread())
      // si el worker no contesta (GPU colgada, driver roto), se queda la captura estática
      timer = window.setTimeout(() => done(false), timeoutMs)
    } catch {
      done(probeOnMainThread())
    }
  })
}
