
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
  sondagem: number; // Intenção de voto em %
  tendencia: 'up' | 'down' | 'stable';
}

export const SYSTEM_PROMPT = `
És o "TUGA", um assistente especializado exclusivamente nas eleições presidenciais portuguesas de 2026.
DATA DO SISTEMA: Janeiro de 2026.

REGRAS DE OPERAÇÃO:
1. IDENTIDADE: Responde como o Tuga, um analista político sénior, direto e patriota, mas rigorosamente imparcial.
2. ESCOPO: Foca-te apenas em 2026. Candidatos, sondagens, propostas e o futuro de Portugal.
3. RIGOR: Baseia-te nos dossiers auditados fornecidos no sistema.
`;

export const CANDIDATES: ExtendedCandidate[] = [
  {
    nome: "André Ventura",
    idade: 43,
    partido: "Chega",
    status: "Candidatura Formalizada",
    cneStatus: "Listas Admitidas em 2026",
    ideologia: "Direita Nacional-Populista",
    foco: "IV República e Segurança",
    proposta: "Revisão constitucional para sistema presidencialista e endurecimento das penas criminais.",
    formacao: "Doutorado em Direito.",
    experiencia: "Deputado e Líder do Chega.",
    casosJudiciais: "Contenciosos civis por difamação.",
    pontosFortes: ["Mobilização popular", "Domínio mediático"],
    stats: { experiencia: 65, popularidade: 22, carisma: 96 },
    fontes: ["https://partidochega.pt"],
    image: "",
    campanhaDiaria: "Comício em Lisboa com foco no controle de fronteiras.",
    pontosCriticos: ["Elevada rejeição", "Isolamento partidário"],
    perfilCompleto: "Ventura tenta consolidar o voto de protesto contra o sistema estabelecido.",
    tipo: "Deputado e líder partidário",
    sondagem: 22.4,
    tendencia: 'up'
  },
  {
    nome: "António Filipe",
    idade: 63,
    partido: "CDU (PCP-PEV)",
    status: "Candidatura Formalizada",
    cneStatus: "Assinaturas Verificadas pelo TC",
    ideologia: "Comunismo / Esquerda Unitária",
    foco: "Constituição e Direitos Laborais",
    proposta: "Defesa intransigente do serviço público e da soberania nacional.",
    formacao: "Jurista e Professor Universitário.",
    experiencia: "Deputado de longa data.",
    casosJudiciais: "Sem registos.",
    pontosFortes: ["Rigor institucional", "Coerência ideológica"],
    stats: { experiencia: 92, popularidade: 8, carisma: 45 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Encontro com sindicatos da função pública.",
    pontosCriticos: ["Envelhecimento do eleitorado", "Desgaste da CDU"],
    perfilCompleto: "O candidato da CDU surge como o guardião dos valores de Abril.",
    tipo: "Deputado comunista",
    sondagem: 4.8,
    tendencia: 'stable'
  },
  {
    nome: "António José Seguro",
    idade: 63,
    partido: "PS",
    status: "Em Validação",
    cneStatus: "Processo de Recolha Finalizado",
    ideologia: "Social-Democracia / Ética",
    foco: "Transparência e Unidade Nacional",
    proposta: "Reforma do sistema político para maior proximidade com eleitores.",
    formacao: "Ciência Política.",
    experiencia: "Ex-Secretário-Geral do PS. Ministro.",
    casosJudiciais: "Sem registos.",
    pontosFortes: ["Credibilidade ética", "Capacidade de diálogo"],
    stats: { experiencia: 88, popularidade: 18, carisma: 55 },
    fontes: ["https://www.ps.pt"],
    image: "",
    campanhaDiaria: "Conferência sobre a integridade nas instituições públicas.",
    pontosCriticos: ["Afastamento prolongado", "Divisões internas"],
    perfilCompleto: "Seguro posiciona-se como o candidato da 'decência'.",
    tipo: "Ex-líder do PS",
    sondagem: 16.2,
    tendencia: 'up'
  },
  {
    nome: "Catarina Martins",
    idade: 52,
    partido: "Bloco de Esquerda",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Admitida",
    ideologia: "Socialismo Democrático",
    foco: "Justiça Social e Ecologia",
    proposta: "Controlo público de setores estratégicos e habitação.",
    formacao: "Linguística e Artes Performativas.",
    experiencia: "Ex-Coordenadora do BE.",
    casosJudiciais: "Sem registos.",
    pontosFortes: ["Eloquência", "Base militante"],
    stats: { experiencia: 80, popularidade: 12, carisma: 82 },
    fontes: ["https://www.bloco.org"],
    image: "",
    campanhaDiaria: "Visita a bairros carenciados.",
    pontosCriticos: ["Polarização", "Desgaste"],
    perfilCompleto: "Martins tenta unificar a esquerda radical.",
    tipo: "Ex-coordenadora do BE",
    sondagem: 6.5,
    tendencia: 'down'
  },
  {
    nome: "Henrique Gouveia e Melo",
    idade: 66,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Validada",
    ideologia: "Institucionalismo / Ordem",
    foco: "Eficácia e Segurança",
    proposta: "Gestão técnica e rigorosa dos recursos públicos.",
    formacao: "Almirante da Marinha.",
    experiencia: "CEMA. Gestor da Vacinação.",
    casosJudiciais: "Nenhum registo.",
    pontosFortes: ["Favorito nas sondagens", "Aura de competência"],
    stats: { experiencia: 98, popularidade: 35, carisma: 70 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Visita operacional a centros de comando.",
    pontosCriticos: ["Perfil autoritário", "Inexperiência partidária"],
    perfilCompleto: "O Almirante capitaliza o desejo de ordem.",
    tipo: "Almirante e gestor da vacinação COVID-19",
    sondagem: 32.1,
    tendencia: 'up'
  },
  {
    nome: "João Cotrim de Figueiredo",
    idade: 64,
    partido: "Iniciativa Liberal",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Validada",
    ideologia: "Liberalismo Clássico",
    foco: "Crescimento Económico",
    proposta: "Choque fiscal e privatização.",
    formacao: "Gestão e Economia.",
    experiencia: "Eurodeputado. Ex-Presidente da IL.",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Clareza de propostas", "Apoio privado"],
    stats: { experiencia: 75, popularidade: 10, carisma: 78 },
    fontes: ["https://www.liberal.pt"],
    image: "",
    campanhaDiaria: "Fórum com jovens empreendedores.",
    pontosCriticos: ["Perceção de elitismo", "Foco restrito"],
    perfilCompleto: "Cotrim representa o liberalismo puro.",
    tipo: "Ex-deputado liberal",
    sondagem: 8.4,
    tendencia: 'stable'
  },
  {
    nome: "Luís Marques Mendes",
    idade: 68,
    partido: "PSD",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Ratificada",
    ideologia: "Centro-Direita",
    foco: "Estabilidade Institucional",
    proposta: "Consensos políticos alargados.",
    formacao: "Jurista.",
    experiencia: "Conselheiro de Estado.",
    casosJudiciais: "Sem processos.",
    pontosFortes: ["Projeção nacional", "Experiência de Estado"],
    stats: { experiencia: 96, popularidade: 25, carisma: 65 },
    fontes: ["https://www.psd.pt"],
    image: "",
    campanhaDiaria: "Almoço com associações empresariais.",
    pontosCriticos: ["Conotado com o status quo"],
    perfilCompleto: "O candidato da estabilidade tradicional.",
    tipo: "Ex-líder do PSD e comentador",
    sondagem: 24.5,
    tendencia: 'down'
  }
];
