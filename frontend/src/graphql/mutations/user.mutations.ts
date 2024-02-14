import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
      email
    }
  }
`;

export default DELETE_USER;
