import { useState } from "react"

import { checkValidity } from '../shared/validation';
import { updateObject } from '../shared/utility';

// useForm принимает на вход декларативное описание формы
export const useForm = form => {
  const [controlsForm, setControlsForm] = useState(form);
  // валидна ли форма
  const [formIsValid, setFormIsValid] = useState(false);
  // 
  const [file, setFile] = useState(null);

  // на изменеие поля ввода проводим валидацию
  const inputChangedHandler = (event, controlName) => {
    // если есть файл
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
    // обновляем данные controlsForm для затронутого поля
    const updatedControlsElement = updateObject(controlsForm[controlName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, controlsForm[controlName].validation),
      touched: true
    });
    // обновляем всю controlsForm, заменяя затронутый элемент
    const updatedControlsForm = updateObject(controlsForm, {
      [controlName]: updatedControlsElement
    });
    // считываем валидность формы, проходя через каждый элемент
    let formIsValid = true;
    for (let inputIdentifier in updatedControlsForm) {
      formIsValid = updatedControlsForm[inputIdentifier].valid && formIsValid;
    }
    setControlsForm(updatedControlsForm);
    setFormIsValid(formIsValid);
  };
  
  return [controlsForm, formIsValid, inputChangedHandler, file];
};

