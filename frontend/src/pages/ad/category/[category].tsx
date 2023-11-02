/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import DisplayAds from '../../../components/DisplayAds';

const GET_CATEGORIES_ADS = gql`
query GetAllCategories {
  getAllCategories {
    id
    name
    ads {
      id
      title
      price
      description
      owner
      picture
      location
      updatedAt
      tags {
        id
        name
      }
      createdAt
    }
  }
}
`;

function CategoryResults() {
  const router = useRouter();
  const categoryName = router.query.category;

  const { data, loading, error } = useQuery(GET_CATEGORIES_ADS, {
    variables: { categoryName },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }

  const categoryAds = data?.getAllCategories;

  return (
    <DisplayAds
      ads={categoryAds}
      title={`Displaying category results for : ${router.query.category}`}
    />

  );
}
export default CategoryResults;
