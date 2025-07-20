// useAuth.js
import { useSelector } from 'react-redux';

const useAuth = () => {
  const user = useSelector(state => state.user.user);
  return user !== null;
};

export default useAuth;