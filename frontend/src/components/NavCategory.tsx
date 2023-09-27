/* eslint-disable @next/next/no-html-link-for-pages */
import { CategoryProps } from '@/@types';
import styles from '../styles/NavCategory.module.css';

function NavCategory({ name }: CategoryProps) {
  return (
    <>
      <a href="/" className={styles.categoryNavigationLink}>{name}</a>
      {' '}
      •
    </>
  );
}

export default NavCategory;
