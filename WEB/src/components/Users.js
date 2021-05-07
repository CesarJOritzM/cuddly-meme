import React from 'react';
import DeleteButton from './DeleteButton';

const Users = ({ user }) => {
  const calcularEdad = (fecha) => {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  };
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{calcularEdad(user.date)}</td>
      <td>{user.gender == 'Male' ? 'M' : 'F'}</td>
      <td>{user.height} M</td>
      <td>{user.colombian ? 'Si' : 'No'}</td>
      <td>
        <DeleteButton id={user._id} />
      </td>
    </tr>
  );
};

export default Users;
