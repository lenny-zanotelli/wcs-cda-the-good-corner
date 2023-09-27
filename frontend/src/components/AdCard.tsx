/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unused-prop-types */
import { AdCardProps } from '@/@types';
import styles from '@/styles/AdCard.module.css';
import Link from 'next/link';

function AdCard({
  id, title, picture, price,
}: AdCardProps) {
  return (
    <div className={styles.adCardContainer}>
      <Link
        className={styles.adCardLink}
        href={`/ad/${id}`}
      >
        <img className={styles.adCardImage} src={picture} alt={picture} />
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
