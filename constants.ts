
import { Candidate } from './types';

export interface ExtendedCandidate extends Candidate {
  ideologia: string;
  foco: string;
  status: 'Candidatura Formalizada' | 'Em Validação' | 'Retirado';
  cneStatus: string;
  pontosFortes: string[];
  pontosCriticos: string[];
  stats: {
    experiencia: number; 
    popularidade: number; 
    carisma: number; 
  };
  perfilCompleto: string;
}

export const SYSTEM_PROMPT = `
És o "INVESTIGADOR", um assistente especializado exclusivamente nas eleições presidenciais portuguesas de 2026.
DATA DO SISTEMA: 10 de Janeiro de 2026.

REGRAS DE OURO PARA ESTA INVESTIGAÇÃO:
1. IDENTIDADE: Responde sempre como um analista político português sénior e imparcial. O teu nome é Investigador.
2. ESCOPO ESTRITO: Só podes responder a perguntas relacionadas com os candidatos de 2026, datas, propostas, regras eleitorais, debates, resultados ou contexto político dessa eleição específica.
3. RECUSA DE FORA DE ÂMBITO: Se a pergunta não for sobre as eleições presidenciais de 2026 em Portugal, deves responder exatamente: "Desculpa, só posso responder a perguntas sobre as eleições presidenciais de 2026 em Portugal."
4. RIGOR ABSOLUTO: Não alucines nomes. Se um utilizador perguntar por alguém que não é candidato real para 2026, esclarece o facto com base na realidade política.
5. CANDIDATOS ATIVOS EM 2026: 
   - Henrique Gouveia e Melo (Independente)
   - Luís Marques Mendes (Apoio PSD/CDS)
   - André Ventura (Chega)
   - Augusto Santos Silva (Apoio PS)
   - Tiago Mayan Gonçalves (Candidatura Independente/Liberal)
6. CONTEXTO PORTUGAL: O mandato de Marcelo Rebelo de Sousa está a terminar. Mantém um tom sério, analítico e focado em factos.
`;

export const CANDIDATES: ExtendedCandidate[] = [
  {
    nome: "Henrique Gouveia e Melo",
    idade: 66,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Lista de Proponentes Validada pelo TC",
    ideologia: "Institucionalismo / Ordem",
    foco: "Soberania e Reforma do Estado",
    proposta: "Reestruturação do SNS e da Proteção Civil sob um modelo de prontidão militar e eficácia operacional.",
    formacao: "Almirante da Marinha Portuguesa.",
    experiencia: "CEMA. Coordenador da Task Force de Vacinação. Representante na NATO.",
    casosJudiciais: "Nenhum registo.",
    pontosFortes: ["Líder nas sondagens de Janeiro/2026", "Imagem de isenção e competência"],
    stats: { experiencia: 98, popularidade: 34, carisma: 70 },
    fontes: ["https://www.cne.pt"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Ação de campanha no Alentejo focada na desertificação e segurança.",
    pontosCriticos: ["Falta de experiência partidária", "Perfil considerado rígido"],
    perfilCompleto: "O Almirante entra na reta final como o principal favorito, captando o voto de ordem e centro."
  },
  {
    nome: "Luís Marques Mendes",
    idade: 68,
    partido: "Apoio PSD / CDS-PP",
    status: "Candidatura Formalizada",
    cneStatus: "Candidatura Ratificada pelo Tribunal",
    ideologia: "Centro-Direita Social",
    foco: "Estabilidade Institucional",
    proposta: "Pactos de regime transversais para a Justiça e Descentralização.",
    formacao: "Jurista e Comentador Político.",
    experiencia: "Conselheiro de Estado. Ex-Líder do PSD. Ministro de vários governos.",
    casosJudiciais: "Sem processos.",
    pontosFortes: ["Conhecimento profundo do Estado", "Grande projeção mediática"],
    stats: { experiencia: 96, popularidade: 26, carisma: 64 },
    fontes: ["https://www.psd.pt"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Debate focado na estabilidade governativa e reforma judicial.",
    pontosCriticos: ["Visto como parte do sistema antigo", "Resistência na direita radical"],
    perfilCompleto: "Representa a segurança institucional e a continuidade democrática sem sobressaltos."
  },
  {
    nome: "André Ventura",
    idade: 43,
    partido: "Chega",
    status: "Candidatura Formalizada",
    cneStatus: "Listas Admitidas em 2026",
    ideologia: "Direita Nacional-Populista",
    foco: "IV República e Segurança",
    proposta: "Revisão constitucional para sistema presidencialista e prisão perpétua.",
    formacao: "Doutorado em Direito.",
    experiencia: "Deputado e Líder do Chega.",
    casosJudiciais: "Contenciosos civis por difamação.",
    pontosFortes: ["Grande mobilização popular", "Controlo das redes sociais"],
    stats: { experiencia: 65, popularidade: 20, carisma: 96 },
    fontes: ["https://partidochega.pt"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Comício em Lisboa com foco na imigração e justiça.",
    pontosCriticos: ["Elevada taxa de rejeição", "Isolamento partidário"],
    perfilCompleto: "Ventura joga todas as cartas para tentar chegar a uma segunda volta contra o 'sistema'."
  },
  {
    nome: "Augusto Santos Silva",
    idade: 69,
    partido: "Apoio PS",
    status: "Candidatura Formalizada",
    cneStatus: "Candidatura Validada pelo TC",
    ideologia: "Socialismo Democrático",
    foco: "Defesa das Instituições",
    proposta: "Blindagem do Estado Social e barreira contra movimentos iliberais.",
    formacao: "Sociólogo e Político.",
    experiencia: "Ex-Presidente da Assembleia da República. Ministro de Estado.",
    casosJudiciais: "Sem processos.",
    pontosFortes: ["Estatura de Estado", "Unificador da esquerda"],
    stats: { experiencia: 95, popularidade: 15, carisma: 60 },
    fontes: ["https://ps.pt"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Conferências universitárias sobre democracia e constituição.",
    pontosCriticos: ["Desgaste governativo do PS", "Perfil considerado elitista"],
    perfilCompleto: "O principal rosto da esquerda moderada na corrida a Belém em 2026."
  },
  {
    nome: "Tiago Mayan Gonçalves",
    idade: 48,
    partido: "Iniciativa Liberal / Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Assinaturas Verificadas",
    ideologia: "Liberalismo Clássico",
    foco: "Liberdade Individual e Fiscal",
    proposta: "Redução do peso do Estado na economia e maior escrutínio presidencial.",
    formacao: "Advogado.",
    experiencia: "Candidato Presidencial em 2021. Fundador de movimentos civis.",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Discurso ideológico coerente", "Apelo urbano e jovem"],
    stats: { experiencia: 62, popularidade: 6, carisma: 65 },
    fontes: ["https://www.cne.pt"],
    image: "https://images.unsplash.com/photo-1556157382-97dee2dcb96a?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Fóruns digitais e encontros em polos de inovação.",
    pontosCriticos: ["Baixa notoriedade fora dos grandes centros", "Dificuldade em furar o bipartidarismo"],
    perfilCompleto: "Tenta capitalizar o voto liberal que rejeita o populismo e o socialismo estatista."
  }
];
