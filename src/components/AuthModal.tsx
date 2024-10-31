import React, { useState } from 'react';
import { X, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import GoogleButton from 'react-google-button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (user: { email: string; role: 'adopter' | 'owner' }) => void;
}

export default function AuthModal({ isOpen, onClose, onAuth }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'adopter' | 'owner'>('adopter');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth({ email, role });
    onClose();
  };

  const handleGoogleAuth = () => {
    // In a real app, this would integrate with Google OAuth
    const mockGoogleUser = {
      email: 'user@gmail.com',
      role: role,
    };
    onAuth(mockGoogleUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? 'Sign in to continue to Paws & Hearts'
              : 'Join our community today'}
          </p>
        </div>

        <div className="mb-6">
          <GoogleButton
            onClick={handleGoogleAuth}
            style={{ width: '100%' }}
            label={isLogin ? 'Sign in with Google' : 'Sign up with Google'}
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">I want to</label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('adopter')}
                  className={`p-3 text-sm font-medium rounded-md ${
                    role === 'adopter'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Adopt a Pet
                </button>
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`p-3 text-sm font-medium rounded-md ${
                    role === 'owner'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  List Pets for Adoption
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center space-x-2"
          >
            {isLogin ? (
              <>
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}