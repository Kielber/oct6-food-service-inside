export type HospitalUnitId = 
  | 'consolidado' 
  | 'hospital-01' 
  | 'hospital-02' 
  | 'hospital-03' 
  | 'hospital-04';

export interface HospitalUnit {
  id: HospitalUnitId;
  nome: string;
  sigla: string;
  cidade: string;
  leitosAtivos: number;
  refeicoesPrevistasDia: number;
  nutricionistaResponsavel: string;
  statusOperacao: 'Normal' | 'Alerta Ruptura' | 'Produção Atrasada';
  balancasOnline: number;
  terminaisBiometriaOnline: number;
}

export type MealType = 
  | 'cafe' 
  | 'lanche-manha' 
  | 'almoco' 
  | 'lanche-tarde' 
  | 'jantar';

export interface FoodFamily {
  id: string;
  nome: string;
  codigoERP: string;
  descricao: string;
  corBadge: string;
  produtosContagem: number;
  responsavelCompras: string;
  prazoMedioReposicaoDias: number;
}

export interface ProductItem {
  id: string;
  codigoERP: string;
  nome: string;
  familiaId: string;
  familiaNome: string;
  unidadeMedida: 'KG' | 'G' | 'L' | 'UN' | 'CX';
  estoqueFisico: number;
  estoqueReservado: number;
  estoqueDisponivel: number;
  comprasEmAberto: number;
  consumoMedioDia: number;
  custoUnitario: number;
  diasCobertura: number;
  dataEstimadaRuptura: string;
  statusRisco: 'crítico' | 'atenção' | 'seguro';
}

export interface TechnicalSheet {
  id: string;
  nomePrato: string;
  tipoRefeicao: MealType;
  familiaPrincipal: string;
  rendimentoPorcoes: number;
  custoPorcao: number;
  ingredientes: {
    produtoId: string;
    produtoNome: string;
    quantidadePerCapitaG: number; // em gramas ou ml
    fatorCorrecao: number; // ex: 1.15
    fatorCoccao: number; // ex: 0.85
    unidade: string;
  }[];
  modoPreparo: string;
  tempoPreparoMinutos: number;
}

export interface ConsumptionPlanRow {
  produtoId: string;
  codigoERP: string;
  produtoNome: string;
  familiaNome: string;
  unidade: string;
  estoqueFisico: number;
  estoqueReservado: number;
  estoqueDisponivel: number;
  consumoHoje: number;
  consumo7d: number;
  consumo15d: number;
  consumo30d: number;
  comprasAberto: number;
  estoqueProjetado15d: number;
  deficitProjetado15d: number;
  dataEstimadaRuptura: string;
  nivelRisco: 'crítico' | 'atenção' | 'seguro';
}

export interface StockRequisition {
  id: string;
  codigoRequisicao: string;
  hospitalId: HospitalUnitId;
  dataOperacao: string;
  periodo: 'D-1 (Amanhã)' | 'Hoje';
  tipoRefeicao: MealType;
  familiaId: string;
  familiaNome: string;
  produtoId: string;
  produtoNome: string;
  distribuicao: {
    almocoRefKg: number;    // Refeição Padrão Funcionários/Acompanhantes
    almocoNacKg: number;    // Nutrição Clínica Pacientes (Leitos)
    almocoCdKg: number;     // Centro Cirúrgico / Dietas Especiais / Pastosa
  };
  totalSolicitadoKg: number;
  estoqueDisponivelKg: number;
  estoqueReservadoKg: number;
  saldoAposAtendimentoKg: number;
  deficitKg: number;
  status: 'Pendente Separação' | 'Em Separação' | 'Atendida Total' | 'Atendida com Divergência';
  nutricionistaSolicitante: string;
}

export interface WeighingItem {
  id: string;
  requisicaoId: string;
  produtoNome: string;
  hospitalId: HospitalUnitId;
  solicitadoKg: number;
  pesadoAcumuladoKg: number;
  pesagensIndividuais: {
    id: string;
    pesoKg: number;
    hora: string;
    balancaCodigo: string;
  }[];
  toleranciaPercent: number; // ex: 2%
  status: 'Aguardando' | 'Pesando' | 'Dentro da tolerância' | 'Fora da tolerância';
}

