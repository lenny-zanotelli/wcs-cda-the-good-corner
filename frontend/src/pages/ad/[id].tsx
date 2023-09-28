import { AdCardProps } from '@/@types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function AdDetailComponent() {
  const [data, setData] = useState<AdCardProps>();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async (searchId: number) => {
      try {
        const result = await axios.get(`http://localhost:4000/ad/${searchId}`);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(Number(router.query.id));
  }, [router.query.id]);
  return (
    <main className="main-content">
      <h2 className="ad-details-title">{data?.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={data?.picture} alt={data?.title} />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">
            {data?.price}
            {' '}
            €
          </div>
          <div className="ad-details-description">
            {data?.description}
          </div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par
            {' '}
            <b>{data?.owner}</b>
            {' '}
            {data?.createdAt}
          </div>
          <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              strokeWidth="2.5"
              fill="none"
            >
              <path
                d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
              />
            </svg>
            Envoyer un email
          </a>
        </div>
      </section>
    </main>
  );
}

export default AdDetailComponent;
