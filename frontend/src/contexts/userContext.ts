import { createContext } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  refetchLogin: () => {},
  role: 'user',
});

export default UserContext;
