/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdCardProps } from '@/@types';
import DisplayAds from '@/components/DisplayAds';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function CategoryResults() {
  const [categoryAds, setCategoryAds] = useState<AdCardProps[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/category?name=${router.query.category}`);
        console.log('CATEGORY ADS', result.data[0].ads);
        setCategoryAds(result.data[0].ads);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [router.query.category, router.query.keyword]);

  return (
    <DisplayAds
      ads={categoryAds}
      title={`Displaying category results for : ${router.query.category}`}
      onUpdateAds={(_updatedAds: AdCardProps[]) => {
        throw new Error('Function not implemented.');
      }}
    />

  );
}
export default CategoryResults;
