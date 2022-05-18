import React from 'react';

// hoc оболочка с css стилями для форм
const formLayout = ({ children }) => (
  <div 
    className='mx-3 mx-md-auto mb-2 p-3 border border-secondary rounded-3 shadow align-middle' 
    style={{
      maxWidth: '40em',
      letterSpacing: '0.3px',
      marginTop: '2.5em'
    }}
  >
    {children}
  </div>
);

export default formLayout;