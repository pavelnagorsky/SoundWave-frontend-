import React from "react";
import { 
  Button, ListGroup, Card, 
  InputGroup, Form,
  Badge, Spinner
} from 'react-bootstrap';

const categoriesControls = props => {
  let ctControls = (
    <Card className='p-2 mb-3 shadow'>
      <Card.Body className='d-flex align-items-center'>
        <Card.Title className='mb-0 flex-grow-1'>
          Categories    
          <Spinner 
            className={props.ctLoading ? 'ms-2' : 'd-none'}
            as="span" 
            size="sm" 
            animation="grow"
          />
        </Card.Title>
        <Badge pill bg="primary">
          {props.categories.length} genres
        </Badge>
      </Card.Body>
      <ListGroup 
        style={{
          maxHeight: "300px",
          overflowX: "auto"
        }}
        variant="flush"
      >
        {props.categories.map(ct => {
          return (
            <ListGroup.Item className='d-flex align-items-center' key={ct._id}>
              <div className='flex-grow-1'>{ct.genre}</div>
              <Button 
                size='sm' 
                variant='outline-warning'
                className='me-2'
                onClick={() => props.editCategoryHandler(ct._id, ct.genre)}
              >
                Edit
              </Button>
              <Button 
                size='sm' 
                variant='outline-danger'
                onClick={() => props.deleteCategoryHandler(ct._id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
      <Form className="pb-2">
        <InputGroup className="p-2 mt-2">
          <Form.Control
            ref={props.categoryInputRef}
            placeholder="New category genre (Pop, Rock, Folk etc..)"
            aria-label="Add new category"
            aria-describedby="basic-addon-category-new"
          />
          <Button 
            type='submit'
            variant="outline-secondary" 
            id="basic-addon-category-new"
            onClick={e => props.submitCategoryHandler(e)}
          >
            {props.categoryEditMode ? "Update" : "New" }
          </Button>
        </InputGroup>
        <Form.Text id="passwordHelpBlock" className='mt-0 ms-3' muted>
          Category title must be min 2 characters long
        </Form.Text>
      </Form>
    </Card>
  );
  return ctControls;
};

export default categoriesControls;