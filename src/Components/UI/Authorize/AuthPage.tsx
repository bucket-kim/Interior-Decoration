import { MouseEvent, useState } from 'react';
import LoginSignUp from './LoginSignUp/LoginSignUp';

const AuthPage = () => {
  const [loginClick, setLoginClick] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleLoginClick = (e: MouseEvent) => {
    e.preventDefault();
    setLoginClick(true);
  };

  return (
    <div>
      {isSignUp ? (
        <div className="relative">
          <h2>Hi, {name}!</h2>
        </div>
      ) : (
        <button onClick={handleLoginClick}>Login / Sign up</button>
      )}
      {loginClick && <LoginSignUp setLoginClick={setLoginClick} />}
    </div>
  );
};

export default AuthPage;
