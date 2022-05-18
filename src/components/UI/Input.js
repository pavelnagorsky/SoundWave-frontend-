import React, { Fragment } from "react";
import { Form } from 'react-bootstrap';

const input = (props) => {
  let isValid = true; // validation on start is correct
  let inputElement = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    isValid = false; // if input changed and it is invalid => validation fails
  }

  switch (props.elementType) {
    case ("input"):
      inputElement = (
        <Fragment>
          <Form.Control
            isInvalid={!isValid}
            isValid={isValid && props.touched}
            type={props.elementConfig.type}
            placeholder={props.elementConfig.placeholder}
            value={props.value}
            onChange={props.changed}
          />
          <Form.Control.Feedback type='invalid'>
            {props.elementConfig.invalidFeedback}
          </Form.Control.Feedback>
        </Fragment>
      );
      break;

      case ("file"):
      inputElement = (
        <Fragment>
          <Form.Control
            isInvalid={!isValid}
            isValid={isValid && props.touched}
            type={props.elementConfig.type}
            accept={props.elementConfig.accept}
            value={props.value}
            onChange={props.changed}
          />
          <Form.Control.Feedback type='invalid'>
            {props.elementConfig.invalidFeedback}
          </Form.Control.Feedback>
        </Fragment>
      );
      break;

    case ("password"):
      inputElement = (
        <Fragment>
          <Form.Control
            isInvalid={!isValid}
            isValid={isValid && props.touched}
            type={props.pwView ? 'text' : 'password'}
            placeholder={props.elementConfig.placeholder}
            value={props.value}
            onChange={props.changed}
          />
          <Form.Control.Feedback type='invalid'>
            {props.elementConfig.invalidFeedback}
          </Form.Control.Feedback>
          <Form.Check 
            className="mt-1"
            type="switch" 
            id="show-pw" 
            label="Show password" 
            onChange={props.onViewPw}
          /> 
        </Fragment>
      );
      break;

    case ("textarea"): 
    inputElement = (
      <Fragment>
        <Form.Control
          as="textarea"
          rows={4}
          isInvalid={!isValid}
          isValid={isValid && props.touched}
          type={props.elementConfig.type}
          placeholder={props.elementConfig.placeholder}
          value={props.value}
          onChange={props.changed}
        />
        <Form.Control.Feedback type='invalid'>
          {props.elementConfig.invalidFeedback}
        </Form.Control.Feedback>
      </Fragment>
    );
      break;

    case ("select"):
      inputElement = (
        <Form.Select 
          isValid={isValid && props.touched}
          aria-label="select song genre" 
          value={props.value} 
          onChange={props.changed}
        >
          {props.elementConfig.options.map(opt => {
            return (
              <option 
                key={opt.value} 
                value={opt.value}
              >
                {opt.displayValue}
              </option>
            );
          })}
        </Form.Select>
      );
      break;

    default: 
      inputElement = (
        <Fragment>
          <Form.Control
            isInvalid={!isValid}
            isValid={isValid && props.touched}
            type={props.elementConfig.type}
            placeholder={props.elementConfig.placeholder}
            value={props.value}
            onChange={props.changed}
          />
          <Form.Control.Feedback type='invalid'>
            {props.elementConfig.invalidFeedback}
          </Form.Control.Feedback>
        </Fragment>
      );
  }
  
  return(
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Label>{props.label}</Form.Label>
      {inputElement}
    </Form.Group>
  )
}

export default input;