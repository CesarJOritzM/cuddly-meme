import React from 'react';
import { gql, useMutation } from '@apollo/client';

const DELETE_USER = gql`
  mutation DELETE_USER($id: ID!) {
    DeleteUser(_id: $id) {
      _id
      name
    }
  }
`;
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.DeleteUser));
};

const DeleteButton = (id) => {
  const [DeleteUser, { loading, error }] = useMutation(DELETE_USER, {
    variables: id,
    update,
  });
  return (
    <button
      type='button'
      disabled={loading}
      onClick={() => {
        if (confirm('¿Estas segurdo que lo quieres borrar?')) {
          DeleteUser().catch((err) => alert(err.message));
        }
      }}>
      Eliminar
    </button>
  );
};

export default DeleteButton;
