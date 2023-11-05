import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  SubmitHandler, useForm,
} from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import styles from '@/styles/NewAd.module.css';
import { GET_AD_BY_ID, GET_ALL_CATEGORIES } from '../../../graphql/queries/queries';
import { UPDATE_AD } from '../../../graphql/mutations/mutations';

type Inputs = {
  title: string;
  price: number;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: string;
};

function EditAd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<Inputs>();
  const router = useRouter();
  const { data: dataAd } = useQuery(GET_AD_BY_ID, {
    variables: { getAdByIdId: Number(router.query.id) },
  });
  const { data: dataCategories } = useQuery(GET_ALL_CATEGORIES);

  const [updateAd] = useMutation(UPDATE_AD);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log('data form forn', data);
      await updateAd({
        variables: {
          updateAdId: Number(router.query.id),
          data: {
            category: parseInt(data.category, 10),
            description: data.description,
            location: data.location,
            owner: data.owner,
            picture: data.picture,
            price: data.price,
            title: data.title,
          },

        },
      });
      toast.success('Ad hase been modified');
      setTimeout(() => {
        router.push('/');
      }, 1000);
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response);
    }
  };

  const ad = dataAd?.getAdById;
  const categories = dataCategories ? dataCategories.getAllCategories : [];

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
