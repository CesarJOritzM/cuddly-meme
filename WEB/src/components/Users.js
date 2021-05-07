import React from 'react';
import DeleteButton from './DeleteButton';

const Users = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>30</td>
      <td>{user.gender == 'Male' ? 'M' : 'F'}</td>
      <td>{user.height}</td>
      <td>{user.colombian ? 'Si' : 'No'}</td>
      <td>
        <DeleteButton id={user._id} />
      </td>
    </tr>
  );
};

export default Users;
