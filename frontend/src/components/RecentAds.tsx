import { useQuery } from '@apollo/client';
import { GET_ALL_ADS } from '@/graphql/queries/ad.queries';
import DisplayAds from './DisplayAds';

function RecentAds() {
  const { loading, error, data } = useQuery(GET_ALL_ADS);

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
      ads={data?.getAllAds}
      titleDisplay="Recents Ads"
    />
  );
}

export default RecentAds;
