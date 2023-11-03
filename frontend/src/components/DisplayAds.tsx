import Link from 'next/link';
import { gql, useMutation, useQuery } from '@apollo/client';
import styles from '@/styles/DisplayAds.module.css';
import AdCard from './AdCard';
import { AdCardProps } from '../@types';

type DisplayAdsProps = {
  ads: AdCardProps[];
  title: string;
};

const DELETE_AD = gql`
mutation Mutation($deleteAdId: Float!) {
  deleteAd(id: $deleteAdId)
}
`;

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

function DisplayAds({ ads, title }: DisplayAdsProps) {
  const { data, refetch: refetchAds } = useQuery(GET_ALL_ADS);
  const [deleteAd] = useMutation(DELETE_AD);

  // TODO: find the good type or smth else
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteAd = async (adId: any) => {
    try {
      await deleteAd({
        variables: { deleteAdId: parseFloat(adId) },
      });
      refetchAds();
      console.log(data);
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
              location={ad.location}
              owner={ad.owner}
              category={ad.category}
              createdAt={ad.createdAt}
              ads={ad.ads}
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
