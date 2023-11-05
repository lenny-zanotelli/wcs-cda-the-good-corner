import { useQuery } from '@apollo/client';
import DisplayAds from './DisplayAds';
import { GET_ALL_ADS } from '../graphql/queries/queries';

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
      title="Recents Ads"
    />
  );
}

export default RecentAds;
