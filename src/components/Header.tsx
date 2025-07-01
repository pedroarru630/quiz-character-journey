
import { useState, useEffect } from 'react';

const Header = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    // Get earnings from localStorage or initialize
    const savedEarnings = localStorage.getItem('totalEarnings');
    if (savedEarnings) {
      setTotalEarnings(parseFloat(savedEarnings));
    }

    // Listen for storage changes to update counter
    const handleStorageChange = () => {
      const updatedEarnings = localStorage.getItem('totalEarnings');
      if (updatedEarnings) {
        setTotalEarnings(parseFloat(updatedEarnings));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    window.addEventListener('earningsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('earningsUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#292929' }}>
      <img 
        src="/lovable-uploads/838056ac-1818-4778-a4e0-d4159d61d9dc.png" 
        alt="Spotify" 
        className="h-8"
      />
      <div className="text-green-400 font-bold text-lg">
        U${totalEarnings.toFixed(2)}
      </div>
    </div>
  );
};

export default Header;
