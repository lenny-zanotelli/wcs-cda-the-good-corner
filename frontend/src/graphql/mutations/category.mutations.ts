import { gql } from '@apollo/client';

export const CREATE_NEW_CATEGORY = gql`
  mutation CreateCategory($infos: CategoryInput!) {
    createCategory(infos: $infos) {
      id
      name
    }
  }
`;

export default CREATE_NEW_CATEGORY;
