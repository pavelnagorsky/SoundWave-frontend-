import React from 'react';
import { Alert } from 'react-bootstrap';

// вывод текста ошибки
const alert = ({ variant, info, onClose }) => (
    <Alert 
      show={info ? true : false}
      variant={variant} 
      dismissible
      onClose={onClose}
    >
      <Alert.Heading>Some error occured</Alert.Heading>
      <div>
        {info}
      </div>
    </Alert>
);

export default alert;