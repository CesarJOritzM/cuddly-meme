import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ALL_USERS } from './ListOfPersons';

const CREATE_USER = gql`
  mutation CREATE_USER(
    $name: String!
    $lastName: String!
    $date: Date!
    $gender: String!
    $height: Float!
    $colombian: Boolean
  ) {
    CreateUser(
      name: $name
      lastName: $lastName
      date: $date
      gender: $gender
      height: $height
      colombian: $colombian
    ) {
      _id
      name
      lastName
      date
      gender
      height
      colombian
    }
  }
`;

const CreateUser = () => {
  const [inputs, setInputs] = useState({
    name: '',
    lastName: '',
    date: '',
    gender: '',
    height: '',
    colombian: false,
  });

  const [CreateUser, { data, loading, error }] = useMutation(CREATE_USER, {
    variables: inputs,
    refetchQueries: [{ query: ALL_USERS }],
  });

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseFloat(value);
    }
    if (name === 'colombian') {
      if (value == 'si') {
        value = true;
      } else {
        value = false;
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs({
      name: '',
      lastName: '',
      date: '',
      gender: '',
      height: '',
      colombian: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateUser().catch(console.error);
    resetForm();
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <input
        type='text'
        name='name'
        placeholder='Nombre'
        value={inputs.name}
        onChange={handleChange}
        required
      />
      <input
        type='text'
        name='lastName'
        placeholder='Apellido'
        value={inputs.lastName}
        onChange={handleChange}
        required
      />
      <input
        type='date'
        name='date'
        value={inputs.date}
        onChange={handleChange}
        required
      />
      <label>
        Genero
        <select onChange={handleChange} name='gender'>
          <option>Selecionar</option>
          <option value='Male'>Hombre</option>
          <option value='Female'>Mujer</option>
        </select>
      </label>
      <input
        type='number'
        name='height'
        placeholder='Estatura'
        value={inputs.height}
        onChange={handleChange}
        required
      />
      <label>
        ¿Colombiano?
        <select onChange={handleChange} name='colombian'>
          <option>Selecionar</option>
          <option value='si'>Si</option>
          <option value='no'>No</option>
        </select>
      </label>
      <button type='submit'>Guardar</button>
    </form>
  );
};
export default CreateUser;
