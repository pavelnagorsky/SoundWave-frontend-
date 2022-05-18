import * as actionTypes from './actionTypes';

// отправка данных для регистрации пользователя
export const signupUser = signupData => {
  return {
    type: actionTypes.SIGNUP_USER,
    email: signupData.email,
    name: signupData.name,
    password: signupData.password
  }
};

// начало обработки запроса
export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
};

// обработка ошибки при регистрации
export const signupFailed = (networkError, errorMessage) => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    networkError: networkError,
    errorMessage: errorMessage
  }
};

// отправка данных для авторизации пользователя
export const loginUser = loginData => {
  return {
    type: actionTypes.LOGIN_USER,
    email: loginData.email,
    password: loginData.password
  }
};

// начало обработки запроса
export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
};

// успешный исход авторизации
export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: userId
  }
};

// ошибка при авторизации
export const loginFailed = (networkError, errorMessage) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    networkError: networkError,
    errorMessage: errorMessage
  }
};

// логаут пользователя, удаление данных из localStorage
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
};

// успешный логаут
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

// очистить информацию об ошибках 
export const confirmErrors = () => {
  return {
    type: actionTypes.AUTH_CONFIRM_ERRORS
  }
};

// проверка, не истек ли срок годности jwt токена
export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  }
};

// автоматическая авторизация при перезагрузке страницы
export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
};