import { AuthNav } from 'components/AuthNav/AuthNav.jsx';
import { UserMenu } from 'components/UserMenu/UserMenu.jsx';
import { useAuth } from 'hooks/useAuth.js';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Navigation.module.css';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <nav>
        <NavLink className={css.link} to="/">
          Home
        </NavLink>

        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </nav>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </header>
  );
};
