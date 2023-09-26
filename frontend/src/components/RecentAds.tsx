/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import styles from '@/styles/RecentAds.module.css';
import { useEffect, useState } from 'react';
import AdCard, { AdCardProps } from './AdCard';

function RecentAds() {
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(new Date());
  const [adsData, setAdsData] = useState<AdCardProps[]>([]);

  const everyRender = () => {
    console.log('This will be execued after every render');
  };
  everyRender();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>('http://localhost:4000/ad');
        setAdsData(result.data);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [time]);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>
        Prix total:
        {total}
        {' '}
        euros
      </p>
      <p>
        Last Update
        {time.toLocaleString()}
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={() => setTime(new Date())}
      >
        Update time
      </button>
      <section className={styles.recentAds}>
        {adsData.map((ad) => (
          <div key={ad.id}>
            <AdCard
              key={ad.id}
              id={ad.id}
              picture={ad.picture}
              link={ad.link}
              price={ad.price}
              title={ad.title}
            />
            <button
              type="button"
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
              }}
            >
              Add Price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default RecentAds;
