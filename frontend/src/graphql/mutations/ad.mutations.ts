import { gql } from '@apollo/client';

export const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: String!) {
    deleteAd(id: $deleteAdId) {
      id
    }
  }
`;

export const CREATE_NEW_AD = gql`
  mutation CreateAd($infos: CreateAdInput!) {
    createAd(infos: $infos) {
      id
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($infos: UpdateAdInput!, $updateAdId: String!) {
    updateAd(infos: $infos, id: $updateAdId) {
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
