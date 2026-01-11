
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
4. RIGOR ABSOLUTO: Não alucines nomes. Se um utilizador perguntar por alguém que não é candidato real para 2026, esclarece o facto.
5. CANDIDATOS ATIVOS EM 2026 (Auditáveis): 
   - André Ventura (Chega)
   - António Filipe (CDU)
   - António José Seguro (PS)
   - Catarina Martins (BE)
   - Henrique Gouveia e Melo (Independente)
   - Humberto Correia (Independente)
   - João Cotrim de Figueiredo (IL)
   - Jorge Pinto (Livre)
   - Luís Marques Mendes (PSD)
   - Manuel João Vieira (Independente)
   - André Pestana (Independente)
6. CONTEXTO PORTUGAL: O mandato de Marcelo Rebelo de Sousa termina em Março de 2026. Mantém um tom sério, analítico e focado em factos.
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
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Comício em Lisboa com foco no controle de fronteiras.",
    pontosCriticos: ["Elevada rejeição", "Isolamento partidário"],
    perfilCompleto: "Ventura tenta consolidar o voto de protesto contra o sistema estabelecido."
  },
  {
    nome: "António Filipe",
    idade: 63,
    partido: "CDU (PCP-PEV)",
    status: "Candidatura Formalizada",
    cneStatus: "Assinaturas Verificadas pelo TC",
    ideologia: "Comunismo / Esquerda Unitária",
    foco: "Constituição e Direitos Laborais",
    proposta: "Defesa intransigente do serviço público e da soberania nacional face a imposições externas.",
    formacao: "Jurista e Professor Universitário.",
    experiencia: "Deputado de longa data. Vice-Presidente da Assembleia da República.",
    casosJudiciais: "Sem registos.",
    pontosFortes: ["Rigor institucional", "Coerência ideológica"],
    stats: { experiencia: 92, popularidade: 8, carisma: 45 },
    fontes: ["https://www.pcp.pt"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Encontro com sindicatos da função pública.",
    pontosCriticos: ["Dificuldade em atrair voto jovem", "Discurso focado em nicho"],
    perfilCompleto: "O candidato da CDU surge como o guardião dos valores de Abril e da legalidade constitucional."
  },
  {
    nome: "António José Seguro",
    idade: 63,
    partido: "PS",
    status: "Em Validação",
    cneStatus: "Processo de Recolha Finalizado",
    ideologia: "Social-Democracia / Ética",
    foco: "Transparência e Unidade Nacional",
    proposta: "Reforma do sistema político para maior proximidade entre eleitos e eleitores.",
    formacao: "Ciência Política.",
    experiencia: "Ex-Secretário-Geral do PS. Ministro de vários governos.",
    casosJudiciais: "Sem registos.",
    pontosFortes: ["Credibilidade ética", "Capacidade de diálogo"],
    stats: { experiencia: 88, popularidade: 18, carisma: 55 },
    fontes: ["https://ps.pt"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Conferência sobre a integridade nas instituições públicas.",
    pontosCriticos: ["Afastamento prolongado da política ativa", "Resistência interna no PS"],
    perfilCompleto: "Seguro posiciona-se como o candidato da 'decência' e do equilíbrio democrático."
  },
  {
    nome: "Catarina Martins",
    idade: 52,
    partido: "Bloco de Esquerda",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Admitida",
    ideologia: "Socialismo Democrático",
    foco: "Justiça Social e Ecologia",
    proposta: "Controlo público de setores estratégicos e combate radical à crise da habitação.",
    formacao: "Linguística e Artes Performativas.",
    experiencia: "Ex-Coordenadora do BE. Eurodeputada.",
    casosJudiciais: "Sem registos.",
    pontosFortes: ["Eloquência", "Forte base militante"],
    stats: { experiencia: 80, popularidade: 12, carisma: 82 },
    fontes: ["https://www.bloco.org"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Visita a bairros carenciados e cooperativas de habitação.",
    pontosCriticos: ["Polarização à esquerda", "Desgaste de imagem"],
    perfilCompleto: "Martins tenta unificar a esquerda radical em torno de uma agenda climática e social."
  },
  {
    nome: "Henrique Gouveia e Melo",
    idade: 66,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Lista de Proponentes Validada",
    ideologia: "Institucionalismo / Ordem",
    foco: "Eficácia do Estado e Segurança",
    proposta: "Gestão técnica e rigorosa dos recursos públicos com foco na Proteção Civil.",
    formacao: "Almirante da Marinha.",
    experiencia: "CEMA. Gestor da Vacinação COVID-19.",
    casosJudiciais: "Nenhum registo.",
    pontosFortes: ["Favorito nas sondagens", "Aura de competência"],
    stats: { experiencia: 98, popularidade: 35, carisma: 70 },
    fontes: ["https://www.cne.pt"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Visita operacional a centros de comando de emergência.",
    pontosCriticos: ["Falta de traquejo partidário", "Perfil autoritário"],
    perfilCompleto: "O Almirante capitaliza o desejo de ordem e eficácia técnica acima das querelas partidárias."
  },
  {
    nome: "Humberto Correia",
    idade: 55,
    partido: "Independente",
    status: "Em Validação",
    cneStatus: "Verificação de Assinaturas",
    ideologia: "Cidadania / Cívico",
    foco: "Participação Direta",
    proposta: "Criação de mecanismos de referendo frequente e digitalização total da democracia.",
    formacao: "Engenharia de Sistemas.",
    experiencia: "Ativista cívico.",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Discurso inovador", "Independência total"],
    stats: { experiencia: 30, popularidade: 3, carisma: 50 },
    fontes: ["https://www.cne.pt"],
    image: "https://images.unsplash.com/photo-1506794778242-aff554109ad5?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Webinars sobre democracia digital.",
    pontosCriticos: ["Desconhecimento público", "Falta de estrutura"],
    perfilCompleto: "Candidatura focada na modernização do sistema através da tecnologia."
  },
  {
    nome: "João Cotrim de Figueiredo",
    idade: 64,
    partido: "Iniciativa Liberal",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Validada",
    ideologia: "Liberalismo Clássico",
    foco: "Crescimento Económico",
    proposta: "Choque fiscal e privatização de empresas públicas não essenciais.",
    formacao: "Gestão e Economia.",
    experiencia: "Deputado. Ex-Presidente da IL. Gestor de topo.",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Clareza de propostas", "Apoio do setor privado"],
    stats: { experiencia: 75, popularidade: 10, carisma: 78 },
    fontes: ["https://liberal.pt"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Fórum com jovens empreendedores.",
    pontosCriticos: ["Visto como candidato das elites", "Discurso muito técnico"],
    perfilCompleto: "Cotrim representa o liberalismo puro, focado na liberdade individual e prosperidade económica."
  },
  {
    nome: "Jorge Pinto",
    idade: 38,
    partido: "Livre",
    status: "Candidatura Formalizada",
    cneStatus: "Assinaturas Admitidas",
    ideologia: "Ecossocialismo / Progressismo",
    foco: "Ambiente e Direitos Humanos",
    proposta: "Implementação do Rendimento Básico Incondicional e transição energética radical.",
    formacao: "Doutorado em Filosofia Política.",
    experiencia: "Deputado e Académico.",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Discurso renovador", "Apelo ecologista"],
    stats: { experiencia: 50, popularidade: 4, carisma: 68 },
    fontes: ["https://partidolivre.pt"],
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Ação de sensibilização em parques naturais.",
    pontosCriticos: ["Partido pequeno", "Propostas vistas como utópicas"],
    perfilCompleto: "A face do progressismo moderno, focado no futuro das novas gerações."
  },
  {
    nome: "Luís Marques Mendes",
    idade: 68,
    partido: "PSD",
    status: "Candidatura Formalizada",
    cneStatus: "Lista Ratificada",
    ideologia: "Centro-Direita",
    foco: "Estabilidade Institucional",
    proposta: "Consensos políticos alargados para reformas estruturais na saúde e educação.",
    formacao: "Jurista.",
    experiencia: "Conselheiro de Estado. Ex-Ministro e ex-Líder do PSD.",
    casosJudiciais: "Sem processos.",
    pontosFortes: ["Projeção nacional", "Experiência de Estado"],
    stats: { experiencia: 96, popularidade: 25, carisma: 65 },
    fontes: ["https://www.psd.pt"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Almoço com associações empresariais.",
    pontosCriticos: ["Conotado com o status quo", "Resistência interna no partido"],
    perfilCompleto: "O candidato da estabilidade, com forte apoio nas estruturas partidárias tradicionais."
  },
  {
    nome: "Manuel João Vieira",
    idade: 63,
    partido: "Independente",
    status: "Candidatura Formalizada",
    cneStatus: "Assinaturas Verificadas (Candidato Recorrente)",
    ideologia: "Satírico / Performativo",
    foco: "Cultura e Crítica ao Sistema",
    proposta: "Propostas surreais para evidenciar as falhas do sistema democrático.",
    formacao: "Artes Plásticas / Música.",
    experiencia: "Artista e Candidato 'Perpetual'.",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Diferenciação absoluta", "Humor crítico"],
    stats: { experiencia: 20, popularidade: 2, carisma: 90 },
    fontes: ["https://www.cne.pt"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Performance artística no Chiado.",
    pontosCriticos: ["Falta de seriedade nas propostas", "Sem apoio institucional"],
    perfilCompleto: "A candidatura que utiliza a ironia para questionar a política tradicional."
  },
  {
    nome: "André Pestana",
    idade: 47,
    partido: "Independente / STOP",
    status: "Em Validação",
    cneStatus: "Recolha de Apoios em Conclusão",
    ideologia: "Sindicalismo / Luta Social",
    foco: "Educação e Serviços Públicos",
    proposta: "Democratização total das escolas e valorização radical da carreira docente.",
    formacao: "Professor.",
    experiencia: "Líder sindical (STOP).",
    casosJudiciais: "Nenhum.",
    pontosFortes: ["Capacidade de mobilização de rua", "Voz dos professores"],
    stats: { experiencia: 45, popularidade: 5, carisma: 75 },
    fontes: ["https://www.sindicatostop.pt"],
    image: "https://images.unsplash.com/photo-1506794778242-aff554109ad5?auto=format&fit=crop&q=80&w=400",
    campanhaDiaria: "Manifestação à porta do Ministério da Educação.",
    pontosCriticos: ["Foco muito setorial", "Visto como radical"],
    perfilCompleto: "Pestana transporta a luta sindical para a arena presidencial, focando-se na dignidade do trabalho."
  }
];
