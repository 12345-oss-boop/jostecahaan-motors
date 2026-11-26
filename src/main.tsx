import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@/styles/index.css'
import { App } from '@/app/App'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
