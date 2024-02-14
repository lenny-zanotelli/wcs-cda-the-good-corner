import { useLazyQuery } from '@apollo/client';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { LOGIN } from '../../graphql/queries/queries';
import { LoginQuery, LoginQueryVariables, UserInput } from '../../gql/graphql';

function LoginPage() {
  const router = useRouter();
  const [handleLogin] = useLazyQuery<
  LoginQuery, LoginQueryVariables
  >(LOGIN, {
    onCompleted: () => {
      router.push('/');
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
          placeholder="adresse email"
        />
        <input
          name="password"
          className="text-field main-search-field"
          type="password"
          placeholder="mot de passe"
        />
        <button
          type="submit"
          className="button button-primary"

        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
