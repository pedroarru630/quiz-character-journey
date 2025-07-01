
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import QuizLayout from '@/components/QuizLayout';

const Start = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('userEmail', email);
    }
    navigate('/quiz');
  };

  const handleSkip = () => {
    navigate('/quiz');
  };

  return (
    <QuizLayout showProgress={false}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8 text-white">
          Entre com seu email para ver os resultados do quiz e receber atualizações
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-6 rounded-full"
          >
            Continuar
          </Button>
          
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-gray-400 hover:text-white underline"
          >
            Continuar sem email
          </button>
        </form>
        
        <div className="mt-8 text-xs text-gray-500">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <a href="/terms" className="text-green-400 hover:underline">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="/privacy" className="text-green-400 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </QuizLayout>
  );
};

export default Start;
