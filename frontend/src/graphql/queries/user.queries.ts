import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      email
      id
      role
    }
  }
`;

export default GET_ALL_USERS;
