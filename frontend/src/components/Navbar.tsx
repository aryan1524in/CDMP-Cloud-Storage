import React from 'react';
import { FileText, LogOut, User, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  user: { name: string; email: string; isVerified: boolean } | null;
  onLogout: () => void;
  onShowSignIn?: () => void;
  onShowLogIn?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onShowSignIn, onShowLogIn }) => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={onShowSignIn}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
              <button
                onClick={onShowLogIn}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-sm font-medium">Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;