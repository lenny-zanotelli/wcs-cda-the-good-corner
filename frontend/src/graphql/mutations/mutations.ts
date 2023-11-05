import { graphql } from '../../gql';

export const DELETE_AD = graphql(/* GraphQL */ `
  mutation DeleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`);

export const CREATE_NEW_AD = graphql(/* GraphQL */ `
  mutation CreateAd($newAd: CreateAdInput!) {
    createAd(newAd: $newAd) {
      id
      description
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
`);
