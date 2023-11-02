/* eslint-disable import/no-extraneous-dependencies */
import { gql, useQuery } from '@apollo/client';
import DisplayAds from './DisplayAds';
// import { AdCardProps } from '@/types';

const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      category {
        id
        name
      }
      description
      picture
      location
      owner
      price
    }
  }
`;

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
      ads={data.getAllAds}
      title="Recents Ads"
    />
  );
}

export default RecentAds;
