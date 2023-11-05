/* eslint-disable import/extensions */
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import styles from '../../styles/NewAd.module.css';
import { CREATE_NEW_AD } from '../../graphql/mutations/mutations';
import { GET_ALL_CATEGORIES } from '../../graphql/queries/queries';
import { CategoryProps } from '@/types';

type Inputs = {
  title: string;
  price: string;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: string;
};

function NewAd() {
  // React-Hook-Form
  const { handleSubmit, register, formState: { errors } } = useForm<Inputs>();

  const { data: dataCategories } = useQuery<CategoryProps>(GET_ALL_CATEGORIES);

  const [createAd] = useMutation(CREATE_NEW_AD);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log('data from form', data);
      await createAd({
        variables: {
          newAd: {
            title: data.title,
            price: data.price,
            description: data.description,
            owner: data.owner,
            picture: data.picture,
            location: data.location,
            category: parseInt(data.category, 10),
          },
        },
      });
      toast.success('New Ad has been submit!');
    } catch (err) {
      toast.error('Cant ad new Ad');
    }
  };

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
        limit={3}
      />
    </form>
  );
}

export default NewAd;
