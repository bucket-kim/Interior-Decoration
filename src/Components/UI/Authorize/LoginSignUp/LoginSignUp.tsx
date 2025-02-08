import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { shallow } from 'zustand/shallow';
import supabase from '../../../../context/Supabase/Supabase';
import { useGlobalState } from '../../../../State/useGlobalState';
import LoginSignUpStyleContainer from './LoginSignUpStyleContainer';
import SocialsAuth from './SocialsAuth/SocialsAuth';
import UserInput from './UserInput/UserInput';

interface LoginSignUpProps {
  // loginClick: boolean;
  setLoginClick: (args: boolean) => void;
}

interface UsersType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const LoginSignUp: FC<LoginSignUpProps> = ({ setLoginClick }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UsersType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const { setToken } = useGlobalState((state) => {
    return {
      setToken: state.setToken,
    };
  }, shallow);

  const handleCloseClick = () => {
    setLoginClick(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phone,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      if (!data.session) return;
      setToken(data.session.access_token);
      alert('please check your inbox for email verification');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
      });
      setLoginClick(false);
    }

    setIsLoading(false);
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      if (!data.session) return;
      setToken(data.session.access_token);
      console.log('successfully signed in');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
      });
      setLoginClick(false);
    }
  };

  return (
    <LoginSignUpStyleContainer>
      <div className="signin-container">
        <button onClick={handleCloseClick}>x</button>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp && (
            <>
              <UserInput
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="first name"
              />
              <UserInput
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="last name"
              />

              <UserInput
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="phone number"
              />
            </>
          )}
          <UserInput
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />

          <UserInput
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="password"
          />
          <SocialsAuth />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : isSignUp ? (
              'Sign Up'
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign up'}
          </button>
        </p>
      </div>
    </LoginSignUpStyleContainer>
  );
};

export default LoginSignUp;
