import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Icon } from './Icon'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Captura errores de render de todo el árbol: en vez de dejar la pantalla en negro (React
 * desmonta la raíz ante un error no capturado), muestra un fallback con un botón para recargar.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[app] error de render capturado por ErrorBoundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 18, padding: 24, textAlign: 'center', background: 'var(--bg, #0b0b12)', color: 'var(--text-body, #fff)',
        }}
      >
        <span
          style={{
            width: 56, height: 56, flex: 'none', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,90,110,.16)', boxShadow: 'inset 0 0 0 1px rgba(255,90,110,.5)',
          }}
        >
          <Icon name="zap" size={28} color="var(--cf-danger, #ff5a6e)" />
        </span>
        <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ margin: 0, font: '800 20px var(--font-body, system-ui)' }}>Algo salió mal</h1>
          <p style={{ margin: 0, font: '500 14px/1.5 var(--font-body, system-ui)', color: 'var(--text-muted, #9aa)' }}>
            Ocurrió un error inesperado en la aplicación. Recargá la página para volver a empezar.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 'var(--radius-pill, 999px)',
            border: 'none', cursor: 'pointer', background: 'var(--rainbow-grad, #4fa9ee)', color: '#fff',
            boxShadow: 'var(--glow-rainbow, 0 6px 20px rgba(0,0,0,.4))', textShadow: '0 1px 2px rgba(0,0,0,.35)',
            font: '800 14px/1 var(--font-body, system-ui)',
          }}
        >
          <Icon name="navigation" size={16} color="#fff" />
          Recargar
        </button>
      </div>
    )
  }
}
