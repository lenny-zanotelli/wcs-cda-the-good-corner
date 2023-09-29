/* eslint-disable import/no-extraneous-dependencies */
import { CategoryProps } from '@/@types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '@/styles/NewAd.module.css';
import { ToastContainer, toast } from 'react-toastify';

function NewAd() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  // React-Hook-Form
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Fetch categories
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
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('http://localhost:4000/ad', data);
          toast.success('New Ad has been submit!');
          console.log(data);
        } catch (error) {
          toast.error('Cant add new Ad');
          console.log(error);
        }
      })}
    >
      <label>
        Titre de l&apos;annonce:
        {' '}
        <br />
        <input
          {...register('title', { required: true })}
          className={styles.textField}
        />
        {errors.title && toast.warning('Name is required')}
      </label>
      <br />
      <label>
        Description:
        {' '}
        <br />
        <input
          {...register('description', { required: true })}
          className={styles.textField}
        />
        {errors.description && toast.warning('Description is required')}
      </label>
      <br />
      <label>
        Owner:
        {' '}
        <br />
        <input
          {...register('owner', { required: true })}
          className={styles.textField}
        />
        {errors.owner && toast.warning('An Owner is required')}
      </label>
      <br />
      <label>
        Picture:
        {' '}
        <br />
        <input
          type="url"
          {...register('picture', { required: true })}
          className={styles.textField}
        />
        {errors.picture && toast.warning('A picture is required')}
      </label>
      <br />
      <label>
        Location:
        {' '}
        <br />
        <input
          {...register('location', { required: true })}
          className={styles.textField}
        />
        {errors.location && toast.warning('A location is required')}
      </label>
      <br />
      <label>
        Prix:
        <br />
        <input
          type="number"
          {...register('price', {
            required: true,
            valueAsNumber: true,
            min: 1,
          })}
          className={styles.textField}
          name="price"
        />
        {errors.price && toast.warning('Positive price is required')}
      </label>
      <br />
      <select {...register('category', { required: true })}>
        {errors.category && toast.warning('A category is required')}
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
}

export default NewAd;
