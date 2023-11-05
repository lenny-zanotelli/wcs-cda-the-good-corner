import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import styles from '../styles/DisplayAds.module.css';
import AdCard from './AdCard';
import { GET_ALL_ADS } from '../graphql/queries/queries';
import { DELETE_AD } from '../graphql/mutations/mutations';

type DisplayAdsProps = {
  title: string;
};

function DisplayAds({ title }: DisplayAdsProps) {
  const { data, refetch: refetchAds } = useQuery(GET_ALL_ADS);
  const [deleteAd] = useMutation(DELETE_AD);

  const handleDeleteAd = async (adId: number) => {
    try {
      await deleteAd({
        variables: { deleteAdId: adId },
      });
      refetchAds();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const ads = data ? data.getAllAds : [];

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
              location={ad.location}
              owner={ad.owner}
              category={ad.category}
              ads={ad.ads}
              createdAt={ad.createdAt}
            />
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className="button"
                onClick={() => handleDeleteAd(ad.id)}
              >
                Delete
              </button>
              <div>
                <Link href={`/ad/edit/${ad.id}`} style={{ textDecoration: 'none' }}>
                  <button
                    type="button"
                    className="button"
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>

        ))}
      </section>
    </>
  );
}

export default DisplayAds;
