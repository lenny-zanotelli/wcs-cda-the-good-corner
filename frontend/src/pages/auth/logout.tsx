import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { LOGOUT } from '../../graphql/queries/queries';
import { LogoutQuery, LogoutQueryVariables } from '../../gql/graphql';
import { UserContext } from '../../components/Layout';

function Logout() {
  const authInfo = useContext(UserContext);
  const router = useRouter();
  const { loading } = useQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT, {
    onCompleted: () => {
      authInfo.refetchLogin();
      router.push('/auth/login');
    },
  });

  return (
    <div>
      {loading ? 'Loading for disconnect...' : 'Disconnected'}
    </div>

  );
}

export default Logout;
