"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { HOSPITAIS, PRODUTOS_BASE } from '@/data/mockData';
import { 
  Building2, 
  Utensils, 
  ChefHat, 
  ScanFace, 
  PackageCheck, 
  AlertTriangle, 
  Truck, 
  Scale, 
  TrendingDown, 
  Trash2, 
  DollarSign, 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Clock,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export function ExecutiveDashboard() {
  const { selectedHospital, setSelectedHospital, setActiveModule, openErpBackofficeModal } = useApp();

  // Multiplicadores dinâmicos baseados no hospital selecionado
  const hospitalData = HOSPITAIS.find(h => h.id === selectedHospital);

  const getStats = () => {
    switch (selectedHospital) {
      case 'hospital-01':
        return {
          previstasHoje: 2450,
          produzidasHoje: 1980,
          servidasBiometria: 1890,
          requisicoesPendentes: 4,
          produtosRuptura: 3,
          comprasAguardando: 5,
          divergenciasPesagem: 1,
          consumo15DiasKg: 12450,
          desperdicioPercent: 2.1,
          custoMedioRefeicao: 11.45,
          eventosBiometriaHoje: 1890,
          statusIntegracoes: '100% Operacional (3 Balanças / 4 Terminais)',
          alertaTexto: 'Hospital Unidade 01: Divergência na pesagem da doca para Tomate Italiano (-12,35kg).',
        };
      case 'hospital-02':
        return {
          previstasHoje: 1680,
          produzidasHoje: 1420,
          servidasBiometria: 1390,
          requisicoesPendentes: 2,
          produtosRuptura: 2,
          comprasAguardando: 3,
          divergenciasPesagem: 1,
          consumo15DiasKg: 8900,
          desperdicioPercent: 1.8,
          custoMedioRefeicao: 12.10,
          eventosBiometriaHoje: 1390,
          statusIntegracoes: '100% Operacional (2 Balanças / 3 Terminais)',
          alertaTexto: 'Hospital Unidade 02: Estoque de peito de frango com reposição confirmada hoje às 16h.',
        };
      case 'hospital-03':
        return {
          previstasHoje: 1350,
          produzidasHoje: 1100,
          servidasBiometria: 1045,
          requisicoesPendentes: 1,
          produtosRuptura: 1,
          comprasAguardando: 2,
          divergenciasPesagem: 0,
          consumo15DiasKg: 7100,
          desperdicioPercent: 1.5,
          custoMedioRefeicao: 11.80,
          eventosBiometriaHoje: 1045,
          statusIntegracoes: '100% Operacional (2 Balanças / 2 Terminais)',
          alertaTexto: 'Hospital Unidade 03: Produção do almoço concluída sem inconformidades.',
        };
      case 'hospital-04':
        return {
          previstasHoje: 1980,
          produzidasHoje: 1650,
          servidasBiometria: 1580,
          requisicoesPendentes: 3,
          produtosRuptura: 2,
          comprasAguardando: 4,
          divergenciasPesagem: 0,
          consumo15DiasKg: 10200,
          desperdicioPercent: 2.3,
          custoMedioRefeicao: 11.60,
          eventosBiometriaHoje: 1580,
          statusIntegracoes: '100% Operacional (3 Balanças / 3 Terminais)',
          alertaTexto: 'Hospital Unidade 04: Cardápio do final de semana aprovado pela nutrição.',
        };
      case 'consolidado':
      default:
        return {
          previstasHoje: 7460,
          produzidasHoje: 6150,
          servidasBiometria: 5905,
          requisicoesPendentes: 10,
          produtosRuptura: 5,
          comprasAguardando: 14,
          divergenciasPesagem: 2,
          consumo15DiasKg: 38650,
          desperdicioPercent: 1.9,
          custoMedioRefeicao: 11.72,
          eventosBiometriaHoje: 5905,
          statusIntegracoes: '100% Operacional (10 Balanças / 12 Terminais)',
          alertaTexto: 'Consolidado Savvy: 4 operações hospitalares ativas. 7.460 refeições contratadas hoje.',
        };
    }
  };

  const s = getStats();

  const kpis = [
    {
      titulo: 'Refeições Previstas Hoje',
      valor: s.previstasHoje.toLocaleString('pt-BR'),
      sub: 'Planejamento de cardápio',
      icon: Utensils,
      cor: 'border-l-4 border-l-blue-600',
      bgIcon: 'bg-blue-100 text-blue-700',
    },
    {
      titulo: 'Refeições Produzidas',
      valor: s.produzidasHoje.toLocaleString('pt-BR'),
      sub: `${((s.produzidasHoje / s.previstasHoje) * 100).toFixed(1)}% do planejado`,
      icon: ChefHat,
      cor: 'border-l-4 border-l-emerald-600',
      bgIcon: 'bg-emerald-100 text-emerald-700',
    },
    {
      titulo: 'Refeições Efetivamente Servidas',
      valor: s.servidasBiometria.toLocaleString('pt-BR'),
      sub: 'Validadas por Biometria Facial',
      icon: ScanFace,
      cor: 'border-l-4 border-l-indigo-600',
      bgIcon: 'bg-indigo-100 text-indigo-700',
    },
    {
      titulo: 'Requisições Pendentes',
      valor: s.requisicoesPendentes,
      sub: 'Aguardando separação D-1',
      icon: PackageCheck,
      cor: 'border-l-4 border-l-amber-500',
      bgIcon: 'bg-amber-100 text-amber-700',
      onClick: () => setActiveModule('requisicoes'),
    },
    {
      titulo: 'Produtos em Risco Ruptura',
      valor: s.produtosRuptura,
      sub: 'Estoque < 3 dias de consumo',
      icon: AlertTriangle,
      cor: 'border-l-4 border-l-red-600',
      bgIcon: 'bg-red-100 text-red-700',
      onClick: () => setActiveModule('planejamento-consumo'),
    },
    {
      titulo: 'Compras Aguardando Recebimento',
      valor: s.comprasAguardando,
      sub: 'Conferência de pesagem na doca',
      icon: Truck,
      cor: 'border-l-4 border-l-cyan-600',
      bgIcon: 'bg-cyan-100 text-cyan-700',
      onClick: () => setActiveModule('recebimento-compras'),
    },
    {
      titulo: 'Divergências de Pesagem',
      valor: s.divergenciasPesagem,
      sub: 'Conferido na Balança x NF-e',
      icon: Scale,
      cor: 'border-l-4 border-l-orange-500',
      bgIcon: 'bg-orange-100 text-orange-700',
      onClick: () => setActiveModule('recebimento-compras'),
    },
    {
      titulo: 'Consumo Previsto (15 Dias)',
      valor: `${s.consumo15DiasKg.toLocaleString('pt-BR')} kg`,
      sub: 'Demanda projetada D-15',
      icon: TrendingDown,
      cor: 'border-l-4 border-l-purple-600',
      bgIcon: 'bg-purple-100 text-purple-700',
      onClick: () => setActiveModule('planejamento-consumo'),
    },
    {
      titulo: 'Desperdício / Sobras Limpas',
      valor: `${s.desperdicioPercent}%`,
      sub: 'Meta Savvy: < 3.0%',
      icon: Trash2,
      cor: 'border-l-4 border-l-slate-700',
      bgIcon: 'bg-slate-100 text-slate-700',
    },
    {
      titulo: 'Custo Médio por Refeição',
      valor: `R$ ${s.custoMedioRefeicao.toFixed(2).replace('.', ',')}`,
      sub: 'Insumos + Per capita',
      icon: DollarSign,
      cor: 'border-l-4 border-l-emerald-600',
      bgIcon: 'bg-emerald-100 text-emerald-700',
    },
    {
      titulo: 'Eventos Biometria Hoje',
      valor: s.eventosBiometriaHoje.toLocaleString('pt-BR'),
      sub: 'Catracas de refeitório',
      icon: ScanFace,
      cor: 'border-l-4 border-l-rose-600',
      bgIcon: 'bg-rose-100 text-rose-700',
      onClick: () => setActiveModule('refeitorio'),
    },
    {
      titulo: 'Status das Integrações',
      valor: '100% Online',
      sub: s.statusIntegracoes,
      icon: Cpu,
      cor: 'border-l-4 border-l-emerald-500',
      bgIcon: 'bg-emerald-100 text-emerald-700',
      onClick: () => setActiveModule('integracoes'),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner de Contexto Operacional Hospitalar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-[#c62828] border border-red-200">
                OCT6 Food Service
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Empresa: <strong>Grupo Savvy</strong>
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Operação ao Vivo (Outubro/2026)
              </span>
            </div>
            
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              {selectedHospital === 'consolidado' 
                ? 'Painel Consolidado — 4 Hospitais Savvy' 
                : `${hospitalData?.nome} (${hospitalData?.sigla})`}
            </h1>
            
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              {selectedHospital === 'consolidado' 
                ? 'Visão executiva integrada das 4 operações hospitalares do Grupo Savvy. Gestão unificada de cardápios, estoques, pesagens em balança, refeições biométricas e faturamento hospitalar.'
                : `Operação localizada em ${hospitalData?.cidade}. Responsável técnica: ${hospitalData?.nutricionistaResponsavel}. Capacidade: ${hospitalData?.leitosAtivos} leitos ativos.`}
            </p>
          </div>

          {/* Atalhos Rápidos da Savvy */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('estoque')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Backoffice ERP OCT6</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('medicao-faturamento')}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Medição Hospitalar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notificação dinâmica de alerta */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-semibold text-slate-800">Status Operacional:</span>
            <span className="text-slate-600">{s.alertaTexto}</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Atualizado a cada 60s pelos coletores
          </span>
        </div>
      </div>

      {/* Grid das 4 Unidades Hospitalares (Apresentação Visual Obrigatória) */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-[#c62828]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Unidades Operacionais Hospitalares — Grupo Savvy
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">Clique para filtrar os dados</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HOSPITAIS.map((hosp) => {
            const isSelected = selectedHospital === hosp.id;
            return (
              <button
                key={hosp.id}
                type="button"
                onClick={() => setSelectedHospital(hosp.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected 
                    ? 'bg-white border-[#c62828] shadow-md ring-2 ring-red-100' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm text-slate-900">{hosp.sigla}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    hosp.statusOperacao === 'Normal' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {hosp.statusOperacao}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-800">{hosp.nome}</div>
                <div className="text-[11px] text-slate-500 mb-2">{hosp.cidade}</div>
                
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <span>{hosp.leitosAtivos} leitos</span>
                  <strong className="text-slate-900">{hosp.refeicoesPrevistasDia.toLocaleString('pt-BR')} ref/dia</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid dos 12 Indicadores Executivos (KPIs Exigidos) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>Indicadores Executivos da Operação</span>
            <span className="text-xs font-normal text-slate-400">
              ({selectedHospital === 'consolidado' ? 'Consolidado' : hospitalData?.sigla})
            </span>
          </h2>
          <span className="text-xs text-slate-500">12 Métricas Principais</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div
                key={i}
                onClick={k.onClick}
                className={`bg-white rounded-xl p-4 border border-slate-200 shadow-2xs transition-all ${k.cor} ${
                  k.onClick ? 'cursor-pointer hover:shadow-md hover:border-slate-300' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-slate-500 leading-tight uppercase tracking-wider">
                      {k.titulo}
                    </p>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {k.valor}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${k.bgIcon}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate">{k.sub}</span>
                  {k.onClick && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Painéis Gráficos e Analíticos: Previsto x Realizado & Alertas de Ruptura */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico Analítico: Distribuição de Refeições */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Funil de Refeições: Previsto → Produzido → Comprovado por Biometria
              </h3>
              <p className="text-xs text-slate-500">
                Rastreabilidade integral da entrega hospitalar para auditoria e faturamento
              </p>
            </div>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-1 rounded">
              02/10/2026
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {/* Barra 1: Previsto */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block"></span>
                  Refeições Previstas em Cardápio:
                </span>
                <span className="text-slate-900 font-bold">{s.previstasHoje} refeições (100%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Barra 2: Produzidas */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block"></span>
                  Refeições Efetivamente Produzidas na Cozinha:
                </span>
                <span className="text-slate-900 font-bold">
                  {s.produzidasHoje} refeições ({((s.produzidasHoje / s.previstasHoje) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(s.produzidasHoje / s.previstasHoje) * 100}%` }} 
                />
              </div>
            </div>

            {/* Barra 3: Comprovadas por Biometria */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block"></span>
                  Refeições Servidas com Comprovação Facial (Catraca):
                </span>
                <span className="text-slate-900 font-bold">
                  {s.servidasBiometria} refeições ({((s.servidasBiometria / s.previstasHoje) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(s.servidasBiometria / s.previstasHoje) * 100}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2 border border-slate-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Comprovação Faturável:</strong> Substituição 100% digital das assinaturas em papel por eventos de identificação facial dos terminais do refeitório, eliminando riscos de glosa contratual com o hospital.
            </span>
          </div>
        </div>

        {/* Tabela de Insumos Críticos com Risco de Ruptura */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900">Risco de Ruptura Iminente</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveModule('planejamento-consumo')}
                className="text-[11px] font-semibold text-[#c62828] hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-2.5">
              {PRODUTOS_BASE.filter(p => p.statusRisco === 'crítico').map((prod) => (
                <div key={prod.id} className="p-2.5 rounded-lg border border-red-200 bg-red-50/50 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{prod.nome}</span>
                    <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-bold text-[9px] uppercase">
                      {prod.diasCobertura} dias
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Disp.: <strong>{prod.estoqueDisponivel} {prod.unidadeMedida}</strong></span>
                    <span className="text-red-700 font-semibold">Ruptura: {prod.dataEstimadaRuptura}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => openErpBackofficeModal('compras')}
            className="w-full mt-3 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center"
          >
            Gerar Pedido de Reposição no Compras ERP
          </button>
        </div>

      </div>

    </div>
  );
}
