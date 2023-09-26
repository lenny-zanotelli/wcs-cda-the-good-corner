/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unused-prop-types */
import styles from '../styles/NavCategory.module.css';

export type CategoryProps = {
  id: number;
  name: string;
};

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
