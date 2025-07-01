
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const VSL = () => {
  const [urgencyCount, setUrgencyCount] = useState(47);

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
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-4 mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="w-6 h-6 text-white mr-2" />
            <span className="text-white font-bold text-lg">🔥 APENAS {urgencyCount} VAGAS</span>
          </div>
          <p className="text-white text-sm">
            Vagas sendo preenchidas durante o vídeo...
          </p>
          <div className="w-full bg-red-800 rounded-full h-2 mt-3">
            <div 
              className="bg-red-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${100 - (urgencyCount / 100 * 76)}%` }}
            ></div>
          </div>
          <p className="text-white text-xs mt-1">
            {100 - urgencyCount}% das vagas já foram preenchidas
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
