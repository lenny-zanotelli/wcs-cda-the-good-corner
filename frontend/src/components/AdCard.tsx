import Link from 'next/link';
import styles from '@/styles/AdCard.module.css';
import { AdCardProps } from '../@types';

function AdCard({
  id, title, picture, price,
}: AdCardProps) {
  return (
    <div className={styles.adCardContainer}>
      <Link
        className={styles.adCardLink}
        href={`/ad/${id}`}
      >
        <img className={styles.adCardImage} src={picture} alt={title} />
        <div className={styles.adCardText}>
          <div className={styles.adCardTitle}>{title}</div>
          <div>
            {price}
            {' '}
            €
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AdCard;
