import { useGetAllAdsQuery } from '../types/graphql';
import DisplayAds from './DisplayAds';

function RecentAds() {
  const { loading, error, data } = useGetAllAdsQuery();

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
