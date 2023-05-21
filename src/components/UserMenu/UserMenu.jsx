import { logOut } from 'components/redux/auth/operations.js';
import { useAuth } from 'hooks/useAuth.js';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.wrapper}>
      <NavLink to="/contacts">Contacts</NavLink>
      <p className={css.username}>Welcome, {user.name}</p>
      <button type="button" onClick={() => dispatch(logOut())}>
        LogOut
      </button>
    </div>
  );
};
