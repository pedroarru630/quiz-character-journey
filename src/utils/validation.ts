
// CPF validation utility
export const validateCPF = (cpf: string): boolean => {
  // Remove any non-numeric characters and check length
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Check for invalid sequences (all same digits)
  const invalidSequences = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  
  if (invalidSequences.includes(cleanCPF)) {
    return false;
  }

  // Calculate first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Check first verification digit
  if (firstDigit !== parseInt(cleanCPF.charAt(9))) {
    return false;
  }

  // Calculate second verification digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let secondDigit = remainder < 2 ? 0 : 11 - remainder;

  // Check second verification digit
  return secondDigit === parseInt(cleanCPF.charAt(10));
};

// Phone validation utility
export const validatePhone = (phone: string): boolean => {
  // Remove any non-numeric characters and check length
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length !== 11) {
    return false;
  }

  // Check if it starts with valid DDD (area codes)
  const validDDDs = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', // São Paulo
    '21', '22', '24', // Rio de Janeiro
    '27', '28', // Espírito Santo
    '31', '32', '33', '34', '35', '37', '38', // Minas Gerais
    '41', '42', '43', '44', '45', '46', // Paraná
    '47', '48', '49', // Santa Catarina
    '51', '53', '54', '55', // Rio Grande do Sul
    '61', // Distrito Federal
    '62', '64', // Goiás
    '63', // Tocantins
    '65', '66', // Mato Grosso
    '67', // Mato Grosso do Sul
    '68', // Acre
    '69', // Rondônia
    '71', '73', '74', '75', '77', // Bahia
    '79', // Sergipe
    '81', '87', // Pernambuco
    '82', // Alagoas
    '83', // Paraíba
    '84', // Rio Grande do Norte
    '85', '88', // Ceará
    '86', '89', // Piauí
    '91', '93', '94', // Pará
    '92', '97', // Amazonas
    '95', // Roraima
    '96', // Amapá
    '98', '99' // Maranhão
  ];

  const ddd = cleanPhone.substring(0, 2);
  if (!validDDDs.includes(ddd)) {
    return false;
  }

  // Check if third digit is 9 (mobile format)
  return cleanPhone.charAt(2) === '9';
};

// Format input to only numbers
export const formatOnlyNumbers = (value: string): string => {
  return value.replace(/\D/g, '');
};
