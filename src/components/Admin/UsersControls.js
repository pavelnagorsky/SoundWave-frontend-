import React from "react";
import { 
  Button, ListGroup, Card, 
  Badge, Spinner
} from 'react-bootstrap';

const usersControls = props => {
  const uControls = (
    <Card className='p-2 shadow mb-3'>
      <Card.Body className='d-flex align-items-center'>
        <Card.Title className='mb-0 flex-grow-1'>
          Users   
          <Spinner 
            className={props.usersLoading ? 'ms-2' : 'd-none'}
            as="span" 
            size="sm" 
            animation="grow"
          />
        </Card.Title>
        <Badge pill bg="primary">
          {props.users.length} users
        </Badge>
      </Card.Body>
      <ListGroup 
        variant="flush"
        style={{
          maxHeight: "300px",
          overflowX: "auto"
        }}
      >
        {props.users.map(user => {
          return (
            <ListGroup.Item className='d-flex align-items-center' key={user._id}>
              <div className='flex-grow-1'>
                <div>{user.name}</div>
                <div className="muted text-secondary">{user.email}</div>
              </div>
              <Button 
                size='sm' 
                variant='outline-info'
                className='me-2'
                onClick={() => props.raiseUser(user._id)}
              >
                Raise
              </Button>
              <Button 
                size='sm' 
                variant='outline-danger'
                onClick={() => props.blockUser(user._id)}
              >
                Block
              </Button>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Card>
  );
  return uControls;
};

export default usersControls;