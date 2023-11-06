import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import styles from '../../../styles/NewAd.module.css';
import { CREATE_NEW_CATEGORY } from '../../../graphql/mutations/mutations';

type Inputs = {
  name: string;
};

function NewCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  const [createNewCategory] = useMutation(CREATE_NEW_CATEGORY);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createNewCategory({
        variables: {
          newCategory: {
            name: data.name,
          },
        },
      });
      setTimeout(() => {
        router.prefetch('/');
        router.push('/');
      }, 1000);
      toast.success('New Category has been submit!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Cant ad new Category');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        Nom de la Categorie :
        {' '}
        <br />
        <input
          {...register('name', { required: true })}
          className={styles.textField}
        />
        {errors.name && toast.warning('Name is required')}
      </label>
      <br />
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

export default NewCategory;
