import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
/* import Shop from './StuffShop.tsx'; */
import App from "./gui/App.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
