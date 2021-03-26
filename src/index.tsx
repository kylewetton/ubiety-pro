import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {IntlProvider} from 'react-intl';
import _get from 'lodash/get';
import {store} from './store';
import App from './components/App';
import {Preflight} from './theme';
import messages from './i18n/en.json';
import italianMessages from './i18n/it.json';

const languages: {[key: string]: any} = {
  en: messages,
  it: italianMessages
}

const browserLocale = _get(global, 'navigator.userLanguage') || _get(global, 'navigator.language');
const locale = browserLocale || 'en';

ReactDOM.render(
  <React.StrictMode>
      <Preflight />
      <Provider store={store}>
        <IntlProvider locale={locale} messages={languages[locale]}>
          <App />
        </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);