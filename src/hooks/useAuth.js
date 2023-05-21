import {
  selectError,
  selectIsLoggedIn,
  selectUser,
} from 'components/redux/auth/selectors.js';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);

  return {
    isLoggedIn,
    user,
    error,
  };
};
