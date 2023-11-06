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

export const CREATE_NEW_CATEGORY = graphql(/* GraphQL */ `
mutation CreateNewCategory($newCategory: CreateCategoryInput!) {
  createCategory(newCategory: $newCategory) {
    id
    name
  }
}

`);

export const UPDATE_AD = graphql(/* GraphQL */ `
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
`);
