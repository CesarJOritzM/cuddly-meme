import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Users from './Users';

export const ALL_USERS = gql`
  query ALL_USERS {
    AllUsers {
      _id
      name
      lastName
      date
      height
      gender
      colombian
    }
  }
`;

const ListOfPersons = () => {
  const { data, error, loading } = useQuery(ALL_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Estatura</th>
            <th>Colombiano</th>
          </tr>
        </thead>
        <tbody>
          {data.AllUsers.map((user) => (
            <Users key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListOfPersons;
