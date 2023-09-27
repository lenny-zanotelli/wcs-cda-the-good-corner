/* eslint-disable react/no-unused-prop-types */
import { AdCardProps } from '@/@types';
import styles from '@/styles/AdCard.module.css';

function AdCard({
  title, picture, price, link,
}: AdCardProps) {
  return (
    <div className={styles.adCardContainer}>
      <a className={styles.adCardLink} href={link}>
        <img className={styles.adCardImage} src={picture} alt={picture} />
        <div className={styles.adCardText}>
          <div className={styles.adCardTitle}>{title}</div>
          <div>
            {price}
            {' '}
            €
          </div>
        </div>
      </a>
    </div>
  );
}

export default AdCard;
