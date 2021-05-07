import React from 'react';
import CreateUser from './CreateUser';
import ListOfPersons from './ListOfPersons';

import '../styles/globlal.scss';

const App = () => {
  return (
    <div className='main'>
      <CreateUser />
      <ListOfPersons />
    </div>
  );
};

export default App;
