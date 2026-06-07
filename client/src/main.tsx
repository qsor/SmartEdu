import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import CatalogPage from './pages/Catalog' // <-- Здесь должен быть CatalogPage

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <CatalogPage /> {/* <-- И здесь */}
    </StrictMode>,
  )
}