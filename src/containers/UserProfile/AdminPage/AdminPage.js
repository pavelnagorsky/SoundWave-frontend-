import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import {
  deletedCategory,
  updateCategory,
  createCategory,
  adminGetUsers,
  adminRaiseUser,
  adminBlockUser
} from '../../../store/actions/index';
import CategoriesControls from '../../../components/Admin/CategoriesControls';
import UsersControls from '../../../components/Admin/UsersControls';

// панель админимтратора
const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // все категории (жанры)
  const categories = useSelector(state => state.categories.categories);
  // индикатор загрузки категорий
  const ctLoading = useSelector(state => state.categories.loading);
  // реф на поле ввода жанра
  const categoryInputRef = useRef('');
  // информация о редактировании категорий
  const [edititgCategoryId, setEdititingCategoryId] = useState(null);
  const [categoryEditMode, setCategoryEditMode] = useState(false);
  // все пользователи сайта, которые не являются администраторами
  const users = useSelector(state => state.admin.users);
  // индикатор загрузки массива пользователей
  const usersLoading = useSelector(state => state.admin.loading);

  // получение массива пользователей не админов
  useEffect(() => {
    dispatch(adminGetUsers());
  }, []);

  // переключение режима редактирования существующих категроий
  const editCategoryHandler = (id, genre) => {
    // если режим редактирования уже включен,
    // то выключаем и присваиваем полю ввода ""
    if (categoryEditMode) { 
      categoryInputRef.current.value = "";
      setEdititingCategoryId(null);
      setCategoryEditMode(false);
      return;
    };
    // иначе включаем режим редактирования и выполняем логику обновления
    setCategoryEditMode(true);
    setEdititingCategoryId(id);
    categoryInputRef.current.value = genre;
  };

  // удаление категории
  const deleteCategoryHandler = id => {
    dispatch(deletedCategory(id));
  };

  // обновление или создание нового жанра
  const submitCategoryHandler = event => {
    event.preventDefault();
    // ограничение в min 2 символа
    if (categoryInputRef.current.value.trim().length < 2) {
      return;
    };
    if (categoryEditMode) {
      dispatch(updateCategory(edititgCategoryId, categoryInputRef.current.value))
    } else {
      dispatch(createCategory(categoryInputRef.current.value))
    };
    // в любом случае выключаем режим редактирования
    setCategoryEditMode(false);
    setEdititingCategoryId(null);
    categoryInputRef.current.value = "";
  };

  // сделать пользователя админом
  const raiseUser = userId => {
    dispatch(adminRaiseUser(userId))
  };

  // заблокировать (удалить) пользователя
  const blockUser = userId => {
    dispatch(adminBlockUser(userId))
  };

  return (
    <div className='row mb-5'>
      <div className='col-12'>
        <div className="d-grid gap-2 mx-1 my-3">
        <Button 
          onClick={() => navigate('audio')}
          variant='outline-primary'
          className='rounded-pill mx-2'
        >
          Add new audio
        </Button>
        </div>
      </div>
      <div className='col-md-6'>
        <CategoriesControls 
          categories={categories}
          ctLoading={ctLoading}
          categoryEditMode={categoryEditMode}
          editCategoryHandler={editCategoryHandler}
          deleteCategoryHandler={deleteCategoryHandler}
          submitCategoryHandler={e => submitCategoryHandler(e)}
          categoryInputRef={categoryInputRef}
        />
      </div>
      <div className='col-md-6'>
        <UsersControls 
          users={users}
          usersLoading={usersLoading}
          raiseUser={raiseUser}
          blockUser={blockUser}
        />
      </div>
    </div>
  );
};

export default AdminPage;