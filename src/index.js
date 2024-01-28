import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { setAuth } from './slices/authSlice';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes'


const root = ReactDOM.createRoot(document.getElementById('root'));

const localToken = localStorage.getItem('token');
store.dispatch(setAuth({ localToken }));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
