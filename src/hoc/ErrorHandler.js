import React, { useState, Fragment, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { ImSad } from 'react-icons/im';

// HOC вывода ошибки, предназначенной для общей обработки (когда не нужен текст ошибки)
const ErrorHandler = ({ children, error }) => {
  const [show, setShow] = useState(error); // error: boolean

  useEffect(() => {
    setShow(error);
  }, [error]);

  const confirmError = () => {
    setShow(false)
  }

  let modal = (error && error !== null) ? (
    <Modal
      show={show}
      onHide={confirmError}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          An error occured
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex align-items-center">
        <div className="flex-grow-1">
          <h4>Some internet problem detected</h4>      
          <p>
            Check your internet connection or try later
          </p>
        </div>
        <ImSad fontSize={"40px"}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={confirmError}>Close</Button>
      </Modal.Footer>
    </Modal>
  ): null;

  return (
    <Fragment>
      {modal}
      {children}
    </Fragment>
  );
};

export default ErrorHandler;

