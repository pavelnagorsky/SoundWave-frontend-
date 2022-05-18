import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  categories: [],
  loading: false
};

// начало загрузки категорий
const loadCategoryStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

// получение категорий
const setCategories = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    loading: false
  });
};

// добавление категории
const setNewCategory = (state, action) => {
  return updateObject(state, {
    categories: state.categories.concat(action.category),
    loading: false
  });
};

// изменение категории
const setUpdatedCategory = (state, action) => {
  const updatedIndex = state.categories.findIndex(ct => {
    return ct._id === action.category._id
  });
  const updatedCategories = [...state.categories];
  updatedCategories[updatedIndex] = action.category;
  return updateObject(state, {
    categories: updatedCategories,
    loading: false
  });
};

// удаление категории
const setDeletedCategory = (state, action) => {
  const updatedCategories = state.categories.filter(ct => {
    return ct._id !== action.id
  });
  return updateObject(state, {
    categories: updatedCategories,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORIES_LOADING_START: return loadCategoryStart(state, action);
    case actionTypes.CATEGORIES_SET: return setCategories(state, action);
    case actionTypes.CATEGORIES_SET_NEW: return setNewCategory(state, action);
    case actionTypes.CATEGORIES_SET_UPDATED: return setUpdatedCategory(state, action);
    case actionTypes.CATEGORIES_SET_DELETED: return setDeletedCategory(state, action);
    default: return state;
  }
};

export default reducer;