import Link from 'next/link';
import styles from '../styles/AdCard.module.css';
import { Ad } from '../types';

function AdCard({
  id, title, picture, price,
}: Ad) {
  return (
    <div className={styles.container}>
      <Link
        className={styles.link}
        href={`/ad/${id}`}
      >
        <picture>
          <img className={styles.image} src={picture} alt={title} />
        </picture>
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
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
