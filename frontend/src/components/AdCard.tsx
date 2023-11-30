import Link from 'next/link';
import styles from '../styles/AdCard.module.css';
import { Ad } from '../types';

function AdCard({
  id, title, picture, price,
}: Ad) {
  return (
    <div className={styles.adCardContainer}>
      <Link
        className={styles.adCardLink}
        href={`/ad/${id}`}
      >
        <picture>
          <img className={styles.adCardImage} src={`http://localhost:8000${picture}`} alt={title} />
        </picture>
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
