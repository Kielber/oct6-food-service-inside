"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  HospitalUnitId, 
  WeighingItem, 
  PurchaseReceiptItem, 
  BiometricLogEvent, 
  FiscalHubDocument,
  StockRequisition
} from '@/types';
import { 
  HOSPITAIS, 
  ITENS_PESAGEM_SEPARACAO, 
  RECEBIMENTOS_COMPRAS, 
  EVENTOS_BIOMETRIA, 
  DOCUMENTOS_FISCAL_HUB,
  REQUISICOES_ESTOQUE_D1 
} from '@/data/mockData';

interface ErpModalData {
  isOpen: boolean;
  moduleName: string;
  title: string;
  erpController: string;
  erpModel: string;
  description: string;
  foodServiceInteraction: string[];
}

interface AppContextType {
  selectedHospital: HospitalUnitId;
  setSelectedHospital: (unit: HospitalUnitId) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  
  // Balança de separação interativa
  weighingState: WeighingItem;
  simulateWeightAddition: (weightKg?: number) => void;
  resetWeighingSimulation: () => void;

  // Recebimento de Compras interativo
  purchaseReceipts: PurchaseReceiptItem[];
  setReceiptStatus: (id: string, status: PurchaseReceiptItem['statusConferencia']) => void;

  // Eventos de Biometria interativos
  biometricEvents: BiometricLogEvent[];
  simulateBiometricScan: (generateDuplicate?: boolean) => void;

  // Fiscal Hub & Alterdata interativo
  fiscalDocs: FiscalHubDocument[];
  syncAlterdata: (docId: string) => void;

  // Requisições D-1
  requisicoes: StockRequisition[];
  atenderRequisicao: (id: string) => void;

