import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store';
import App from './components/App';
import {Preflight} from './theme';

ReactDOM.render(
  <React.StrictMode>
      <Preflight />
      <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);