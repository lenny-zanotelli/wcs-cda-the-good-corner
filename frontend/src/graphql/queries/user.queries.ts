import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      email
      id
      role
    }
  }
`;
