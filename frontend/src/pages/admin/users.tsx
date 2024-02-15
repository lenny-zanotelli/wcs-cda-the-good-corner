import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../components/Layout';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../types/graphql';
import GET_ALL_USERS from '@/graphql/queries/user.queries';

function UserAdminPage() {
  const router = useRouter();
  const authinfo = useContext(UserContext);
  if (authinfo.role !== 'admin') {
    router.push('/auth/login');
  }
  if (authinfo.role === 'user') {
    router.push('/');
  }
  const { loading, error, data } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation({
    refetchQueries: [{ query: GET_ALL_USERS }],
    onCompleted: () => {
      console.log('Succces Delete');
    },
    onError: (err) => {
      console.error('error deleting user:', err);
    },
  });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (data) {
    // console.log('data', data.getAllUsers);
    return (
      <>
        <p>Administrator User Page</p>
        {data.getAllUsers.map((user) => (
          <div key={user.id}>
            <span>{user.email}</span>
            <button
              type="submit"
              aria-label="Delete"
              onClick={() => deleteUser({
                variables: { email: user.email },
              })}
            />
          </div>
        ))}
      </>
    );
  }
}

export default UserAdminPage;
