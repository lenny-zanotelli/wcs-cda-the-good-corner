import { useRouter } from 'next/router';
import DisplayAds from '../../../components/DisplayAds';
import { useSearchQuery } from '../../../types/graphql';

function SearchResults() {
  const router = useRouter();
  const { keyword } = router.query;

  const { data, loading, error } = useSearchQuery({
    variables: { search: keyword as string },
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
