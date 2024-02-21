import { useQuery } from '@apollo/client';
import { GET_ALL_ADS } from '@/graphql/queries/ad.queries';
import { Ad } from '../types/graphql';
import DisplayAds from './DisplayAds';

function RecentAds() {
  const { loading, error, data } = useQuery<Ad[]>(GET_ALL_ADS);

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
      titleDisplay="Recents Ads"
      ads={ads}
    />
  );
}

export default RecentAds;
