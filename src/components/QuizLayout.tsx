
import { ReactNode } from 'react';
import ProgressBar from './ProgressBar';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface QuizLayoutProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
}

const QuizLayout = ({ children, currentStep = 1, totalSteps = 5, showProgress = true }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-20">
        {showProgress && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        )}
        
        {children}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default QuizLayout;
