import React from 'react';
import ReactDOM from 'react-dom/client';
import './Calculator.scss';
import Calculator from './Calculator';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Calculator />
    </Provider>
  </React.StrictMode>
);
