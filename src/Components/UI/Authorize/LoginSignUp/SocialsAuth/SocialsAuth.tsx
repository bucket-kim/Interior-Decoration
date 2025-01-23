const SocialsAuth = () => {
  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5" />
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
          <img src="/api/placeholder/20/20" alt="Apple" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SocialsAuth;
