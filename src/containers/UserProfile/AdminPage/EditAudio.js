import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { 
  adminNewAudio, 
  adminEditAudio,
  adminEditAudioModeClose
} from '../../../store/actions';
import { useForm } from '../../../hooks/useForm';
import FormLayout from '../../../hoc/FormLayout';
import Input from '../../../components/UI/Input';

// создание нового аудио или редактирование существующего
const EditAudio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // данные о редактируемом аудио
  const audio = useSelector(state => state.admin.editAudio);
  // массив жанров
  const categories = useSelector(state => state.categories.categories);
  // преобразуем массив жанров для использования в input type select
  const genresSelect = categories.map(ct => {
    return {
      value: ct.genre, 
      displayValue: ct.genre
    }
  });

  // удаление информации о редактируемом аудио при анмаунте
  useEffect(() => {
    return () => dispatch(adminEditAudioModeClose());
  }, []);

  // форма создания/редактирования аудио в декларативном виде
  const [controlsForm, formIsValid, inputChangedHandler, audioFile] = useForm({
    title: {
      elementType: 'input',
      label: 'Song Title',
      elementConfig: {
        type: 'text',
        placeholder: 'Song Title',
        invalidFeedback: 'Please, enter a valid Title (min 3 chars)'
      },
      value: audio ? audio.title : '',
      validation: {
        required: true,
        minLength: 3
      },
      valid: audio ? true : false,
      touched: audio ? true : false
    },
    artist: {
      elementType: 'input',
      label: 'Song Author',
      elementConfig: {
        type: 'text',
        placeholder: 'Song Author',
        invalidFeedback: 'Please, enter a valid Artist name (min 3 chars)'
      },
      value: audio ? audio.artist : '',
      validation: {
        required: true,
        minLength: 3
      },
      valid: audio ? true : false,
      touched: audio ? true : false
    },
    imageUrl: {
      elementType: 'input',
      label: 'Audio image url',
      elementConfig: {
        type: 'text',
        placeholder: 'Url of audio image (not required)',
        invalidFeedback: 'Please, provide a valid url'
      },
      value: audio ? audio.imageUrl : '',
      validation: {
        isUrl: true
      },
      valid: true,
      touched: audio ? true : false
    },
    audio: {
      elementType: 'file',
      label: 'Audio',
      elementConfig: {
        type: 'file',
        accept: '.mp3',
        invalidFeedback: 'Please, attach a valid .mp3 file'
      },
      value: '',
      validation: {
        required: true
      },
      valid: audio ? true : false,
      touched: audio ? true : false
    },
    description: {
      elementType: 'textarea',
      label: 'Song description',
      elementConfig: {
        type: 'text',
        placeholder: 'Song description',
        invalidFeedback: 'Please, enter a valid song description (min 5 chars)'
      },
      value: audio ? audio.description : '',
      validation: {
        required: true,
        minLength: 5
      },
      valid: audio ? true : false,
      touched: audio ? true : false
    },
    category: {
      elementType: 'select',
      label: "A Song Genre",
      elementConfig: {
        options: genresSelect
      },
      value: audio ? audio.category.genre : (genresSelect[0]?.value),
      validation: {},
      valid: true,
    }
  });

  // отправка формы
  const submitHandler = (event) => {
    event.preventDefault();
    const audioData = {};
    for (let formElementKey in controlsForm) {
      // если это поле аудио файла - заносим весь объект файла из стейта
      if (formElementKey === 'audio' && audioFile) {
        audioData[formElementKey] = audioFile;
      } else {
        audioData[formElementKey] = controlsForm[formElementKey].value;
      }
    };
    if (audio) {
      // обновление существующего аудио
      dispatch(adminEditAudio(audio._id, audioData));
    } else {
      // создание нового аудио
      dispatch(adminNewAudio(audioData));
    };
    navigate('/profile/admin', { replace: true });
  };

  // создаем массив из объекта controlsForm
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
        />
      ))}
      <Button 
        variant='success' 
        className='d-block mx-auto px-4'
        disabled={!formIsValid}
        type="submit"
        onClick={submitHandler}
      >
        Submit
      </Button>
    </Form>    
  );

  return (
    <FormLayout>
      <Form.Label 
        className='d-block fs-2 text-primary display-4 text-center'
        style={{
          textShadow: `3px 2px 3px rgba(0,0,0,0.2)`
        }}
      >
        {audio ? "Update audio" : "Add new audio"}
      </Form.Label>
      <hr className='text-secondary mb-3 w-50 mx-auto mt-0'/>
      {form}
    </FormLayout>
  );
};

export default EditAudio;