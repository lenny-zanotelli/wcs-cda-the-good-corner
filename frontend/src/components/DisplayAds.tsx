/* eslint-disable no-console */
import Link from 'next/link';
import AdCard from './AdCard';
import { Ad, useDeleteAdMutation, useGetAllAdsQuery } from '../types/graphql';

type DisplayAdsProps = {
  ads: Ad[];
  titleDisplay: string;
};

function DisplayAds({ titleDisplay, ads }: DisplayAdsProps) {
  const { data, refetch } = useGetAllAdsQuery({ skip: ads.length > 0 });
  const [deleteAd] = useDeleteAdMutation();

  const handleDeleteAd = async (adId: string) => {
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
      <section className="recent-ads">
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
              updatedAt={ad.updatedAt}
              tags={ad.tags}
            />
            <div className="button-container">
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
