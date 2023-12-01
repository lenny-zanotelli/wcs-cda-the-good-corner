/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/NewAd.module.css';
import { CREATE_NEW_AD } from '../../graphql/mutations/mutations';
import { GET_ALL_CATEGORIES } from '../../graphql/queries/queries';

type Inputs = {
  title: string;
  price: number;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: string;
};

function NewAd() {
  const [, setFile] = useState<File>();
  const [imageUrl, setImageURL] = useState<string>();

  const router = useRouter();
  // React-Hook-Form
  const {
    handleSubmit, register, reset, formState: { errors },
  } = useForm<Inputs>();

  const { data: dataCategories } = useQuery(GET_ALL_CATEGORIES);
  const categories = dataCategories ? dataCategories.getAllCategories : [];

  const [createAd] = useMutation(CREATE_NEW_AD);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (imageUrl === undefined) {
      toast.error('Chose a proper image');
    } else {
      try {
        await createAd({
          variables: {
            newAd: {
              title: data.title,
              price: data.price,
              description: data.description,
              owner: data.owner,
              picture: `http://localhost:8000${imageUrl}`,
              location: data.location,
              category: parseInt(data.category, 10),
            },
          },
        });
        setTimeout(() => {
          router.push('/');
        }, 1000);
        setImageURL(undefined);
        setFile(undefined);
        reset();
        toast.success('New Ad has been submit!');
      } catch (err) {
        toast.error('Cant ad new Ad');
      }
    }
  };

  const handleChangeFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const url = 'http://localhost:8000/upload';
      const formData = new FormData();
      formData.append(
        'file',
        event.target.files[0],
        event.target.files[0].name,
      );

      try {
        const response = await axios.post(url, formData);
        setImageURL(response.data.filename);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (categories) {
    return (
      <div>
        <label>
          Picture:
          <br />
          <input
            type="file"
            {...register('picture', { required: true })}
            onChange={handleChangeFiles}
            className={styles.textField}
          />
          {errors.picture && toast.warning('A picture is required')}
        </label>
        {imageUrl ? (
          <>
            <br />
            <img
              width="500"
              alt="uploadedImg"
              src={`http://localhost:8000${imageUrl}`}
            />
            <br />
          </>
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
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
            limit={3}
          />
        </form>
      </div>
    );
  }
}

export default NewAd;
