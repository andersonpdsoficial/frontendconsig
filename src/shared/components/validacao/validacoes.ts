
export const validarCPF = (cpf: string): boolean => {
  // Lógica simplificada para validar o CPF (apenas checa se tem 11 dígitos)
  return /^\d{11}$/.test(cpf);
};

export const validarMatricula = (matricula: string): boolean => {
  // Lógica simplificada para validar a matrícula (6 a 8 dígitos)
  return /^\d{6,9}$/.test(matricula);
};

export const validarNome = (nome: string): boolean => {
  // Lógica para validar se o nome tem mais de 2 caracteres
  return nome.length > 2;
};
