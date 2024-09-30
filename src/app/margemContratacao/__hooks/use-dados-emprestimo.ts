import {create} from 'zustand';

interface Store {
  cpf: string;
  nome: string;
  matricula: string | null;
  vinculo: string;
  margemDisponivel: number | null;
  salvarDados: (dados: Partial<Store>) => void;
}

const useDadosEmprestimo = create<Store>((set) => ({
  cpf: '',
  nome: '',
  matricula: null,
  vinculo: '',
  margemDisponivel: null,
  salvarDados: (dados) => set((state) => ({ ...state, ...dados })),
}));

export default useDadosEmprestimo;
