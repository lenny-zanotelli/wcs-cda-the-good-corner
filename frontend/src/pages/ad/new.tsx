/* eslint-disable import/no-extraneous-dependencies */
import { CategoryProps } from '@/@types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '@/styles/NewAd.module.css';

function NewAd() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <label>
        Titre de l&apos;annonce:
        {' '}
        <br />
        <input
          {...register('titleRequired', { required: true })}
          className={styles.textField}
        />
        {errors.titleRequired && <span>This field is required</span>}
      </label>
      <br />
      <label>
        Prix:
        <br />
        <input
          type="number"
          {...register('price', {
            min: 1,
            valueAsNumber: true,
          })}
          className={styles.textField}
          name="price"
        />

      </label>
      <br />
      <select {...register('category')}>
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
