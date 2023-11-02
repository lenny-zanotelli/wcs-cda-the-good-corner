/* eslint-disable import/extensions */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import styles from '../styles/NavCategory.module.css';
import { CategoryProps } from '../@types';

function NavCategory({ name }: CategoryProps) {
  return (
    <>
      <Link
        href={`/ad/category/${name}`}
        className={styles.categoryNavigationLink}
      >
        {name}
      </Link>
      {' '}
      •
    </>
  );
}

export default NavCategory;
