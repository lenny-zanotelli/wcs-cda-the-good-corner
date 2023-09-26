import axios from 'axios';
import styles from "@/styles/RecentAds.module.css";
import AdCard, { AdCardProps } from "./AdCard";
import { useEffect, useState } from "react";


const RecentAds = () => {
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

  // const ads: AdCardProps[] = [
  //   {
  //     title: "Table",
  //     imgUrl: "/images/table.webp",
  //     price: 120,
  //     link: "/ads/table"
  //   },
  //   {
  //     title: "Dame-jeanne",
  //     imgUrl: "/images/dame-jeanne.webp",
  //     price: 75,
  //     link: "/ads/dame-jeanne"
  //   },
  //   {
  //     title: "Vide-poche",
  //     imgUrl: "/images/vide-poche.webp",
  //     price: 4,
  //     link: "/ads/vide-poche"
  //   },
  //   {
  //     title: "Vaisselier",
  //     imgUrl: "/images/vaisselier.webp",
  //     price: 900,
  //     link: "/ads/vaisselier"
  //   },
  //   {
  //     title: "Bougie",
  //     imgUrl: "/images/bougie.webp",
  //     price: 45,
  //     link: "/ads/bougie"
  //   },
  //   {
  //     title: "Porte-magazine",
  //     imgUrl: "/images/porte-magazine.webp",
  //     price: 900,
  //     link: "/ads/porte-magazine"
  //   }


  // ]
  return (
    <>
    <h2>Annonces récentes</h2>
    <p>Prix total: {total} euros</p>
    <p>Last Update {time.toLocaleString()}</p>
    <button 
    className={styles.button}
    onClick={() => setTime(new Date())}>
      Update time</button>
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
  )
}

export default RecentAds;