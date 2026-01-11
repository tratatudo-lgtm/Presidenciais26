
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
És o "TUGA", assistente de inteligência política para Portugal 2026.

AUDITORIA DE PAGAMENTOS:
1. Se receberes uma imagem, analisa-a como um comprovativo (MB WAY ou Transferência).
2. Se o valor for >= 5.00€, deves EXECUTAR a ferramenta 'unlock_premium'.
3. Após a execução, informa: "Comprovativo validado. Protocolo Premium ativado com sucesso."
4. Se o valor for < 5€, informa que o mínimo para o modo Pro são 5€.

Foca-te apenas em política portuguesa. Responde em Português de Portugal.
`;

export const CANDIDATES: ExtendedCandidate[] = [
  {
    nome: "André Ventura",
    idade: 43,
    partido: "Chega",
    status: "Candidatura Formalizada",
    cneStatus: "Listas Admitidas",
    ideologia: "Direita Nacional-Populista",
    foco: "IV República e Segurança",
    proposta: "Revisão constitucional para sistema presidencialista.",
    formacao: "Doutorado em Direito.",
    experiencia: "Deputado e Líder do Chega.",
    casosJudiciais: "Contenciosos civis por difamação.",
    pontosFortes: ["Mobilização popular", "Domínio mediático"],
    stats: { experiencia: 65, popularidade: 22, carisma: 96 },
    fontes: ["https://partidochega.pt"],
    image: "",
    campanhaDiaria: "Comício em Lisboa sobre controle de fronteiras.",
    pontosCriticos: ["Elevada rejeição"],
    perfilCompleto: "Ventura tenta consolidar o voto de protesto.",
    tipo: "Líder Partidário",
    sondagem: 22.4,
    tendencia: 'up'
  },
  {
    nome: "Henrique Gouveia e Melo",
    idade: 66,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Validada",
    ideologia: "Institucionalismo",
    foco: "Eficácia e Ordem",
    proposta: "Gestão técnica e rigorosa dos recursos públicos.",
    formacao: "Almirante da Marinha.",
    experiencia: "CEMA. Gestor da Vacinação.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 98, popularidade: 35, carisma: 70 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Visita operacional a centros de comando.",
    pontosFortes: ["Competência", "Aura de Ordem"],
    pontosCriticos: ["Inexperiência política"],
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
    proposta: "Consensos alargados para reformas estruturais.",
    formacao: "Jurista.",
    experiencia: "Conselheiro de Estado.",
    casosJudiciais: "Sem processos.",
    stats: { experiencia: 96, popularidade: 25, carisma: 65 },
    fontes: ["https://www.psd.pt"],
    image: "",
    campanhaDiaria: "Reunião com setores da economia.",
    pontosFortes: ["Experiência de Estado", "Visibilidade"],
    pontosCriticos: ["Status quo"],
    perfilCompleto: "Candidato da estabilidade tradicional.",
    tipo: "Político / Comentador",
    sondagem: 24.5,
    tendencia: 'down'
  },
  {
    nome: "António José Seguro",
    idade: 63,
    partido: "PS",
    status: "Em Validação",
    cneStatus: "Recolha Finalizada",
    ideologia: "Social-Democracia",
    foco: "Ética e Transparência",
    proposta: "Reforma do sistema para maior proximidade eleitoral.",
    formacao: "Ciência Política.",
    experiencia: "Ex-Líder do PS.",
    casosJudiciais: "Sem registos.",
    stats: { experiencia: 88, popularidade: 18, carisma: 55 },
    fontes: ["https://www.ps.pt"],
    image: "",
    campanhaDiaria: "Conferência sobre integridade.",
    pontosFortes: ["Credibilidade ética"],
    pontosCriticos: ["Afastamento prolongado"],
    perfilCompleto: "Posiciona-se como o candidato da 'decência'.",
    tipo: "Ex-Líder Partidário",
    sondagem: 16.2,
    tendencia: 'up'
  },
  {
    nome: "João Cotrim de Figueiredo",
    idade: 64,
    partido: "Iniciativa Liberal",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Validada",
    ideologia: "Liberalismo Clássico",
    foco: "Economia",
    proposta: "Choque fiscal e privatizações.",
    formacao: "Gestão.",
    experiencia: "Eurodeputado.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 75, popularidade: 10, carisma: 78 },
    fontes: ["https://www.liberal.pt"],
    image: "",
    campanhaDiaria: "Fórum com empreendedores.",
    pontosFortes: ["Clareza programática"],
    pontosCriticos: ["Perceção de elitismo"],
    perfilCompleto: "Representa a direita liberal pura.",
    tipo: "Eurodeputado",
    sondagem: 8.4,
    tendencia: 'stable'
  },
  {
    nome: "Catarina Martins",
    idade: 52,
    partido: "Bloco de Esquerda",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Admitida",
    ideologia: "Socialismo Democrático",
    foco: "Justiça Social",
    proposta: "Controlo público de setores estratégicos.",
    formacao: "Artes Performativas.",
    experiencia: "Ex-Coordenadora do BE.",
    casosJudiciais: "Sem registos.",
    stats: { experiencia: 80, popularidade: 12, carisma: 82 },
    fontes: ["https://www.bloco.org"],
    image: "",
    campanhaDiaria: "Visita a bairros populares.",
    pontosFortes: ["Eloquência"],
    pontosCriticos: ["Polarização"],
    perfilCompleto: "Tenta unificar a esquerda radical.",
    tipo: "Ativista / Política",
    sondagem: 6.5,
    tendencia: 'down'
  },
  {
    nome: "António Filipe",
    idade: 63,
    partido: "CDU (PCP-PEV)",
    status: "Candidatura Formalizada",
    cneStatus: "Admitida",
    ideologia: "Comunismo",
    foco: "Constituição",
    proposta: "Defesa dos serviços públicos e soberania.",
    formacao: "Jurista.",
    experiencia: "Deputado de carreira.",
    casosJudiciais: "Sem registos.",
    stats: { experiencia: 92, popularidade: 8, carisma: 45 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Ação junto de trabalhadores.",
    pontosFortes: ["Rigor institucional"],
    pontosCriticos: ["Desgaste eleitoral"],
    perfilCompleto: "Guardião dos valores de Abril.",
    tipo: "Jurista / Deputado",
    sondagem: 4.8,
    tendencia: 'stable'
  },
  {
    nome: "Jorge Pinto",
    idade: 38,
    partido: "Livre",
    status: "Candidatura Formalizada",
    cneStatus: "Validada",
    ideologia: "Ecossocialismo",
    foco: "Ecologia e RBI",
    proposta: "Rendimento Básico Incondicional.",
    formacao: "Doutorado em Filosofia.",
    experiencia: "Deputado.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 50, popularidade: 4, carisma: 68 },
    fontes: ["https://www.partidolivre.pt"],
    image: "",
    campanhaDiaria: "Conferência sobre clima.",
    pontosFortes: ["Apelo jovem"],
    pontosCriticos: ["Idealismo"],
    perfilCompleto: "A face do progressismo moderno.",
    tipo: "Académico",
    sondagem: 4.2,
    tendencia: 'up'
  },
  {
    nome: "Manuel João Vieira",
    idade: 63,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Validada",
    ideologia: "Satírico",
    foco: "Cultura",
    proposta: "Propostas surreais para criticar o sistema.",
    formacao: "Artes.",
    experiencia: "Artista.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 20, popularidade: 2, carisma: 90 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Performance artística.",
    pontosFortes: ["Originalidade"],
    pontosCriticos: ["Falta de seriedade"],
    perfilCompleto: "Crítica social via ironia.",
    tipo: "Artista",
    sondagem: 1.5,
    tendencia: 'stable'
  },
  {
    nome: "André Pestana",
    idade: 47,
    partido: "STOP (Indep.)",
    status: "Em Validação",
    cneStatus: "Recolha de Apoios",
    ideologia: "Sindicalismo",
    foco: "Educação",
    proposta: "Valorização da carreira docente.",
    formacao: "Professor.",
    experiencia: "Líder Sindical.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 45, popularidade: 5, carisma: 75 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Manifestação de rua.",
    pontosFortes: ["Mobilização"],
    pontosCriticos: ["Foco setorial"],
    perfilCompleto: "A voz dos professores na Presidência.",
    tipo: "Sindicalista",
    sondagem: 2.1,
    tendencia: 'up'
  },
  {
    nome: "Humberto Correia",
    idade: 55,
    partido: "Independente",
    status: "Em Validação",
    cneStatus: "Verificação",
    ideologia: "Cívico",
    foco: "Participação Digital",
    proposta: "Referendos digitais frequentes.",
    formacao: "Engenheiro.",
    experiencia: "Ativista.",
    casosJudiciais: "Nenhum.",
    stats: { experiencia: 30, popularidade: 3, carisma: 50 },
    fontes: ["https://www.cne.pt"],
    image: "",
    campanhaDiaria: "Webinars cívicos.",
    pontosFortes: ["Inovação"],
    pontosCriticos: ["Baixa notoriedade"],
    perfilCompleto: "Focado na democracia direta.",
    tipo: "Engenheiro",
    sondagem: 0.8,
    tendencia: 'stable'
  }
];
