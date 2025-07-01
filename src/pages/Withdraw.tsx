
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import QuizLayout from '@/components/QuizLayout';
import { CreditCard, Phone, Mail, RotateCcw } from 'lucide-react';
import SecurityValidationModal from '@/components/SecurityValidationModal';
import { validateCPF, validatePhone, formatOnlyNumbers } from '@/utils/validation';

const Withdraw = () => {
  const [selectedMethod, setSelectedMethod] = useState('cpf');
  const [formData, setFormData] = useState({
    pixKey: '',
    fullName: '',
    whatsapp: '',
    amount: ''
  });
  const [errors, setErrors] = useState({
    pixKey: '',
    whatsapp: ''
  });
  const [showModal, setShowModal] = useState(false);

  const availableBalance = parseFloat(localStorage.getItem('totalEarnings') || '0');
  const dollarRate = 5.60; // R$5.60 per dollar
  const realValue = availableBalance * dollarRate;

  const paymentMethods = [
    { id: 'cpf', label: 'CPF', icon: CreditCard, active: true, placeholder: 'Digite seu CPF' },
    { id: 'phone', label: 'Telefone', icon: Phone, active: true, placeholder: 'Digite seu telefone' },
    { id: 'email', label: 'Email', icon: Mail, active: true, placeholder: 'Digite seu email' },
    { id: 'random', label: 'Aleatória', icon: RotateCcw, active: true, placeholder: 'Digite sua chave aleatória' }
  ];

  const getCurrentPlaceholder = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    return method ? method.placeholder : 'Digite sua chave PIX';
  };

  const validatePixKey = (value: string) => {
    if (selectedMethod === 'cpf') {
      if (!value || value.length < 11) {
        return 'CPF inválido. Por favor, verifique e tente novamente.';
      }
      if (!validateCPF(value)) {
        return 'CPF inválido. Por favor, verifique e tente novamente.';
      }
    }
    return '';
  };

  const validatePhoneNumber = (value: string) => {
    if (!value || value.length < 11) {
      return 'Número de telefone inválido. Por favor, verifique e tente novamente.';
    }
    if (!validatePhone(value)) {
      return 'Número de telefone inválido. Por favor, verifique e tente novamente.';
    }
    return '';
  };

  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // For CPF, only allow numbers and limit to 11 digits
    if (selectedMethod === 'cpf') {
      value = formatOnlyNumbers(value).slice(0, 11);
    }
    
    setFormData({ ...formData, pixKey: value });
    
    // Clear error when user starts typing
    if (errors.pixKey) {
      setErrors({ ...errors, pixKey: '' });
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 11 digits
    const value = formatOnlyNumbers(e.target.value).slice(0, 11);
    setFormData({ ...formData, whatsapp: value });
    
    // Clear error when user starts typing
    if (errors.whatsapp) {
      setErrors({ ...errors, whatsapp: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate PIX key
    const pixKeyError = validatePixKey(formData.pixKey);
    
    // Validate phone number
    const phoneError = validatePhoneNumber(formData.whatsapp);
    
    if (pixKeyError || phoneError) {
      setErrors({
        pixKey: pixKeyError,
        whatsapp: phoneError
      });
      return;
    }
    
    // If validation passes, show the security modal
    setShowModal(true);
  };

  const handleValidation = () => {
    // Handle the validation process
    console.log('Validation process started');
    setShowModal(false);
  };

  return (
    <QuizLayout showProgress={false}>
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-white mb-6">Saque</h1>
        
        <p className="text-gray-300 text-sm mb-6">
          Digite sua chave PIX e Telefone para receber o pagamento.
        </p>

        {/* Balance Display */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Saldo disponível (US$):</span>
            <span className="text-green-400 font-bold">U${availableBalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Cotação do dólar hoje:</span>
            <span className="text-green-400 font-bold">R${dollarRate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Valor em Reais (R$):</span>
            <span className="text-green-400 font-bold">R${realValue.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-4">Tipo de chave PIX</h3>
          <div className="grid grid-cols-4 gap-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => method.active && setSelectedMethod(method.id)}
                  className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
                    method.active && selectedMethod === method.id
                      ? 'bg-green-500 text-black'
                      : method.active
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!method.active}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-bold">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-white font-bold mb-2">Chave PIX</label>
            <input
              type="text"
              placeholder={getCurrentPlaceholder()}
              value={formData.pixKey}
              onChange={handlePixKeyChange}
              className={`w-full p-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 ${
                errors.pixKey ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.pixKey && (
              <p className="text-red-400 text-sm mt-1">{errors.pixKey}</p>
            )}
          </div>

          <div>
            <label className="block text-left text-white font-bold mb-2">Nome Completo</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-left text-white font-bold mb-2">Telefone (WhatsApp)</label>
            <input
              type="tel"
              placeholder="Digite seu telefone com DDD"
              value={formData.whatsapp}
              onChange={handleWhatsappChange}
              className={`w-full p-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 ${
                errors.whatsapp ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.whatsapp && (
              <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>
            )}
          </div>

          <div>
            <label className="block text-left text-white font-bold mb-2">Valor do saque (US$)</label>
            <input
              type="number"
              placeholder="U$0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              max={availableBalance}
            />
            <p className="text-xs text-gray-400 mt-1">
              Valor equivalente em Reais: R${((parseFloat(formData.amount) || 0) * dollarRate).toFixed(2)}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-lg text-lg mt-6"
          >
            Solicitar Saque
          </Button>
        </form>
      </div>

      <SecurityValidationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onValidate={handleValidation}
        dollarRate={dollarRate}
      />
    </QuizLayout>
  );
};

export default Withdraw;
