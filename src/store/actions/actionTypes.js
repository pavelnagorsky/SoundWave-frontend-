// действия с аудиозаписями
export const FETCH_AUDIOS_START = 'FETCH_AUDIOS_START';
export const FETCH_AUDIOS = 'FETCH_AUDIOS';
export const SET_AUDIOS = 'SET_AUDIOS';
export const FETCH_AUDIOS_FAILED = 'FETCH_AUDIOS_FAILED';
export const SEND_LIKE_INFO = 'SEND_LIKE_INFO';
export const CHANGE_LIKE = 'CHANGE_LIKE';
export const AUDIO_SEARCH = 'AUDIO_SEARCH';
export const INCREASE_PLAYS = 'INCREASE_PLAYS';
export const FILTER_AUDIO = 'FILTER_AUDIO';

// действия со страницей полной информации об одном аудио
export const FETCH_AUDIO = 'FETCH_AUDIO';
export const FETCH_AUDIO_START = 'FETCH_AUDIO_START';
export const SET_AUDIO = 'SET_AUDIO';
export const FETCH_AUDIO_FAILED = 'FETCH_AUDIO_FAILED';
export const CLEAR_AUDIO_DATA = 'CLEAR_AUDIO_DATA';
export const DOWNLOAD_AUDIO = 'DOWNLOAD_AUDIO';

// действия с комментариями 
export const POST_COMMENT = 'POST_COMMENT';
export const SET_COMMENT = 'SET_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const SET_UPDATED_COMMENT = 'SET_UPDATED_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const REMOVE_DELETED_COMMENT = 'REMOVE_DELETED_COMMENT';

// действия плеера
export const SET_CURRENT_PLAY = 'SET_CURRENT_PLAY';
export const SET_PREV_PLAY = 'SET_PREV_PLAY';
export const SET_NEXT_PLAY = 'SET_NEXT_PLAY';
export const CLOSE_PLAYER = 'CLOSE_PLAYER';

// действия авторизации
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CONFIRM_ERRORS = 'AUTH_CONFIRM_ERRORS';

// действия с данными авторизированного пользователя
export const USER_GET_DATA = 'USER_GET_DATA';
export const USER_GET_DATA_START = 'USER_GET_DATA_START';
export const USER_GET_DATA_SUCCESS = 'USER_GET_DATA_SUCCESS';
export const USER_GET_DATA_FAIL = 'USER_GET_DATA_FAIL';
export const USER_SEND_DATA = 'USER_SEND_DATA';
export const USER_SET_CHANGED_DATA = 'USER_SET_CHANGED_DATA';
export const USER_CLEAN_DATA = 'USER_CLEAN_DATA';
export const USER_UPDATE_LIKES = 'USER_UPDATE_LIKES';
export const USER_ADD_PLAYLIST = 'USER_ADD_PLAYLIST';
export const USER_ADD_PLAYLIST_START = 'USER_ADD_PLAYLIST_START';
export const USER_ADD_PLAYLIST_SUCCESS = 'USER_ADD_PLAYLIST_SUCCESS';
export const USER_ADD_AUDIO_TO_PLAYLIST = 'USER_ADD_AUDIO_TO_PLAYLIST';
export const USER_SET_AUDIO_TO_PLAYLIST = 'USER_SET_AUDIO_TO_PLAYLIST';
export const USER_DELETE_AUDIO_FROM_PLAYLIST = 'USER_DELETE_AUDIO_FROM_PLAYLIST';
export const USER_FILTER_PLAYLIST = 'USER_FILTER_PLAYLIST';
export const USER_LOAD_PLAYLIST = 'USER_LOAD_PLAYLIST';
export const USER_DELETE_PLAYLIST = 'USER_DELETE_PLAYLIST';
export const USER_FILTER_PLAYLISTS = 'USER_FILTER_PLAYLISTS';

// действия с категориями (жанрами)
export const CATEGORIES_LOADING_START = 'CATEGORIES_LOADING_START';
export const CATEGORIES_FETCH = 'CATEGORIES_FETCH';
export const CATEGORIES_SET = 'CATEGORIES_SET';
export const CATEGORIES_CREATE = 'CATEGORIES_CREATE';
export const CATEGORIES_UPDATE = 'CATEGORIES_UPDATE';
export const CATEGORIES_DELETE = 'CATEGORIES_DELETE';
export const CATEGORIES_SET_UPDATED = 'CATEGORIES_SET_UPDATED';
export const CATEGORIES_SET_NEW = 'CATEGORIES_SET_NEW';
export const CATEGORIES_SET_DELETED = 'CATEGORIES_SET_DELETED';

// действия админситрации
export const ADMIN_LOADING_START = 'ADMIN_LOADING_START';
export const ADMIN_GET_USERS = 'ADMIN_GET_USERS';
export const ADMIN_SET_USERS = 'ADMIN_SET_USERS';
export const ADMIN_RAISE_USER = 'ADMIN_RAISE_USER';
export const ADMIN_BLOCK_USER = 'ADMIN_BLOCK_USER';
export const ADMIN_FILTER_USER = 'ADMIN_FILTER_USER';
export const ADMIN_NEW_AUDIO = 'ADMIN_NEW_AUDIO';
export const ADMIN_EDIT_AUDIO = 'ADMIN_EDIT_AUDIO';
export const ADMIN_DELETE_AUDIO = 'ADMIN_DELETE_AUDIO';
export const ADMIN_SET_EDIT_AUDIO = 'ADMIN_SET_EDIT_AUDIO';
export const ADMIN_CLEAN_EDIT_AUDIO = 'ADMIN_CLEAN_EDIT_AUDIO';