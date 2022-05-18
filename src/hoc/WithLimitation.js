import React, { Fragment, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// hoc с модальным окном про истечение лимита прослушиваний без авторизации
const WithLimitation = ({ children, isLimited, setIsLimited }) => {
  const [limitModalShow, setLimitModalShow] = useState(isLimited);

  useEffect(() => {
    setLimitModalShow(isLimited);
  }, [isLimited]);

  const closeModal = () => {
    setLimitModalShow(false);
    setIsLimited(false);
  }

  const playsLimitModal = (
    <Modal
      size="sm"
      centered
      show={limitModalShow}
      onHide={closeModal}
      aria-labelledby="listens-limit"
    >
      <Modal.Header closeButton>
        <Modal.Title id="listens-limit">
          Listens limit is over
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please, login to listen more.
      </Modal.Body>
      <Modal.Footer>
        <Link to='/auth/login'>Login</Link>
      </Modal.Footer>
    </Modal>
  );
  return (
    <Fragment>
      {playsLimitModal}
      {children}
    </Fragment>
  )
};

export default WithLimitation;