import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import styles from '../styles/DisplayAds.module.css';
import AdCard from './AdCard';
import { GET_ALL_ADS } from '../graphql/queries/queries';
import { DELETE_AD } from '../graphql/mutations/mutations';
import { Ad } from '../types';
import { MutationDeleteAdArgs } from '../gql/graphql';

type DisplayAdsProps = {
  ads: Ad[];
  titleDisplay: string;
};

function DisplayAds({ titleDisplay, ads }: DisplayAdsProps) {
  const { data, refetch } = useQuery(GET_ALL_ADS, { skip: ads.length > 0 });
  const [deleteAd] = useMutation<MutationDeleteAdArgs>(DELETE_AD);

  const handleDeleteAd = async (adId: number) => {
    try {
      await deleteAd({
        variables: { deleteAdId: adId },
      });
      refetch();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>{titleDisplay}</h2>
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
              createdAt={ad.createdAt}
            />
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className="button"
                onClick={() => handleDeleteAd(Number(ad.id))}
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
