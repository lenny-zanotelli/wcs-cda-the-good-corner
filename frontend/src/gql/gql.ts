/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation DeleteAd($deleteAdId: String!) {\n    deleteAd(id: $deleteAdId) {\n      id\n    }\n  }\n": types.DeleteAdDocument,
    "\n  mutation CreateAd($infos: CreateAdInput!) {\n    createAd(infos: $infos) {\n      id\n    }\n  }\n": types.CreateAdDocument,
    "\n  mutation CreateCategory($infos: CategoryInput!) {\n    createCategory(infos: $infos) {\n      id\n      name\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation UpdateAd($infos: UpdateAdInput!, $updateAdId: String!) {\n    updateAd(infos: $infos, id: $updateAdId) {\n      description\n      id\n      location\n      owner\n      picture\n      price\n      title\n      category {\n        id\n      }\n      tags {\n        id\n      }\n    }\n  }\n": types.UpdateAdDocument,
    "\n  mutation Register($infos: UserInput!){\n    register(infos: $infos) {\n      id\n      email\n      role\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation DeleteUser($email: String!) {\n    deleteUser(email: $email) {\n      email\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query GetAllAds {\n    getAllAds {\n      id\n      title\n      description\n      picture\n      location\n      owner\n      price\n      createdAt\n      updatedAt\n      tags {\n        id\n        name\n      }\n    }\n  }\n": types.GetAllAdsDocument,
    "\n  query GetAllCategories {\n    getAllCategories {\n      name\n      id\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  query GetAdById($getAdByIdId: String!) {\n    getAdById(id: $getAdByIdId) {\n      id\n      title\n      price\n      description\n      owner\n      picture\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n": types.GetAdByIdDocument,
    "\n  query Search($search: String) {\n    getAllAds(search: $search) {\n      id\n      title\n      price\n      description\n      owner\n      picture\n      location\n      createdAt\n      updatedAt\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n": types.SearchDocument,
    "\n  query Login($infos: UserInput!) {\n    login(infos: $infos) {\n      message\n      success\n    }\n  }\n": types.LoginDocument,
    "\n  query WhoAmI {\n    whoAmI {\n      role\n      email\n      isLoggedIn\n    }\n  }\n": types.WhoAmIDocument,
    "\n  query GetAllUsers {\n    getAllUsers {\n      email\n      id\n      role\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query Logout {\n    logout {\n      message\n      success\n    }\n  }\n": types.LogoutDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAd($deleteAdId: String!) {\n    deleteAd(id: $deleteAdId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAd($deleteAdId: String!) {\n    deleteAd(id: $deleteAdId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAd($infos: CreateAdInput!) {\n    createAd(infos: $infos) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAd($infos: CreateAdInput!) {\n    createAd(infos: $infos) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($infos: CategoryInput!) {\n    createCategory(infos: $infos) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($infos: CategoryInput!) {\n    createCategory(infos: $infos) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAd($infos: UpdateAdInput!, $updateAdId: String!) {\n    updateAd(infos: $infos, id: $updateAdId) {\n      description\n      id\n      location\n      owner\n      picture\n      price\n      title\n      category {\n        id\n      }\n      tags {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAd($infos: UpdateAdInput!, $updateAdId: String!) {\n    updateAd(infos: $infos, id: $updateAdId) {\n      description\n      id\n      location\n      owner\n      picture\n      price\n      title\n      category {\n        id\n      }\n      tags {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($infos: UserInput!){\n    register(infos: $infos) {\n      id\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation Register($infos: UserInput!){\n    register(infos: $infos) {\n      id\n      email\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($email: String!) {\n    deleteUser(email: $email) {\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($email: String!) {\n    deleteUser(email: $email) {\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllAds {\n    getAllAds {\n      id\n      title\n      description\n      picture\n      location\n      owner\n      price\n      createdAt\n      updatedAt\n      tags {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllAds {\n    getAllAds {\n      id\n      title\n      description\n      picture\n      location\n      owner\n      price\n      createdAt\n      updatedAt\n      tags {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllCategories {\n    getAllCategories {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetAllCategories {\n    getAllCategories {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAdById($getAdByIdId: String!) {\n    getAdById(id: $getAdByIdId) {\n      id\n      title\n      price\n      description\n      owner\n      picture\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAdById($getAdByIdId: String!) {\n    getAdById(id: $getAdByIdId) {\n      id\n      title\n      price\n      description\n      owner\n      picture\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Search($search: String) {\n    getAllAds(search: $search) {\n      id\n      title\n      price\n      description\n      owner\n      picture\n      location\n      createdAt\n      updatedAt\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Search($search: String) {\n    getAllAds(search: $search) {\n      id\n      title\n      price\n      description\n      owner\n      picture\n      location\n      createdAt\n      updatedAt\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Login($infos: UserInput!) {\n    login(infos: $infos) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  query Login($infos: UserInput!) {\n    login(infos: $infos) {\n      message\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WhoAmI {\n    whoAmI {\n      role\n      email\n      isLoggedIn\n    }\n  }\n"): (typeof documents)["\n  query WhoAmI {\n    whoAmI {\n      role\n      email\n      isLoggedIn\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsers {\n    getAllUsers {\n      email\n      id\n      role\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    getAllUsers {\n      email\n      id\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Logout {\n    logout {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  query Logout {\n    logout {\n      message\n      success\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;