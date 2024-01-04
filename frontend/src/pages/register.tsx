import { useMutation } from '@apollo/client';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { REGISTER } from '../graphql/mutations/mutations';
import { MutationRegisterArgs } from '../gql/graphql';

function RegisterPage() {
  const router = useRouter();
  const [handleRegister] = useMutation<MutationRegisterArgs>(REGISTER, {
    onCompleted: () => {
      router.push('/login');
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData);
    if (formJson.email && formJson.password) {
      handleRegister({
        variables: {
          newUser: {
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
