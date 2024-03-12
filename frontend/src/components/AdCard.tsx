import Link from 'next/link';
import { Ad } from '../types/ad';

function AdCard({
  id, title, picture, price,
}: Ad) {
  return (
    <div className="container">
      <Link
        className="link"
        href={`/ad/${id}`}
      >
        <picture>
          <img className="image" src={picture} alt={title} />
        </picture>
        <div className="text">
          <div className="style">{title}</div>
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
