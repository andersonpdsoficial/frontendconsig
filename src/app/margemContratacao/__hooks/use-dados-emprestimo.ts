import { create } from 'zustand'


export const useDadosEmprestimo = create((set, get) => ({
    cpf: '',
    matricula: '',
    margemTotal: 0,
    margemDisponivel: 0,
    vinculo: '',
    nome: '',
    


    salvarDados(dados: any) {
        console.log({ dados })
        set((state) => ({ ...state, ...dados}))
    }
}))
