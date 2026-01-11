
export interface Candidate {
  nome: string;
  idade: number;
  partido: string;
  proposta: string;
  formacao: string;
  experiencia: string;
  casosJudiciais: string;
  fontes: string[];
  image: string;
  campanhaDiaria: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; uri: string }[];
}
