
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuizLayout from '@/components/QuizLayout';
import { useQuizState } from '@/hooks/useQuizState';

const Index = () => {
  const navigate = useNavigate();
  const { quizState, isLoaded } = useQuizState();
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (isLoaded && quizState.hasStarted) {
      setShowContinue(true);
    }
  }, [isLoaded, quizState.hasStarted]);

  const handleStartNew = () => {
    navigate('/start');
  };

  const handleContinue = () => {
    navigate('/quiz');
  };

  if (!isLoaded) {
    return (
      <QuizLayout showProgress={false}>
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-6"></div>
            <div className="h-6 bg-gray-700 rounded mb-8"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </QuizLayout>
    );
  }

  return (
    <QuizLayout showProgress={false}>
      <div className="text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Quiz dos Artistas
          </h1>
          
          <p className="text-gray-300 text-lg mb-8">
            Descubra qual artista combina mais com você e ganhe recompensas!
          </p>
        </div>
        
        <div className="space-y-4">
          {showContinue && (
            <Button
              onClick={handleContinue}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Continuar Quiz (Artista {quizState.currentArtistIndex + 1}/4)
            </Button>
          )}
          
          <Button
            onClick={handleStartNew}
            className={`w-full ${showContinue ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-green-500 hover:bg-green-600 text-black'} font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105`}
          >
            {showContinue ? 'Começar Novo Quiz' : 'Começar Quiz'}
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
};

export default Index;
