import { createRoot } from 'react-dom/client';
import './index.css';
import 'lineicons/dist/lineicons.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import GlobalContext from './context/GlobalContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContext>
      <App />
    </GlobalContext>
  </BrowserRouter>
);
