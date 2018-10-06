import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './components/data/store';

import App from './components/app/app';

require('./styles/base.scss');

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
