import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import DisplayAds from '../../../components/DisplayAds';
import { GET_ADS_SEARCH } from '../../../graphql/queries/queries';

function SearchResults() {
  const router = useRouter();
  const { keyword } = router.query;
  const { data, loading, error } = useQuery(GET_ADS_SEARCH, {
    variables: { title: keyword as string },
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

  const ads = data ? data.getAllAds : [];
  return (
    <DisplayAds
      ads={ads}
      titleDisplay={`Displaying search results for : ${keyword}`}
    />

  );
}

export default SearchResults;
