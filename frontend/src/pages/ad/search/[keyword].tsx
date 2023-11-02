import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import DisplayAds from '../../../components/DisplayAds';

const GET_ADS_SEARCH = gql`
query Query($title: String) {
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

function SearchResults() {
  const router = useRouter();
  const { keyword } = router.query;
  const { data, loading, error } = useQuery(GET_ADS_SEARCH, {
    variables: { title: keyword },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }
  return (
    <DisplayAds
      ads={data.getAllAds}
      title={`Displaying search results for : ${keyword}`}
    />

  );
}

export default SearchResults;
