import Link from 'next/link';
import NavCategory from './NavCategory';
import SearchBar from './SearchBar';
import { useGetAllCategoriesQuery } from '../types/graphql';

function Header() {
  const { data, loading, error } = useGetAllCategoriesQuery();

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
    <header className="header">
      <div className="main-menu">
        <h1>
          <Link href="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label"> THE GOOD CORNER</span>
          </Link>
        </h1>
        <SearchBar />
        <Link href="/ad/new" className="button link-button">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </Link>
        <Link href="/ad/category/new" className="button link-button">
          <span className="mobile-short-label">Categorie</span>
          <span className="desktop-long-label">Ajouter une Categorie</span>
        </Link>
        <Link href="/auth/register" className="button link-button">
          <span className="mobile-short-label">Register</span>
          <span className="desktop-long-label">Register</span>
        </Link>
        <Link href="/auth/login" className="button link-button">
          <span className="mobile-short-label">Login</span>
          <span className="desktop-long-label">Login</span>
        </Link>
        <Link href="/auth/logout" className="button link-button">
          <span className="mobile-short-label">Logout</span>
          <span className="desktop-long-label">Logout</span>
        </Link>
      </div>
      <nav className="categories-navigation">
        {categories.map((category) => (
          <NavCategory
            key={category.id}
            id={category.id}
            name={category.name}
          />
        ))}
      </nav>
    </header>

  );
}

export default Header;
