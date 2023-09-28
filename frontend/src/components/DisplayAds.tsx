/* eslint-disable import/no-extraneous-dependencies */
import styles from '@/styles/DisplayAds.module.css';
import { AdCardProps } from '@/@types';
import axios from 'axios';
// import { useState } from 'react';
import AdCard from './AdCard';

type DisplayAdsProps = {
  ads: AdCardProps[];
  title: string;
  onUpdateAds: (updatedAds: AdCardProps[]) => void;
};

function DisplayAds({ ads, title, onUpdateAds }: DisplayAdsProps) {
  const deleteAd = async (cardId: number) => {
    try {
      const result = await axios.delete('http://localhost:4000/ad', { data: { id: cardId } });
      // Filtre les annonces pour exclure celle avec un Id correspondant a cardId
      const updatedAds = ads.filter((ad) => ad.id !== cardId);
      onUpdateAds(updatedAds);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>{title}</h2>
      <section className={styles.recentAds}>
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              key={ad.id}
              id={ad.id}
              picture={ad.picture}
              price={ad.price}
              title={ad.title}
              description={ad.description}
              owner={ad.owner}
              category={ad.category}
            />
            <button
              type="button"
              className="button"
              onClick={() => deleteAd(ad.id)}
            >
              Delete
            </button>
          </div>

        ))}
      </section>
    </>
  );
}

export default DisplayAds;
