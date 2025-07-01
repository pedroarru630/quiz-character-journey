
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuizLayout from '@/components/QuizLayout';

const Result = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 59 * 60 + 54); // 23:59:54 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <QuizLayout showProgress={false}>
      <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
        {/* Success Icon with Glow Effect */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-8 h-8 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-white">
          Parabéns!
        </h1>
        
        <p className="text-gray-300 text-lg mb-8">
          Você concluiu todas as avaliações.
        </p>
        
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4">
            Volte em:
          </p>
          <div className="text-green-400 text-3xl font-bold mb-8">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <Button
          onClick={() => navigate('/withdraw')}
          className="w-full max-w-sm bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-2"
        >
          <span>💳</span>
          REALIZAR SAQUE
        </Button>
      </div>
    </QuizLayout>
  );
};

export default Result;
