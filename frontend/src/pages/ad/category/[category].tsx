import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import DisplayAds from '../../../components/DisplayAds';
import { GET_ALL_ADS_BY_CATEGORY } from '../../../graphql/queries/queries';

function CategoryResults() {
  const router = useRouter();
  const categoryName = router.query.category;

  const { data, loading, error } = useQuery(GET_ALL_ADS_BY_CATEGORY, {
    variables: { category: categoryName },
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

  const categoryAds = data?.getAllAds;

  return (
    <div>
      {categoryAds.length === 0 ? (
        <p>
          No ads found for the category:
          {' '}
          {router.query.category}
        </p>
      ) : (
        <DisplayAds
          ads={categoryAds}
          title={`Displaying category results for : ${router.query.category}`}
        />

      )}
    </div>

  );
}
export default CategoryResults;
