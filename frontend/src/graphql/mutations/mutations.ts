import { gql } from '@apollo/client';

export const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: String!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const CREATE_NEW_AD = gql`
  mutation CreateAd($infos: CreateAdInput!) {
    createAd(infos: $infos) {
      id
    }
  }
`;

export const CREATE_NEW_CATEGORY = gql`
  mutation CreateCategory($infos: CategoryInput!) {
    createCategory(infos: $infos) {
      id
      name
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($infos: UpdateAdInput!, $updateAdId: String!) {
    updateAd(infos: $data, id: $updateAdId) {
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
      tags {
        id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($infos: UserInput!){
    register(infos: $infos) {
      id
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId)
  }
`;
