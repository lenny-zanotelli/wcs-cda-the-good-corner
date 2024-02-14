import Link from 'next/link';
import { Category } from '../types/graphql';

function NavCategory({ name }: Category) {
  return (
    <>
      <Link
        href={`/ad/category/${name}`}
        className="category-navigation-link"
      >
        {name}
      </Link>
      {' '}
      •
    </>
  );
}

export default NavCategory;
