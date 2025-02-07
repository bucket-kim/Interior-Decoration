import { ChangeEvent, FC, FormEvent, useState } from 'react';
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
const API_URL = import.meta.env.VITE_BACKEND_URL;

const LoginSignUp: FC<LoginSignUpProps> = ({ setLoginClick }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UsersType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

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

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isSignUp ? '/auth/register' : '/auth/login';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      localStorage.setItem('token', data.accessToken);

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setLoginClick(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginSignUpStyleContainer>
      <div className="signin-container">
        <button onClick={handleCloseClick}>x</button>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleFormSubmit}>
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

        <SocialsAuth />

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
