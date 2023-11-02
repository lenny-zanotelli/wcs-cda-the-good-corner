/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '@/styles/NewAd.module.css';
import { AdCardProps, CategoryProps } from '../../../@types';

type Inputs = {
  title: string;
  price: number;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: number;
};

function EditAd() {
  const router = useRouter();
  const [ad, setAd] = useState<AdCardProps>();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get<CategoryProps[]>(
          'http://localhost:4000/category',
        );
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
    const fetchAd = async () => {
      try {
        const result = await axios.get<AdCardProps>(
          `http://localhost:4000/ad/${router.query.id}`,
        );
        setAd(result.data);
        reset();
      } catch (error) {
        console.log(error);
      }
    };
    fetchAd();
  }, [router.query.id, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await axios.put('http://localhost:4000/ad', {
        idToEdit: router.query.id,
        newAd: data,
      });
      toast.success(result.data);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error: any) {
      toast.error(error.response);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        Titre de l&apos;annonce:
        {' '}
        <br />
        <input
          defaultValue={ad?.title}
          {...register('title', { required: true })}
          className={styles.textField}
        />
        {errors.title && toast.warning('Title with 3 characters at least required')}
      </label>
      <br />
      <label>
        Description:
        {' '}
        <br />
        <input
          defaultValue={ad?.description}
          {...register('description', { required: true })}
          className={styles.textField}
        />
        {errors.description && toast.warning('Description required')}
      </label>
      <br />
      <label>
        Owner:
        {' '}
        <br />
        <input
          defaultValue={ad?.owner}
          {...register('owner', { required: true })}
          className={styles.textField}
        />
        {errors.owner && toast.warning('Description required')}
      </label>
      <br />
      <label>
        Picture:
        {' '}
        <br />
        <input
          defaultValue={ad?.picture}
          type="url"
          {...register('picture', { required: true })}
          className={styles.textField}
        />
        {errors.picture && toast.warning('Picture required')}
      </label>
      <br />
      <label>
        Location:
        {' '}
        <br />
        <input
          defaultValue={ad?.location}
          {...register('location', { required: true })}
          className={styles.textField}
        />
        {errors.location && toast.warning('Location required')}
      </label>
      <br />
      <label>
        Prix:
        <br />
        <input
          defaultValue={ad?.price}
          type="number"
          {...register('price', {
            required: true,
            valueAsNumber: true,
            min: 1,
          })}
          className={styles.textField}
          name="price"
        />
        {errors.price && toast.warning('Positive Price required')}
      </label>
      <br />
      <select
        defaultValue={ad?.category?.id}
        {...register('category', { required: true })}
      >
        {categories.map((category) => (
          <option
            value={category.id}
            key={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      {errors.category && toast.warning('A Category required')}
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

export default EditAd;
