import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  SubmitHandler, useForm,
} from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useGetAdByIdQuery, useGetAllCategoriesQuery, useUpdateAdMutation } from '../../../types/graphql';

type Inputs = {
  title: string;
  price: number;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: {
    id: string;
  };
};
function EditAd() {
  const [, setFile] = useState<File>();
  const [imageUrl, setImageURL] = useState<string>('No file chosen');

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<Inputs>();
  const router = useRouter();
  const { data: dataAd } = useGetAdByIdQuery({
    variables: { getAdByIdId: router.query.id as string },
  });
  const { data: dataCategories } = useGetAllCategoriesQuery();

  const [updateAd] = useUpdateAdMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (imageUrl === undefined) {
      toast.error('Chose a proper image');
    } else {
      try {
        await updateAd({
          variables: {
            updateAdId: router.query.id as string,
            infos: {
              title: data.title,
              description: data.description,
              location: data.location,
              picture: `http://localhost:8000${imageUrl}`,
              price: data.price,
              category: data.category,
            },
          },
        });
        setTimeout(() => {
          router.push('/');
        }, 1000);
        setFile(undefined);
        reset();
        toast.success('Ad hase been modified');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.response);
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
        throw new Error(`Error when post image to service ${error}`);
      }
    }
  };

  const ad = dataAd?.getAdById;
  const categories = dataCategories ? dataCategories.getAllCategories : [];

  return (
    <div>
      <label>
        Picture:
        <br />
        <input
          type="file"
          defaultValue={ad?.picture}
          {...register('picture', { required: true })}
          onChange={handleChangeFiles}
          className="text-field"
        />
        {errors.picture && toast.warning('A picture is required')}
      </label>
      {imageUrl ? (
        <>
          <br />
          <Image
            src={`http://localhost:8000${imageUrl}`}
            width={500}
            height={500}
            alt="Uploaded Image"
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
            defaultValue={ad?.title}
            {...register('title', { required: true })}
            className="text-field"
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
            className="text-field"
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
            className="text-field"
          />
          {errors.owner && toast.warning('Description required')}
        </label>
        <br />
        {/* <label>
          Picture:
          {' '}
          <br />
          <input
            defaultValue={ad?.picture}
            type="file"
            {...register('picture', { required: true })}
            className={styles.textField}
          />
          {errors.picture && toast.warning('Picture required')}
        </label>
        <br /> */}
        <label>
          Location:
          {' '}
          <br />
          <input
            defaultValue={ad?.location}
            {...register('location', { required: true })}
            className="text-field"
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
            className="text-field"
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
    </div>

  );
}

export default EditAd;
