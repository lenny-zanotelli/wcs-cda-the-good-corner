import { useLazyQuery } from '@apollo/client';
import { FormEvent } from 'react';
import { LOGIN } from '../graphql/queries/queries';
import { LoginUserInput } from '../gql/graphql';

function LoginPage() {
  const [handleLogin] = useLazyQuery(LOGIN);
  return (
    <div>
      <p>Login Page</p>
      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const formJson = Object.fromEntries(formData) as LoginUserInput;

          if (formJson.email && formJson.password) {
            handleLogin({
              variables: {
                userLogin: {
                  email: formJson.email,
                  password: formJson.password,
                },
              },
            });
          }
        }}
        className="text-field-with-button"
      >
        <input
          name="email"
          className="text-field main-search-field"
          type="text"
        />
        <input
          name="password"
          className="text-field main-search-field"
          type="password"
          placeholder="mot de passe"
        />
        <button type="submit" className="button button-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
