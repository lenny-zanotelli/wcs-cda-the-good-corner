import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($infos: UserInput!){
    register(infos: $infos) {
      id
      email
      role
    }
  }
`;

export default REGISTER;
