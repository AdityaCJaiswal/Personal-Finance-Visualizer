import { Wallet, TrendingUp, BarChart3, PieChart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  activeView?: 'dashboard' | 'analytics';
  onViewChange?: (view: 'dashboard' | 'analytics') => void;
}

export function Navbar({ activeView = 'dashboard', onViewChange }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FinanceFlow
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Personal Finance Tracker</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange?.('dashboard')}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                activeView === 'dashboard' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Track</span>
            </Button>
            
            <Button
              variant={activeView === 'analytics' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange?.('analytics')}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                activeView === 'analytics' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span className="text-sm font-medium">Analyze</span>
            </Button>
            
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center ml-4">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}