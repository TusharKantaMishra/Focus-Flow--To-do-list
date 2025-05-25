import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/index.css';
import './styles/icons.css';
import './styles/typography.css';
import './styles/layout-enhanced.css';
import './styles/filter-buttons.css';
import './styles/task-form.css';
import './styles/responsive.css'; // Mobile-friendly styles
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
