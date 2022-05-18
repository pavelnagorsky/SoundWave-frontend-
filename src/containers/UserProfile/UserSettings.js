import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { sendUserData } from '../../store/actions/index';
import ErrorHandler from '../../hoc/ErrorHandler';
import FormLayout from '../../hoc/FormLayout';
import Input from '../../components/UI/Input';
import { useForm } from '../../hooks/useForm';
import { generateBase64FromImage } from '../../shared/imageReader';

// форма изменения данных пользователя
const UserSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // индикатор загрузки иформации о пользователе
  const userDataLoading = useSelector(state => state.user.loading);
  const dataLoadingError = useSelector(state => state.user.error);
  // данные о пользователе
  const userId = useSelector(state => state.auth.userId);
  const userName = useSelector(state => state.user.name);
  const userImage = useSelector(state => state.user.profileImage);
  // предпросмотр изображения
  const [imagePreview, setImagePreview] = useState(null);
  // контроль формы ввода
  const [controlsForm, formIsValid, inputChangedHandler, file] = useForm({
    name: {
      elementType: 'input',
      label: 'Name',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name',
        invalidFeedback: 'Please, enter a your name (min 3 chars)'
      },
      value: userName ? userName : '',
      validation: {
        required: true,
        minLength: 3
      },
      valid: true,
      touched: false
    },
    profileImage: {
      elementType: 'file',
      label: 'Profile Image',
      elementConfig: {
        type: 'file',
        accept: '.png, .jpg, .jpeg',
        invalidFeedback: 'Please, attach a valid (.png, .jpg or .jpeg) file'
      },
      value: '',
      validation: {
        required: true
      },
      valid: true,
      touched: false
    },
  });

  // предпросмотр загружаемой аватарки пользователя
  useEffect(() => {
    if (file) {
      generateBase64FromImage(file)
        .then(b64 => {
          setImagePreview(b64);
        })
        .catch(e => {
          setImagePreview(null);
        });
    }
  }, [file]);

  // отправка формы
  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {};
    for (let formElementKey in controlsForm) {
      // если было загружено новое изображение - передаем полю файл
      if (formElementKey === 'profileImage' && file) {
        userData[formElementKey] = file;
      } else {
        userData[formElementKey] = controlsForm[formElementKey].value;
      }
    };
    // заносим userId
    userData.userId = userId;
    // если не было изменено имя пользователя
    if (userData.name.trim() === userName) {
      userData.name = null;
    };
    // если не была изменена аватарка пользователя
    if (userData.profileImage === '') {
      userData.profileImage = null;
    };
    dispatch(sendUserData(userData));
    // редирект на профиль пользователя после небольшой задержки
    setTimeout(() => {
      navigate('/profile', { replace: true })
    }, 1000);
  };

  // создаем массив из из объекта controlsForm
  let formElementsArray = [];
  for (let key in controlsForm) {
    formElementsArray.push({
      id: key,
      config: controlsForm[key]
    });
  };
  // формируем ссылку на текущую аватарку пользователя
  let profileImgSrc = '';
  if (userImage !== null) {
    profileImgSrc =`https://soundwave-2022.herokuapp.com/${userImage}`;
  };
  if (imagePreview) {
    profileImgSrc = imagePreview;
  };
  // преобразуем каждый элемент массива в компонент <Input />
  let form = (
    <Form>
      {formElementsArray.map(formElement => (
        <Input 
          key={formElement.id}
          controlId={formElement.id}
          label={formElement.config.label}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Image 
        src={profileImgSrc} 
        fluid
        roundedCircle
        style={{
          maxHeight: '150px',
          maxWidth: '150px'
        }}
      />
      <Button 
        className='px-4 mt-3 d-block mx-auto'
        variant='outline-success' 
        disabled={!formIsValid}
        type="submit"
        onClick={submitHandler}
      >
        Submit
        <Spinner
          className={userDataLoading ? 'ms-2' : 'd-none'}
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    </Form>    
  );

  return (
    <ErrorHandler error={dataLoadingError}>
      <FormLayout>
        <Form.Label 
          className='d-block fs-2 text-primary display-4 text-center'
          style={{
            textShadow: `3px 2px 3px rgba(0,0,0,0.2)`
          }}
        >
          Change your information
        </Form.Label>
        <hr className='text-secondary mb-3 w-50 mx-auto mt-0'/>
        {form}
      </FormLayout>
    </ErrorHandler>
  )
};

export default UserSettings;