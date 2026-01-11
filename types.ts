
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  createdAt: string;
}

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
  image?: string; // base64 data
  sources?: { title: string; uri: string }[];
}
