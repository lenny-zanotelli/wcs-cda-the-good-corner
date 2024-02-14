import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($infos: UserInput!) {
    login(infos: $infos) {
      message
      success
    }
  }
`;

export const GET_AUTH_INFO = gql`
  query WhoAmI {
    whoAmI {
      role
      email
      isLoggedIn
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout {
      message
      success
    }
  }
`;
