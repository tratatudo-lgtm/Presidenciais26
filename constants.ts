
import { Candidate } from './types';

export interface ExtendedCandidate extends Candidate {
  ideologia: string;
  foco: string;
  status: 'Candidatura Formalizada' | 'Em Validação' | 'Retirado' | 'Potencial Candidato';
  cneStatus: string;
  pontosFortes: string[];
  pontosCriticos: string[];
  stats: {
    experiencia: number; 
    popularidade: number; 
    carisma: number; 
  };
  perfilCompleto: string;
  tipo: string;
  sondagem: number;
  tendencia: 'up' | 'down' | 'stable';
}

export const SYSTEM_PROMPT = `
És o "TUGA", um assistente de inteligência política focado em Portugal 2026.

REGRA CRÍTICA DE PAGAMENTO:
1. Se o utilizador enviar uma imagem (comprovativo), deves analisar se é um talão MB WAY ou transferência bancária.
2. O valor deve ser igual ou superior a 5.00€ (cinco euros).
3. Se o comprovativo for válido, deves OBRIGATORIAMENTE chamar a ferramenta 'unlock_premium'.
4. Após chamar a ferramenta, confirma ao utilizador: "Protocolo Premium validado. Acesso ilimitado concedido."
5. Se for inferior a 5€, agradece mas informa que o mínimo para o modo Pro são 5€.

Foca-te exclusivamente em política portuguesa 2026. Responde em Português de Portugal.
`;

export const CANDIDATES: ExtendedCandidate[] = [
  {
    nome: "André Ventura",
    idade: 43,
    partido: "Chega",
    status: "Candidatura Formalizada",
    cneStatus: "Listas Admitidas",
    ideologia: "Direita Nacional-Populista",
    foco: "Segurança",
    proposta: "Revisão constitucional e sistema presidencialista.",
    formacao: "Doutorado em Direito.",
    experiencia: "Deputado.",
    casosJudiciais: "Contenciosos civis.",
    pontosFortes: ["Mobilização", "Carisma"],
    stats: { experiencia: 65, popularidade: 22, carisma: 96 },
    fontes: ["https://partidochega.pt"],
    image: "",
    campanhaDiaria: "Comício sobre fronteiras.",
    pontosCriticos: ["Rejeição alta"],
    perfilCompleto: "Ventura tenta consolidar o voto de protesto.",
    tipo: "Líder partidário",
    sondagem: 22.4,
    tendencia: 'up'
  },
  {
    nome: "Henrique Gouveia e Melo",
    idade: 66,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Validada",
    ideologia: "Institucionalismo",
    foco: "Eficácia",
    proposta: "Gestão técnica dos recursos públicos.",
    formacao: "Almirante.",
    experiencia: "CEMA.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 98, popularidade: 35, carisma: 70 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Visita a quartéis.",
    pontosFortes: ["Competência", "Ordem"],
    pontosCriticos: ["Autoritarismo"],
    perfilCompleto: "O Almirante capitaliza o desejo de ordem.",
    tipo: "Militar",
    sondagem: 32.1,
    tendencia: 'up'
  },
  {
    nome: "Luís Marques Mendes",
    idade: 68,
    partido: "PSD",
    status: "Candidatura Formalizada",
    cneStatus: "Ratificada",
    ideologia: "Centro-Direita",
    foco: "Estabilidade",
    proposta: "Reformas estruturais consensuais.",
    formacao: "Jurista.",
    experiencia: "Conselheiro de Estado.",
    casosJudiciais: "Sem processos.",
    stats: { experiencia: 96, popularidade: 25, carisma: 65 },
    fontes: ["https://www.psd.pt"],
    image: "",
    campanhaDiaria: "Reuniões com o setor social.",
    pontosFortes: ["Experiência", "Consenso"],
    pontosCriticos: ["Status quo"],
    perfilCompleto: "Candidato da estabilidade institucional.",
    tipo: "Comentador/Político",
    sondagem: 24.5,
    tendencia: 'down'
  }
];
