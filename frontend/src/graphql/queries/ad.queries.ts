import { gql } from '@apollo/client';

export const GET_ALL_ADS = gql`
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
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: String!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      price
      description
      owner
      picture
      location
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
`;

export const GET_ALL_ADS_BY_CATEGORY = gql`
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
`;

export const GET_ADS_SEARCH = gql`
  query Search($search: String) {
    getAllAds(search: $search) {
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
`;
