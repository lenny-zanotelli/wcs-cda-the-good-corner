import { CategoryProps } from '@/@types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '@/styles/NewAd.module.css';

function NewAd() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get<CategoryProps[]>(
        'http://localhost:4000/category',
      );
      setCategories(result.data);
    };
    fetchCategories();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
      }}
    >
      <label>
        Titre de l&apos;annonce:
        {' '}
        <br />
        <input
          name="title"
          className={styles.textField}
        />
      </label>
      <br />
      <label>
        Prix:
        <br />
        <input
          className={styles.textField}
          name="price"
          type="number"
        />
      </label>
      <br />
      <select name="category">
        {categories.map((category) => (
          <option
            value={category.id}
            key={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      <button
        className="button"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default NewAd;
