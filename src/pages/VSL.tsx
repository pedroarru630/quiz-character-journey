
import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const VSL = () => {
  const [urgencyCount, setUrgencyCount] = useState(47);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // 5 minutes = 300 seconds = 300,000 milliseconds
    const totalDuration = 300000;
    const updateInterval = 100; // Update every 100ms for smooth animation
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (updateInterval / totalDuration) * 100;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setPercentage(Math.round(progress));
  }, [progress]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Spotify logo and earnings */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#292929' }}>
        <img 
          src="/lovable-uploads/1cc76a91-706e-4d83-b1ff-759f4dedabee.png" 
          alt="Spotify" 
          className="h-8"
        />
        <div className="text-green-400 font-bold text-lg">
          U$11.61
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Urgency Alert */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-white font-bold text-lg">🔥 APENAS {urgencyCount} VAGAS</span>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Vagas sendo preenchidas durante o vídeo...
          </p>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white text-sm font-semibold">
            {percentage}% das vagas já foram preenchidas
          </p>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Validação de Segurança
          </h1>
          <p className="text-gray-300 text-lg">
            Assista ao vídeo abaixo para entender como verificar<br />
            sua conta e receber seu dinheiro imediatamente.
          </p>
        </div>

        {/* Video Container */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              {/* Video placeholder - replace with actual video */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-l-8 border-r-0 border-t-6 border-b-6 border-l-black border-t-transparent border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-white text-lg font-semibold">
                    Vídeo de Validação de Segurança
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Clique para assistir e validar sua conta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Spotify Brasil 2023 - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VSL;
