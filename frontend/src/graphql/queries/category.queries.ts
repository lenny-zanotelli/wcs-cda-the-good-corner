import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      name
      id
    }
  }
`;

export default GET_ALL_CATEGORIES;
