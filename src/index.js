import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { 
  createStore, 
  applyMiddleware, 
  compose, 
  combineReducers 
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'bootstrap/dist/css/bootstrap.min.css';

import musicReducer from './store/reducers/music';
import singleAudioReducer from './store/reducers/singleAudio';
import playerReducer  from './store/reducers/player';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import categoryReducer from './store/reducers/category';
import adminReducer from './store/reducers/admin';
import { 
  watchMusic, 
  watchAuth, 
  watchUser, 
  watchCategory,
  watchComments,
  watchAdmin
} from './store/sagas/index';
import App from './App';
import './index.css';

// dev-tools
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// мердж редюсеров
const rootReducer = combineReducers({
  music: musicReducer,
  singleAudio: singleAudioReducer,
  categories: categoryReducer,
  player: playerReducer,
  auth: authReducer,
  user: userReducer,
  admin: adminReducer
});

const sagaMiddleware = createSagaMiddleware();

// создание стора
const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// запуск redux саг
sagaMiddleware.run(watchMusic);
sagaMiddleware.run(watchCategory);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchComments);
sagaMiddleware.run(watchAdmin);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

