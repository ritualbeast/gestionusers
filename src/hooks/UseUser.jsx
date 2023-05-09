import { useContext } from 'react';

import { UserContext } from '../context/UserProviders';

const UseUser = () => {
  return useContext(UserContext);
};

export default UseUser;
