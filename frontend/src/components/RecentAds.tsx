/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AdCardProps } from '@/@types';
import DisplayAds from './DisplayAds';

function RecentAds() {
  const [recentAds, setRecentsAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>('http://localhost:4000/ad');
        setRecentsAds(result.data);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const updatedAdsLocally = (updateAds: AdCardProps[]) => {
    setRecentsAds(updateAds);
  };

  return <DisplayAds ads={recentAds} title="Recents Ads" onUpdateAds={updatedAdsLocally} />;
}

export default RecentAds;
