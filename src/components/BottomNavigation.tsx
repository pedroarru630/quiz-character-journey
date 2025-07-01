
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, DollarSign, HelpCircle } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      icon: DollarSign,
      label: 'Saque',
      path: '/withdraw',
      isActive: location.pathname === '/withdraw'
    },
    {
      icon: HelpCircle,
      label: 'FAQ',
      path: '/faq',
      isActive: location.pathname === '/faq'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-700" style={{ backgroundColor: '#292929' }}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 min-w-0 ${
                item.isActive ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
