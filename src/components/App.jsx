import { Route, Routes } from 'react-router-dom';
import Phonebook from './phonebook/Phonebook.jsx';
import { Navigation } from './navigation/Navigation.jsx';
import { Homepage } from './homepage/Homepage.jsx';
import { RegisterPage } from './registerPage/RegisterPage.jsx';
import { LoginPage } from './loginPage/loginPage.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/operations.js';
import { RestrictedRoute } from './RestrictedRoute.js';
import { PrivateRoute } from './PrivateRoute.js';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Homepage />} />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<Phonebook />} />
          }
        />
      </Route>
    </Routes>
  );
};
