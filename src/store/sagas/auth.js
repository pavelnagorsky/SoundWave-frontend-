import { put, call, delay } from 'redux-saga/effects';

import axios from "../../axiosInstances/axiosInstance";
import {
  logoutSucceed,
  logout,
  cleanUserData,
  signupStart,
  loginUser,
  signupFailed,
  loginStart,
  loginSuccess,
  loginFailed,
  checkAuthTimeout
} from '../actions/index';

// логаут пользователя
export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], 'token');
  yield call([localStorage, "removeItem"], 'expirationDate');
  yield call([localStorage, "removeItem"], 'userId');
  yield put(logoutSucceed());
  // очистка информации о пользователе
  yield put(cleanUserData());
};

// логаут пользователя после истечения срока годности токена
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(logout());
};

// регистрация нового пользователя
export function* signupUserSaga (action) {
  yield put(signupStart());
  const signupData = {
    email: action.email,
    name: action.name,
    password: action.password
  };
  try {
    yield axios.put('/auth/signup', signupData);
    // автоматическая авторизация созданного пользователя
    yield put(loginUser({ email: action.email, password: action.password }));
  }
  catch(error) {
    // если приходит ответ сервера со статус кодом 401,
    // то обрабатываем локально, иначе передаем в глобальный обработчик ошибок
    let networkError = true;
    let errorMessage = null;
    if (error.response?.status === 401) {
      errorMessage = error.response.data.message;
      networkError = false;
    };
    yield put(signupFailed(networkError, errorMessage));
  }
};

// авторизация пользователя
export function* loginUserSaga (action) {
  yield put(loginStart());
  const loginData = {
    email: action.email,
    password: action.password
  };
  try {
    const response = yield axios.post('/auth/login', loginData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn);
    yield localStorage.setItem('token', response.data.token);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.userId); 
    yield put(loginSuccess(response.data.token, response.data.userId));
  }
  catch(error) {
    // если приходит ответ сервера со статус кодом 401,
    // то обрабатываем локально, иначе передаем в глобальный обработчик ошибок
    let networkError = true;
    let errorMessage = null;
    if (error.response?.status === 401) {
      errorMessage = error.response.data.message;
      networkError = false;
    };
    yield put(loginFailed(networkError, errorMessage));
  }
};

// автоматическая авторизация при перезагрузке страницы
export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if ( expirationDate <= new Date() ) {
      yield put(logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(loginSuccess(token, userId));
      yield put(checkAuthTimeout( expirationDate.getTime() - new Date().getTime() ));
    }
  }
}