  // Modal explicativo do ERP Backoffice Nativo
  erpModalData: ErpModalData | null;
  openErpBackofficeModal: (module: 'estoque' | 'compras' | 'financeiro' | 'produtos' | 'fornecedores') => void;
  closeErpBackofficeModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedHospital, setSelectedHospital] = useState<HospitalUnitId>('consolidado');
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  // Balança
  const [weighingState, setWeighingState] = useState<WeighingItem>(ITENS_PESAGEM_SEPARACAO);

  // Recebimento
  const [purchaseReceipts, setPurchaseReceipts] = useState<PurchaseReceiptItem[]>(RECEBIMENTOS_COMPRAS);

  // Biometria
  const [biometricEvents, setBiometricEvents] = useState<BiometricLogEvent[]>(EVENTOS_BIOMETRIA);

  // Fiscal Hub
  const [fiscalDocs, setFiscalDocs] = useState<FiscalHubDocument[]>(DOCUMENTOS_FISCAL_HUB);

  // Requisições
  const [requisicoes, setRequisicoes] = useState<StockRequisition[]>(REQUISICOES_ESTOQUE_D1);

  // Modal ERP
  const [erpModalData, setErpModalData] = useState<ErpModalData | null>(null);

  const simulateWeightAddition = (customWeight?: number) => {
    // Lista de pesos fictícios realistas de caixas/peças
    const pesosFicticios = [23.840, 21.310, 24.125, 22.950, 25.100, 23.400, 22.180, 24.500];
    const novoPeso = customWeight ?? pesosFicticios[Math.floor(Math.random() * pesosFicticios.length)];
    
    setWeighingState(prev => {
      const novoAcumulado = Number((prev.pesadoAcumuladoKg + novoPeso).toFixed(3));
      const dif = Math.abs(prev.solicitadoKg - novoAcumulado);
      const difPercent = (dif / prev.solicitadoKg) * 100;
      const dentroTolerancia = difPercent <= prev.toleranciaPercent;

      const novaHora = new Date().toLocaleTimeString('pt-BR');
      const novoEvento = {
        id: `sub-${Date.now()}`,
        pesoKg: novoPeso,
        hora: novaHora,
        balancaCodigo: 'BAL-ALMOX-01',
      };

      return {
        ...prev,
        pesadoAcumuladoKg: novoAcumulado,
        pesagensIndividuais: [novoEvento, ...prev.pesagensIndividuais],
        status: dentroTolerancia 
          ? 'Dentro da tolerância' 
          : novoAcumulado > prev.solicitadoKg * 1.05 
            ? 'Fora da tolerância' 
            : 'Pesando',
      };
    });
  };

  const resetWeighingSimulation = () => {
    setWeighingState({
      ...ITENS_PESAGEM_SEPARACAO,
      pesadoAcumuladoKg: 0,
      pesagensIndividuais: [],
      status: 'Aguardando',
    });
  };

  const setReceiptStatus = (id: string, status: PurchaseReceiptItem['statusConferencia']) => {
    setPurchaseReceipts(prev => prev.map(rec => rec.id === id ? { ...rec, statusConferencia: status } : rec));
  };

  const simulateBiometricScan = (generateDuplicate: boolean = false) => {
    const hora = new Date().toLocaleTimeString('pt-BR');
    const dataHora = `02/10/2026 ${hora}`;
    
    if (generateDuplicate) {
      const eventoDup: BiometricLogEvent = {
        id: `bio-sim-${Date.now()}`,
        timestamp: dataHora,
        hospitalId: selectedHospital === 'consolidado' ? 'hospital-01' : selectedHospital,
        matricula: 'MED-0482',
        nomeFuncionario: 'Dr. Arnaldo Silva Ribeiro',
        cargo: 'Médico Intensivista UTI-2',
        setor: 'UTI Geral',
        tipoRefeicao: 'almoco',
        equipamentoCodigo: 'BIO-REF-01',
        equipamentoLocal: 'Catraca Principal Refeitório Térreo',
        status: 'Possível duplicidade',
        motivoDuplicidade: '2ª marcação no mesmo turno de almoço (intervalo < 30 min). Alerta gerado para auditoria da Savvy.',
        origem: 'BIOMETRIA',
        faturavel: false,
      };
      setBiometricEvents(prev => [eventoDup, ...prev]);
    } else {
      const nomes = [
        { nome: 'Dra. Gabriela Vasquez', cargo: 'Cirurgiã Geral', mat: 'MED-1104', setor: 'Bloco Cirúrgico' },
        { nome: 'Marcos Vinicius Paiva', cargo: 'Enfermeiro Traumatologia', mat: 'ENF-2940', setor: 'Pronto Socorro' },
        { nome: 'Ana Paula Brandão', cargo: 'Fisioterapeuta Respiratória', mat: 'FIS-0412', setor: 'UTI Pediátrica' },
      ];
      const sorteado = nomes[Math.floor(Math.random() * nomes.length)];
      const eventoNormal: BiometricLogEvent = {
        id: `bio-sim-${Date.now()}`,
        timestamp: dataHora,
        hospitalId: selectedHospital === 'consolidado' ? 'hospital-01' : selectedHospital,
        matricula: sorteado.mat,
        nomeFuncionario: sorteado.nome,
        cargo: sorteado.cargo,
        setor: sorteado.setor,
        tipoRefeicao: 'almoco',
        equipamentoCodigo: 'BIO-REF-01',
        equipamentoLocal: 'Catraca Principal Refeitório Térreo',
        status: 'Comprovado',
        origem: 'BIOMETRIA',
        faturavel: true,
      };
      setBiometricEvents(prev => [eventoNormal, ...prev]);
    }
  };

  const syncAlterdata = (docId: string) => {
    setFiscalDocs(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          statusAlterdata: 'Enviado',
        };
      }
      return d;
    }));
  };

  const atenderRequisicao = (id: string) => {
    setRequisicoes(prev => prev.map(r => r.id === id ? { ...r, status: 'Atendida Total' } : r));
  };

  const openErpBackofficeModal = (module: 'estoque' | 'compras' | 'financeiro' | 'produtos' | 'fornecedores') => {
    switch (module) {
      case 'estoque':
        setErpModalData({
          isOpen: true,
          moduleName: 'Estoque do ERP OCT6',
          title: 'Integração Nativa de Estoque',
          erpController: 'StockController.php / InventarioController.php',
          erpModel: 'App\\Models\\Estoque & App\\Models\\MovimentacaoEstoque',
          description: 'O OCT6 Food Service NÃO cria tabelas de estoque paralelas. Cada requisição de cardápio (D-1) reserva saldo na tabela mestre do ERP e a conclusão da produção gera a baixa física no local de estoque do hospital selecionado.',
          foodServiceInteraction: [
            'Reserva de insumos vinculada à ordem de cardápio (D-1).',
            'Baixa física automática após validação da pesagem e produção.',
            'Conferência física na doca com pesagem integrada em balança.',
            'Suporte a múltiplos depósitos por hospital/filial no ERP.'
          ]
        });
        break;
      case 'compras':
        setErpModalData({
          isOpen: true,
          moduleName: 'Compras do ERP OCT6',
          title: 'Integração Nativa com Módulo de Compras',
          erpController: 'PurchaseController.php / CotacaoController.php',
          erpModel: 'App\\Models\\Compra & App\\Models\\ItemCompra',
          description: 'A tela de Planejamento de Consumo do Food Service calcula o déficit projetado para horizontes de 7, 15 e 30 dias. A partir do déficit, o nutricionista ou comprador gera diretamente solicitações de cotação ou pedidos de compra no ERP.',
          foodServiceInteraction: [
            'Geração direta de pedidos de reposição a partir da ruptura projetada.',
            'Importação automática do XML da NF-e via OCT6 Fiscal Hub.',
            'Conferência física na doca confrontando NF-e x Pedido x Balança.'
          ]
        });
        break;
      case 'financeiro':
        setErpModalData({
          isOpen: true,
          moduleName: 'Financeiro do ERP OCT6',
          title: 'Integração Nativa com Contas a Pagar / Receber',
          erpController: 'ContaPagarController.php / ContaReceberController.php',
          erpModel: 'App\\Models\\ContaPagar & App\\Models\\ContaReceber',
          description: 'A medição hospitalar mensal auditada no Food Service (refeições previstas x produzidas x comprovadas por biometria) gera automaticamente os títulos de Contas a Receber para o contrato hospitalar no ERP. As compras de insumos alimentícios geram os títulos em Contas a Pagar.',
          foodServiceInteraction: [
            'Faturamento das refeições auditadas via Contas a Receber.',
            'Controle de glosas contratuais e divergências de biometria.',
            'Alimentação do DRE do contrato hospitalar por centro de custo.'
          ]
        });
        break;
      case 'produtos':
        setErpModalData({
          isOpen: true,
          moduleName: 'Produtos do ERP OCT6',
          title: 'Cadastro Mestre Unificado de Produtos',
          erpController: 'ProductController.php / CategoriaController.php',
          erpModel: 'App\\Models\\Produto & App\\Models\\Categoria',
          description: 'As fichas técnicas e o per capita do Food Service utilizam estritamente o cadastro unificado de produtos do ERP OCT6, preservando códigos fiscais, NCM, unidades de medida e custos médios de aquisição.',
          foodServiceInteraction: [
            'Unidades de medida padrão (KG, G, L, UN, CX) com conversão automática.',
            'Custo médio ponderado do insumo alimentando o custo por refeição da ficha técnica.',
            'Famílias de alimentos parametrizáveis mapeadas nas categorias do ERP.'
          ]
        });
        break;
      case 'fornecedores':
        setErpModalData({
          isOpen: true,
          moduleName: 'Fornecedores do ERP OCT6',
          title: 'Cadastro Unificado de Fornecedores',
          erpController: 'ProviderController.php',
          erpModel: 'App\\Models\\Fornecedor',
          description: 'Os fornecedores de hortifrúti, frigoríficos e grãos são geridos pelo cadastro corporativo do ERP OCT6, com histórico de compras, prazos de entrega e controle de ocorrências por divergência de peso na pesagem.',
          foodServiceInteraction: [
            'Histórico de pontualidade e tolerância de pesagem por fornecedor.',
            'Associação direta com chaves de NF-e recebidas pelo Fiscal Hub.'
          ]
        });
        break;
    }
  };

  const closeErpBackofficeModal = () => {
    setErpModalData(null);
  };

  const value = useMemo(() => ({
    selectedHospital,
    setSelectedHospital,
    activeModule,
    setActiveModule,
    weighingState,
    simulateWeightAddition,
    resetWeighingSimulation,
    purchaseReceipts,
    setReceiptStatus,
    biometricEvents,
    simulateBiometricScan,
    fiscalDocs,
    syncAlterdata,
    requisicoes,
    atenderRequisicao,
    erpModalData,
    openErpBackofficeModal,
    closeErpBackofficeModal,
  }), [
    selectedHospital, 
    activeModule, 
    weighingState, 
    purchaseReceipts, 
    biometricEvents, 
    fiscalDocs, 
    requisicoes, 
    erpModalData
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser utilizado dentro de um AppProvider');
  }
  return context;
}
