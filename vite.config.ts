import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

/** En el build, incrusta el CSS principal (~8.5 KB con gzip) dentro del index.html en vez de enlazarlo:
 *  así el primer pintado no espera a un pedido extra que bloquea el render. El CSS de las páginas que se
 *  cargan bajo demanda (p. ej. el mapa) sigue yendo en su propio archivo. */
function inlineEntryCss(): Plugin {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        return html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g, (tag, file: string) => {
          const asset = ctx.bundle?.[file]
          if (!asset || asset.type !== 'asset') return tag
          // "</style" dentro del CSS cerraría la etiqueta antes de tiempo
          return `<style>${String(asset.source).replace(/<\/style/gi, '<\\/style')}</style>`
        })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineEntryCss()],
  server: {
    // La API de geolocalización no envía CORS: se consulta a través del proxy.
    proxy: {
      '/api/geo': { target: 'https://geo-e-commerce.vercel.app', changeOrigin: true },
    },
  },
})
