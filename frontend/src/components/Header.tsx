import { useQuery } from '@apollo/client';
import styles from '../styles/Header.module.css';
import NavCategory from './NavCategory';
import { GET_ALL_CATEGORIES } from '../graphql/queries/queries';
import SearchBar from './SearchBar';

function Header() {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }

  const categories = data ? data.getAllCategories : [];

  return (
    <header className={styles.header}>
      <div className={styles.mainMenu}>
        <h1>
          <a href="/" className={`${styles.button} ${styles.logo} ${styles.linkButton}`}>
            <span className={styles.mobileShortLabel}>TGC</span>
            <span className={styles.desktopLongLabel}> THE GOOD CORNER</span>
          </a>
        </h1>
        <SearchBar />
        <a href="/ad/new" className={`${styles.button} ${styles.linkButton}`}>
          <span className={styles.mobileShortLabel}>Publier</span>
          <span className={styles.desktopLongLabel}>Publier une annonce</span>
        </a>
        <a href="/ad/category/new" className={`${styles.button} ${styles.linkButton}`}>
          <span className={styles.mobileShortLabel}>Categorie</span>
          <span className={styles.desktopLongLabel}>Ajouter une Categorie</span>
        </a>
        <a href="/auth/register" className={`${styles.button} ${styles.linkButton}`}>
          <span className={styles.mobileShortLabel}>Register</span>
          <span className={styles.desktopLongLabel}>Register</span>
        </a>
        <a href="/auth/login" className={`${styles.button} ${styles.linkButton}`}>
          <span className={styles.mobileShortLabel}>Login</span>
          <span className={styles.desktopLongLabel}>Login</span>
        </a>
      </div>
      <nav className={styles.categoriesNavigation}>
        {categories.map((category) => (
          <NavCategory
            key={category.id}
            id={parseInt(category.id, 10)}
            name={category.name}
          />
        ))}
      </nav>
    </header>

  );
}

export default Header;
