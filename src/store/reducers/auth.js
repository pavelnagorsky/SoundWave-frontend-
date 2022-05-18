import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  errorMessage: null, // текст ошибки для локальной обработки
  networkError: false, // ошибка для глобальной обработки
  loading: false
};

const signupStart = (state, action) => {
  return updateObject(state, { 
    errorMessage: null, 
    networkError: false,
    loading: true 
  });
};

const signupFailed = (state, action) => {
  return updateObject(state, { 
    errorMessage: action.errorMessage, 
    networkError: action.networkError,
    loading: false 
  });
};

const loginStart = (state, action) => {
  return updateObject(state, { 
    errorMessage: null, 
    networkError: false,
    loading: true 
  });
};

const loginFailed = (state, action) => {
  return updateObject(state, { 
    errorMessage: action.errorMessage, 
    networkError: action.networkError,
    loading: false 
  });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    errorMessage: null,
    networkError: false,
    loading: false
  })
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null })
};

const confirmErrors = (state, action) => {
  return updateObject(state, {
    errorMessage: null, 
    networkError: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START: return signupStart(state, action);
    case actionTypes.SIGNUP_FAILED: return signupFailed(state, action);
    case actionTypes.LOGIN_START: return loginStart(state, action);
    case actionTypes.LOGIN_FAILED: return loginFailed(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_CONFIRM_ERRORS: return confirmErrors(state, action);
    default: return state;
  }
}

export default reducer;