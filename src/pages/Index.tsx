
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import QuizLayout from '@/components/QuizLayout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <QuizLayout showProgress={false}>
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Quiz dos Artistas
          </h1>
          
          <p className="text-gray-300 text-lg mb-8">
            Descubra qual artista combina mais com você e ganhe recompensas!
          </p>
        </div>
        
        <Button
          onClick={() => navigate('/start')}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-6 rounded-full text-lg"
        >
          Começar Quiz
        </Button>
      </div>
    </QuizLayout>
  );
};

export default Index;
