import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './services/styles/index.css'
import App from './App.jsx'
import Chatbot from './atoms/chatbot/index.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Chatbot/>
    </Provider>
  </StrictMode>,
)

const ogUrl = import.meta.env.VITE_DOMAIN_URL || "https://default.site";

const metaOgUrl = document.querySelector('meta[property="og:url"]');

if (metaOgUrl) {
  metaOgUrl.setAttribute("content", ogUrl);
}


