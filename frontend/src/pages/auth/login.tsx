import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { UserInput, useLoginLazyQuery } from '../../types/graphql';

function LoginPage() {
  const router = useRouter();
  const [handleLogin] = useLoginLazyQuery({
    onCompleted: (data) => {
      setTimeout(() => {
        router.push('/');
        return data.login.success && toast.success(`${data.login.message}`);
      }, 2000);
    },
    onError(error) {
      return error.message && toast.error(`${error.message}`);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData) as UserInput;

    if (formJson.email && formJson.password) {
      handleLogin({
        variables: {
          infos: {
            email: formJson.email,
            password: formJson.password,
          },
        },
      });
    }
  };

  return (
    <div>
      <p>Login Page</p>
      <form
        onSubmit={handleSubmit}
        className="text-field-with-button"
      >
        <input
          name="email"
          className="text-field main-search-field"
          type="text"
          placeholder="Indiquez votre email"
        />
        <input
          name="password"
          className="text-field main-search-field"
          type="password"
          placeholder="Indiquez votre mot de passe"
        />
        <button
          type="submit"
          className="button button-primary"

        >
          Login
        </button>
      </form>
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
    </div>
  );
}

export default LoginPage;
