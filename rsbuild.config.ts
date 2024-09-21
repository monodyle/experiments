import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Experiments - Monody Le',
    favicon: 'https://minhle.space/favicon.png',
    tags: [
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
          rel: 'stylesheet',
        },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
          rel: 'stylesheet',
        },
      },
    ],
  },
})
