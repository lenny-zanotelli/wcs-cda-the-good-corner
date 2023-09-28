/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdCardProps } from '@/@types';
import DisplayAds from '@/components/DisplayAds';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function SearchResults() {
  const [searchAds, setSearchAds] = useState<AdCardProps[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/ad?title=${router.query.keyword}`);
        console.log(result.data);
        setSearchAds(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [router.query.keyword]);

  return (
    <DisplayAds
      ads={searchAds}
      title={`Displaying search results for : ${router.query.keyword}`}
      onUpdateAds={(_updatedAds: AdCardProps[]) => {
        throw new Error('Function not implemented.');
      }}
    />

  );
}

export default SearchResults;
