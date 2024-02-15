/* eslint-disable no-console */
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { UserInput, useRegisterMutation } from '../../types/graphql';

function RegisterPage() {
  const router = useRouter();

  const [handleRegister] = useRegisterMutation({
    onCompleted: () => {
      router.push('/auth/login');
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData) as UserInput;
    if (formJson.email && formJson.password) {
      handleRegister({
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
      <h2>Register Page</h2>
      <form
        onSubmit={handleSubmit}
        className="text-field-with-button"
      >
        <input
          type="text"
          name="email"
          className="text-field main-search-field"
        />
        <input
          type="password"
          name="password"
          className="text-field main-search-field"
        />
        <button
          type="submit"
          className="button button-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
