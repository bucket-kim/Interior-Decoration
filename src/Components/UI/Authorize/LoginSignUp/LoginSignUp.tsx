import { Lock, Mail } from 'lucide-react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import LoginSignUpStyleContainer from './LoginSignUpStyleContainer';

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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      console.log(`Sign up data: `, formData);
    } else {
      console.log('Login Data: ', {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <LoginSignUpStyleContainer>
      <div className="signin-container">
        <button onClick={handleCloseClick}>x</button>
        <form onSubmit={handleFormSubmit}>
          {isSignUp && (
            <>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          )}
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src="/api/placeholder/20/20"
                alt="Google"
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src="/api/placeholder/20/20"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src="/api/placeholder/20/20"
                alt="Apple"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </LoginSignUpStyleContainer>
  );
};

export default LoginSignUp;
