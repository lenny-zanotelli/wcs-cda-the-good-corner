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
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      name
      id
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
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
`;

export const LOGIN = gql`
  query Login($userLogin: LoginUserInput!) {
    login(userLogin: $userLogin)
  }
`;

export const GET_AUTH_INFO = gql`
  query WhoAmI {
    whoAmI {
      isLoggedIn
      email
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      email
      id
    }
  }
`;
