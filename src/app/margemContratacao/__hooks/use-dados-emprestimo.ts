import { create } from 'zustand';

export const useDadosEmprestimo = create((set) => ({
  cpf: '',
  matricula: '',
  margemTotal: 0,
  margemDisponivel: 0,
  vinculo: '',
  nome: '',
  
  salvarDados(dados) {
    console.log({ dados });
    set((state) => ({ ...state, ...dados }));
  },

  preencherDados(margemContratacao) {
    set((state) => ({
      margemTotal: margemContratacao.margemTotal,
      margemDisponivel: margemContratacao.margemDisponivel,
      cpf: margemContratacao.cpf,
      matricula: margemContratacao.matricula,
    }));
  }
}));
