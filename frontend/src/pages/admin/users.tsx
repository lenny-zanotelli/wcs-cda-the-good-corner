import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries/queries';
import { DELETE_USER } from '../../graphql/mutations/mutations';
import {
  DeleteUserMutation, DeleteUserMutationVariables, GetAllUsersQuery, GetAllUsersQueryVariables,
} from '../../gql/graphql';
import { UserContext } from '../../components/Layout';

function UserAdminPage() {
  const router = useRouter();
  const authinfo = useContext(UserContext);
  if (authinfo.role !== 'admin') {
    router.push('/login');
  }

  const { loading, error, data } = useQuery<
  GetAllUsersQuery, GetAllUsersQueryVariables
  >(GET_ALL_USERS);

  const [deleteUser] = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DELETE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
    onError: (err) => {
      console.error('Error deleting user:', err);
    },
    onCompleted: () => {
      console.log('Success Delete');
    },
  });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (data) {
    console.log('data', data.getAllUsers);
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
                variables: { deleteUserId: Number.parseInt(user.id, 10) },
              })}
            />
          </div>
        ))}
      </>
    );
  }
}

export default UserAdminPage;
