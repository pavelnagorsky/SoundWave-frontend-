import * as actionTypes from './actionTypes';

// начало загрузки категорий
export const loadCategoryStart = () => {
  return {
    type: actionTypes.CATEGORIES_LOADING_START
  }
};

// получение категроий (жанров) с сервера
export const fetchCategories = () => {
  return {
    type: actionTypes.CATEGORIES_FETCH
  }
};

// добавление полученных категорий в стэйт
export const setCategories = categories => {
  return {
    type: actionTypes.CATEGORIES_SET,
    categories: categories
  }
};

// создание новой категории
export const createCategory = genre => {
  return {
    type: actionTypes.CATEGORIES_CREATE,
    genre: genre
  }
};

// добавление новой категории в стэйт
export const setNewCategory = category => {
  return {
    type: actionTypes.CATEGORIES_SET_NEW,
    category: category
  }
};

// обновление категории на сервере
export const updateCategory = (id, newGenre) => {
  return {
    type: actionTypes.CATEGORIES_UPDATE,
    id: id,
    newGenre: newGenre
  }
};

// обновление категории в стэйте
export const setUpdatedCategory = category => {
  return {
    type: actionTypes.CATEGORIES_SET_UPDATED,
    category: category
  }
};

// удаление категории на сервере
export const deletedCategory = id => {
  return {
    type: actionTypes.CATEGORIES_DELETE,
    id: id
  }
};

// удаление категории из стейта
export const setDeletedCategory = id => {
  return {
    type: actionTypes.CATEGORIES_SET_DELETED,
    id: id
  }
};