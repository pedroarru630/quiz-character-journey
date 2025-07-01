
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock, AlertTriangle, Check } from 'lucide-react';

interface SecurityValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
  dollarRate: number;
}

const SecurityValidationModal = ({ isOpen, onClose, onValidate, dollarRate }: SecurityValidationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md p-0">
        <div className="p-6">
          {/* Header with dollar rate */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Cotação do dólar hoje:</p>
            <p className="text-green-400 font-bold text-lg">R${dollarRate.toFixed(2)}</p>
          </div>

          {/* Lock and Spotify connection visual */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <div className="w-16 border-t-2 border-dashed border-green-500 mx-2"></div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">S</span>
              </div>
              <span className="ml-2 text-green-400 font-bold">Spotify</span>
            </div>
          </div>

          {/* Security Validation Title */}
          <h2 className="text-xl font-bold mb-4 text-center">Validação de Segurança</h2>

          {/* Warning message */}
          <div className="flex items-start mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              Para liberar seu saque, é necessário fazer uma validação de segurança.
            </p>
          </div>

          {/* Security info */}
          <div className="flex items-start mb-4">
            <Lock className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              Isso protege sua conta contra fraudes e garante que só você receba.
            </p>
          </div>

          {/* Benefits list */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-gray-300 text-sm">O valor da validação é 100% reembolsado.</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-gray-300 text-sm">Processo rápido e seguro.</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-gray-300 text-sm">Saque liberado na hora após validar.</span>
            </div>
          </div>

          {/* Warning at bottom */}
          <div className="flex items-start mb-6">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              Sem validar, o sistema bloqueia seu saque por segurança.
            </p>
          </div>

          {/* Validate button */}
          <Button
            onClick={onValidate}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg text-base"
          >
            VERIFICAR CONTA
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityValidationModal;
