import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useLogoutQuery } from '../../types/graphql';
import UserContext from '../../contexts/userContext';

function Logout() {
  const authInfo = useContext(UserContext);
  const router = useRouter();
  const { loading } = useLogoutQuery({
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
