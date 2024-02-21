import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ADS_SEARCH } from '@/graphql/queries/ad.queries';
import { Ad } from '../../../types/graphql';
import DisplayAds from '../../../components/DisplayAds';

function SearchResults() {
  const router = useRouter();
  const { keyword } = router.query;
  const { data, loading, error } = useQuery<Ad[]>(GET_ADS_SEARCH, {
    variables: {
      search: keyword as string,
    },
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

  const ads = data || [];

  return (
    <DisplayAds
      ads={ads}
      titleDisplay={`Displaying search results for : ${keyword}`}
    />

  );
}

export default SearchResults;
