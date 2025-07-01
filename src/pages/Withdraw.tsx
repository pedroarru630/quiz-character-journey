
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
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
  const dollarRate = 5.60;
  const realValue = availableBalance * dollarRate;
  const minimumWithdrawal = 5;

  // Set withdrawal amount to full balance on component mount
  useEffect(() => {
    setFormData(prev => ({ ...prev, amount: availableBalance.toString() }));
  }, [availableBalance]);

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
    
    if (selectedMethod === 'cpf') {
      value = formatOnlyNumbers(value).slice(0, 11);
    }
    
    setFormData({ ...formData, pixKey: value });
    
    if (errors.pixKey) {
      setErrors({ ...errors, pixKey: '' });
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatOnlyNumbers(e.target.value).slice(0, 11);
    setFormData({ ...formData, whatsapp: value });
    
    if (errors.whatsapp) {
      setErrors({ ...errors, whatsapp: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check minimum withdrawal amount
    if (availableBalance < minimumWithdrawal) {
      return;
    }
    
    const pixKeyError = validatePixKey(formData.pixKey);
    const phoneError = validatePhoneNumber(formData.whatsapp);
    
    if (pixKeyError || phoneError) {
      setErrors({
        pixKey: pixKeyError,
        whatsapp: phoneError
      });
      return;
    }
    
    setShowModal(true);
  };

  const handleValidation = () => {
    console.log('Validation process started');
    setShowModal(false);
  };

  const isWithdrawalDisabled = availableBalance < minimumWithdrawal;

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
          {isWithdrawalDisabled && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mt-4">
              <p className="text-red-400 text-sm">
                Saldo mínimo para saque: U$5.00
              </p>
            </div>
          )}
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
              className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-400 placeholder-gray-400 cursor-not-allowed"
              readOnly
            />
            <p className="text-xs text-gray-400 mt-1">
              Valor equivalente em Reais: R${((parseFloat(formData.amount) || 0) * dollarRate).toFixed(2)}
            </p>
            <p className="text-xs text-green-400 mt-1">
              Saque automático do saldo completo
            </p>
          </div>

          <Button
            type="submit"
            disabled={isWithdrawalDisabled}
            className={`w-full font-bold py-4 rounded-lg text-lg mt-6 ${
              isWithdrawalDisabled 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-black'
            }`}
          >
            {isWithdrawalDisabled ? 'Saldo Insuficiente' : 'Solicitar Saque'}
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
