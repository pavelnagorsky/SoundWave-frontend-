import { put } from 'redux-saga/effects';

import axios from "../../axiosInstances/axiosInstance";
import axiosAuth from '../../axiosInstances/axiosInstanceAuth';
import {
  loadCategoryStart,
  setCategories,
  setNewCategory,
  setUpdatedCategory,
  setDeletedCategory
} from '../actions/index';

// получение массива категорий
export function* getCategoriesSaga (action) {
  yield put(loadCategoryStart());
  try {
    const response = yield axios.get(`/category`);
    yield put(setCategories(response.data.categories))
  }
  catch(error) {
    // console.log(error)
  }
};

// создание новой категории
export function* createCategorySaga (action) {
  const genre = action.genre;
  yield put(loadCategoryStart());
  try {
    const response = yield axiosAuth.put('category', {
      genre: genre
    });
    yield put(setNewCategory(response.data.category));
  } catch (err) {
    // console.log(err)
  }
};

// обновление категории
export function* updateCategorySaga (action) {
  const newGenre = action.newGenre;
  const id = action.id;
  yield put(loadCategoryStart());
  try {
    const response = yield axiosAuth.patch(`category/${id}`, {
      genre: newGenre
    });
    yield put(setUpdatedCategory(response.data.category));
  } catch (err) {
    // console.log(err)
  }
};

// удаление категории
export function* deleteCategorySaga (action) {
  const id = action.id;
  yield put(loadCategoryStart());
  try {
    const response = yield axiosAuth.delete(`category/${id}`);
    yield put(setDeletedCategory(response.data.id));
  } catch (err) {
    // console.log(err)
  }
};
