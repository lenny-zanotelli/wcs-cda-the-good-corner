import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ADS_SEARCH } from '@/graphql/queries/ad.queries';
import { Ad } from '../../../types/graphql';
import DisplayAds from '../../../components/DisplayAds';

function CategoryResults() {
  const router = useRouter();
  const categoryName = router.query.category;

  const { data, loading, error } = useQuery<Ad[]>(GET_ADS_SEARCH, {
    variables: {
      search: categoryName as string,
    },
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

  const categoryAds = data || [];

  return (
    <div>
      {categoryAds?.length === 0 ? (
        <p>
          No ads found for the category:
          {' '}
          {router.query.category}
        </p>
      ) : (
        <DisplayAds
          ads={categoryAds}
          titleDisplay={`Displaying category results for : ${router.query.category}`}
        />

      )}
    </div>

  );
}
export default CategoryResults;
