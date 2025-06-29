import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthTransition = ({ children, SignUpComponent }) => {
  const [animate, setAnimate] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setShowSignUp(true);
    }, 600); // Duration should match the CSS transition
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Red and yellow geometric background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 z-0" style={{
        background: '#F06273',
        clipPath: 'polygon(100% 0, 0 40%, 100% 100%)'
      }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 z-0" style={{
        background: '#FF8A65',
        clipPath: 'polygon(0 100%, 100% 60%, 0 0)'
      }}></div>
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden relative" style={{ minHeight: 600 }}>
        {/* Left Side - Login */}
        <div className="w-1/2 p-10 flex flex-col justify-center z-10">
          {children}
        </div>
        {/* Right Side - Animated Green Panel */}
        <div
          className={`w-1/2 bg-teal-400 flex flex-col items-center justify-center p-10 relative transition-all duration-700 ease-in
            ${animate ? '-translate-x-full opacity-1' : 'translate-x-0 opacity-100'}${showSignUp ? ' z-20' : ''}`}
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">{showSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
          <p className="text-white mb-6 text-center  w-[78%] p-3 rounded-lg">
            {showSignUp ? 'To keep connected with us please login with your personal info' : 'Enter your personal details and start journey with us'}
          </p>
          <button
            onClick={showSignUp ? () => window.location.reload() : handleSignUpClick}
            className="border border-white text-white px-8 py-2 rounded-full font-semibold hover:bg-white hover:text-teal-500 transition"
            disabled={animate && !showSignUp}
          >
            {showSignUp ? 'SIGN IN' : 'SIGN UP'}
          </button>
          {/* Decorative shapes */}
          <div className="absolute bottom-0 left-0 w-32 h-32  rounded-full -mb-16 -ml-16 opacity-70"></div>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-tr-xl -mt-16 -mr-16 opacity-70"></div>
        </div>
        {/* Right Side - Sign Up Form (after animation) */}
        {showSignUp && (
          <div
            className="w-1/2 absolute right-0 top-0 h-full bg-white flex flex-col justify-center z-30"
            style={{
              animation: 'fadeSlideIn 0.7s cubic-bezier(0.4,0,0.2,1)',
              opacity: 1,
              transform: 'translateX(0)'
            }}
          >
            {SignUpComponent ? <SignUpComponent /> : <div className="text-center">Sign Up Form</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTransition; 