export interface PurchaseReceiptItem {
  id: string;
  numeroPedidoERP: string;
  numeroNFe: string;
  chaveNfe: string;
  fornecedorNome: string;
  cnpjFornecedor: string;
  hospitalId: HospitalUnitId;
  dataChegada: string;
  produtoNome: string;
  quantidadePedidaKg: number;
  quantidadeNFeKg: number;
  quantidadePesadaBalancaKg: number;
  divergenciaAbsolutaKg: number;
  divergenciaPercentual: number;
  toleranciaContratualPercent: number;
  statusConferencia: 
    | 'Aguardando Pesagem'
    | 'Aceito Conforme'
    | 'Aceito com Divergência'
    | 'Aceito Parcialmente'
    | 'Recusado'
    | 'Ocorrência Registrada';
  observacaoFiscal?: string;
}

export interface ProductionOrder {
  id: string;
  codigoOrdem: string;
  hospitalId: HospitalUnitId;
  dataProducao: string;
  tipoRefeicao: MealType;
  refeicoesPrevistas: number;
  dietasPublico: {
    geralRefeitorio: number;
    dietasBrandas: number;
    dietasPastosas: number;
    dietasEnterais: number;
    dietasHipossodicas: number;
  };
  preparacoes: string[];
  insumosNecessariosQtd: number;
  insumosSeparadosQtd: number;
  status: 
    | 'Planejado' 
    | 'Aguardando Separação' 
    | 'Liberado para Produção' 
    | 'Em Produção' 
    | 'Concluído' 
    | 'Distribuído';
  cozinheiroChefe: string;
  horaInicioPrevista: string;
  horaDistribuicaoPrevista: string;
}

export interface BiometricLogEvent {
  id: string;
  timestamp: string;
  hospitalId: HospitalUnitId;
  matricula: string;
  nomeFuncionario: string;
  cargo: string;
  setor: string;
  tipoRefeicao: MealType;
  equipamentoCodigo: string;
  equipamentoLocal: string;
  status: 'Comprovado' | 'Possível duplicidade';
  motivoDuplicidade?: string;
  origem: 'BIOMETRIA';
  faturavel: boolean;
}

export interface HospitalMeasurement {
  id: string;
  hospitalId: HospitalUnitId;
  periodoMesAno: string;
  refeicoesPrevistas: number;
  refeicoesProduzidas: number;
  refeicoesDistribuidas: number;
  refeicoesComprovadasBiometria: number;
  possiveisDuplicidades: number;
  ajustesManuais: number;
  glosasAuditoria: number;
  quantidadeFaturavel: number;
  valorUnitarioRefeicao: number;
  valorTotalPrevisto: number;
  valorGlosado: number;
  statusMedicao: 'Aberta' | 'Em Validação Savvy' | 'Aprovada para Faturamento' | 'Integrada ao ERP';
}

export interface FiscalHubDocument {
  id: string;
  chaveNFe: string;
  numeroNota: string;
  serie: string;
  fornecedorNome: string;
  cnpj: string;
  dataEmissao: string;
  valorTotal: number;
  pedidoRelacionadoERP: string;
  statusFiscalHub: 'XML Capturado' | 'Validado SEFAZ';
  statusEntradaERP: 'Pendente Conferência' | 'Conferido com Pesagem' | 'Entrada Registrada';
  statusAlterdata: 'Aguardando Alterdata' | 'Recebido' | 'Processado' | 'Enviado' | 'Erro';
  detalhesItens: {
    descricao: string;
    ncm: string;
    cfop: string;
    qtd: number;
    unidade: string;
    valorUnitario: number;
    valorTotal: number;
  }[];
}

export interface IntegrationStatus {
  balancas: {
    id: string;
    nome: string;
    hospitalId: HospitalUnitId;
    modelo: string;
    ipPorta: string;
    status: 'Online' | 'Offline';
    ultimaPesagem: string;
    pesagensHoje: number;
  }[];
  biometria: {
    id: string;
    nome: string;
    hospitalId: HospitalUnitId;
    localizacao: string;
    ipPorta: string;
    status: 'Online' | 'Offline';
    eventosHoje: number;
    ultimaCaptura: string;
  }[];
}
