import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import UserContext from '../../context/userContext';
import { GET_ALL_USERS } from '../../graphql/queries/queries';
import { DELETE_USER } from '../../graphql/mutations/mutations';

function UserAdminPage() {
  const router = useRouter();
  const authInfo = useContext(UserContext);
  if (authInfo.role !== 'admin') {
    router.push('/login');
  }

  const { loading, error, data } = useQuery(GET_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (data) {
    console.log(data);
    return (
      <>
        <p>Administrator User Page</p>
        {data.getAllUsers.map((user) => (
          <div key={user.id}>
            <span>{user.email}</span>
            <button
              type="submit"
              onClick={() => deleteUser({ variables: { id: user.id } })}
            />
          </div>
        ))}
      </>
    );
  }
}

export default UserAdminPage;
