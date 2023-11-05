import { graphql } from '../../gql';

export const GET_ALL_ADS = graphql(/* GraphQL */ `
  query GetAllAds {
    getAllAds {
      id
      title
      description
      picture
      location
      owner
      price
      createdAt
      category {
        id
        name
      }
    }
  }
`);

export const GET_ALL_CATEGORIES = graphql(/* GraphQL */`
  query GetAllCategories {
    getAllCategories {
      name
      id
    }
  }
`);

export const GET_AD_BY_ID = graphql(/* GraphQL */`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      price
      description
      owner
      picture
      location
    }
  }
`);

export const GET_ALL_ADS_BY_CATEGORY = graphql(/* GraphQL */`
  query GetAllAdsByCategory($category: String) {
    getAllAds(category: $category) {
      id
      title
      price
      description
      owner
      picture
      location
      createdAt
      updatedAt
      category {
        id
        name
      }
    }
  }
`);

export const GET_ADS_SEARCH = graphql(/* GraphQL */`
query GetAllAdsByTitle($title: String) {
  getAllAds(title: $title) {
    id
    title
    price
    description
    owner
    picture
    location
    createdAt
    updatedAt
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
`);
