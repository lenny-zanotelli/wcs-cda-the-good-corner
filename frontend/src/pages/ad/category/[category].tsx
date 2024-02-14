import { useRouter } from 'next/router';
import DisplayAds from '../../../components/DisplayAds';
import { useSearchQuery } from '../../../types/graphql';

function CategoryResults() {
  const router = useRouter();
  const categoryName = router.query.category;

  const { data, loading, error } = useSearchQuery({
    variables: {
      search: categoryName,
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

  const categoryAds = data?.getAllAds;

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
