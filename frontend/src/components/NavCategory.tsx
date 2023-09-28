/* eslint-disable @next/next/no-html-link-for-pages */
import { CategoryProps } from '@/@types';
import Link from 'next/link';
import styles from '../styles/NavCategory.module.css';

function NavCategory({ name }: CategoryProps) {
  return (
    <>
      <Link
        href={`/ads/${name}`}
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
