import { gql } from '@apollo/client';

export const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const CREATE_NEW_AD = gql`
  mutation CreateAd($newAd: CreateAdInput!) {
    createAd(newAd: $newAd) {
      id
    }
  }
`;

export const CREATE_NEW_CATEGORY = gql`
  mutation CreateNewCategory($newCategory: CreateCategoryInput!) {
    createCategory(newCategory: $newCategory) {
      id
      name
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($data: UpdateAdInput!, $updateAdId: Float!) {
    updateAd(data: $data, id: $updateAdId) {
      description
      id
      location
      owner
      picture
      price
      title
      category {
        id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($newUser: CreateUserInput!){
    register(newUser: $newUser) {
      id
      email
    }
  }
`;
