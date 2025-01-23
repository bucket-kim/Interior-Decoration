import { MouseEvent, useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import LoginSignUp from './LoginSignUp/LoginSignUp';

const AuthPage = () => {
  const { token, user, logout } = useAuth();
  const [loginClick, setLoginClick] = useState(false);

  const handleLoginClick = (e: MouseEvent) => {
    e.preventDefault();
    setLoginClick(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  useEffect(() => {
    console.log(token, user);
  }, []);

  return (
    <div>
      {user ? (
        <div className="relative">
          <h2>Hi, {user.firstName}!</h2>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLoginClick}>Login / Sign up</button>
      )}
      {loginClick && <LoginSignUp setLoginClick={setLoginClick} />}
    </div>
  );
};

export default AuthPage;
