import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore, Reducer, Store} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore, PersistConfig, Persistor} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  blacklist: ['v_animate'],
};

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);

let store: Store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

let persistor: Persistor = persistStore(store);

const app = (
  <Provider store = {store}>
    <PersistGate loading = {null} persistor = {persistor}>
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
// serviceWorker.register();
