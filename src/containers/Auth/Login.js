import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Form, Button, Spinner } from 'react-bootstrap';

import * as actions from '../../store/actions/index';
import { useForm } from '../../hooks/useForm';
import FormLayout from '../../hoc/FormLayout';
import ErrorHandler from '../../hoc/ErrorHandler';
import Alert from '../../components/UI/Alert';
import Input from '../../components/UI/Input';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  // ошибка для локальной обработки
  const errorMessage = useSelector(state => state.auth.errorMessage); 
  // ошибка для глобальной обработки
  const error = useSelector(state => state.auth.networkError);
  // проходит ли обработка запроса
  const isLoading = useSelector(state => state.auth.loading);

  const closeErrorsHandler = () => {
    dispatch(actions.confirmErrors());
  };

  // очистка ошибок после закрытия компонента (аналог componentWillUnmount)
  useEffect(() => {
    return () => closeErrorsHandler()
  }, []);

  const [controlsForm, formIsValid, inputChangedHandler] = useForm({
    email: {
      elementType: 'input',
      label: 'Email',
      elementConfig: {
        type: 'text',
        placeholder: 'Your email',
        invalidFeedback: 'Please, enter a valid Email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'password',
      label: 'Password',
      elementConfig: {
        placeholder: 'Your password',
        invalidFeedback: 'Please, enter a valid password (min 6 chars or numbers)'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
        isAlphaNumeric: true
      },
      valid: false,
      touched: false
    }
  });

  // виден ли пароль
  const [isPwShown, setPwShown] = useState(false);

  // изменение видимости пароля
  const showPwToogle = () => {
    setPwShown(!isPwShown);
  }

  // отправка формы
  const submitHandler = (event) => {
    event.preventDefault();
    const loginData = {};
    for (let formElementKey in controlsForm) {
      loginData[formElementKey] = controlsForm[formElementKey].value;
    };
    dispatch(actions.loginUser(loginData));
  };

  // редирект при успешной авторизации
  const redirect = isAuthenticated ? <Navigate to='/music' replace /> : null;

  // создаем массив из из объекта controlsForm
  let formElementsArray = [];
  for (let key in controlsForm) {
    formElementsArray.push({
      id: key,
      config: controlsForm[key]
    });
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
          pwView={isPwShown}
          onViewPw={showPwToogle}
        />
      ))}
      <Button 
        className='px-4 mt-3 d-block mx-auto'
        variant='outline-success' 
        disabled={!formIsValid}
        type="submit"
        onClick={submitHandler}
      >
        Submit
        <Spinner
          className={isLoading ? 'ms-2' : 'd-none'}
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
    <ErrorHandler error={error}>
      {redirect}
      <FormLayout>
        <Form.Label 
          className='d-block fs-2 text-primary display-4 text-center'
          style={{
            textShadow: `3px 2px 3px rgba(0,0,0,0.2)`
          }}
        >
          Login
        </Form.Label>
        <hr className='text-secondary mb-3 w-50 mx-auto mt-0'/>
        <Alert 
          variant='danger' 
          info={errorMessage} 
          onClose={closeErrorsHandler} 
        />
        {form}
      </FormLayout>
    </ErrorHandler>
  );
};

export default Login;