"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ORDENS_PRODUCAO } from '@/data/mockData';
import { ProductionOrder } from '@/types';
import { 
  ChefHat, 
  Calendar, 
  Clock, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Utensils, 
  Flame, 
  CheckCheck,
  AlertCircle
} from 'lucide-react';

export function ProducaoDiariaView() {
  const { selectedHospital, setActiveModule } = useApp();
  const [ordens, setOrdens] = useState<ProductionOrder[]>(ORDENS_PRODUCAO);
  const [ordemSelecionadaId, setOrdemSelecionadaId] = useState<string>(ORDENS_PRODUCAO[0].id);

  const ordemAtiva = ordens.find(o => o.id === ordemSelecionadaId) || ordens[0];

  const pipelineEtapas = [
    { id: 'planejamento', label: '1. Planejamento', desc: 'Cardápio Aprovado' },
    { id: 'requisicao', label: '2. Requisição', desc: 'Reserva D-1' },
    { id: 'separacao', label: '3. Separação', desc: 'Pesagem na Balança' },
    { id: 'producao', label: '4. Produção', desc: 'Cocção Hospitalar' },
    { id: 'distribuicao', label: '5. Distribuição', desc: 'Refeitório & Leitos' },
  ];

  const avancarStatus = () => {
    const statusFluxo: ProductionOrder['status'][] = [
      'Planejado',
      'Aguardando Separação',
      'Liberado para Produção',
      'Em Produção',
      'Concluído',
      'Distribuído',
    ];
    const currentIndex = statusFluxo.indexOf(ordemAtiva.status);
    if (currentIndex < statusFluxo.length - 1) {
      const nextStatus = statusFluxo[currentIndex + 1];
      setOrdens(prev => prev.map(o => o.id === ordemAtiva.id ? { ...o, status: nextStatus } : o));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Eixo 2: Operação Diária
              </span>
              <span className="text-xs text-slate-500">• Cozinha Central Hospitalar</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Controle de Produção Diária & Dietas
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Acompanhamento em tempo real da produção culinária hospitalar, dietas clínicas individualizadas e status do fluxo operacional.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveModule('refeitorio')}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Ver Comprovação no Refeitório</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Storytelling Visual: O Caminho Canônico do Food Service */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
            Fluxo Contínuo da Operação Hospitalar (Rastreabilidade Ponta a Ponta):
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {pipelineEtapas.map((step, idx) => (
              <div 
                key={step.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between shadow-2xs relative overflow-hidden"
              >
                <div className="text-xs font-extrabold text-slate-900">{step.label}</div>
                <div className="text-[10px] text-slate-500 mt-1">{step.desc}</div>
                <div className="absolute top-0 right-0 w-1.5 h-full bg-[#c62828]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Ordens de Produção do Dia e Detalhes da Ordem Ativa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lista de Ordens de Produção */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Ordens de Produção (02/10/2026)
            </h3>
            <span className="text-[10px] text-slate-400">Hospital Unidade 01</span>
          </div>

          <div className="space-y-2">
            {ordens.map((ord) => {
              const isSelected = ord.id === ordemAtiva.id;
              return (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => setOrdemSelecionadaId(ord.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-red-50/90 border-[#c62828] ring-1 ring-red-400 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono">
                      {ord.codigoOrdem}
                    </span>
                    <span className="text-xs font-bold text-slate-900 uppercase">
                      {ord.tipoRefeicao}
                    </span>
                  </div>

                  <div className="font-extrabold text-xs text-slate-900 mb-1">
                    {ord.refeicoesPrevistas} refeições programadas
                  </div>

                  <div className="text-[11px] text-slate-500 mb-2">
                    Início: {ord.horaInicioPrevista} • Distribuição: {ord.horaDistribuicaoPrevista}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{ord.cozinheiroChefe}</span>
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 text-amber-800">
                      {ord.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detalhamento Completo da Ordem Selecionada (Exemplo Solicitado) */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            
            {/* Cabeçalho da Ordem */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-[#c62828] text-white">
                    Hospital Unidade 01
                  </span>
                  <span className="text-xs text-slate-400">• Data: 02/10/2026 • Turno: Almoço</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  Ordem de Produção {ordemAtiva.codigoOrdem}
                </h2>
                <div className="text-xs text-slate-500">
                  Responsável: <strong>{ordemAtiva.cozinheiroChefe}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
                  {ordemAtiva.status}
                </span>
                <button
                  type="button"
                  onClick={avancarStatus}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
                >
                  Avançar Etapa →
                </button>
              </div>
            </div>

            {/* Painel de Quantidade por Público / Dieta */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Dimensionamento por Público & Dietas Clínicas:
                </h3>
                <span className="text-xs font-extrabold text-[#c62828]">
                  Total: {ordemAtiva.refeicoesPrevistas} refeições
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block">Refeitório Geral:</span>
                  <span className="font-mono text-base font-extrabold text-slate-900">
                    {ordemAtiva.dietasPublico.geralRefeitorio}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Colaboradores</span>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200">
                  <span className="text-[10px] text-blue-800 font-semibold block">Dietas Brandas:</span>
                  <span className="font-mono text-base font-extrabold text-blue-900">
                    {ordemAtiva.dietasPublico.dietasBrandas}
                  </span>
                  <span className="text-[10px] text-blue-700 block">Internação Leitos</span>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200">
                  <span className="text-[10px] text-amber-800 font-semibold block">Dietas Pastosas:</span>
                  <span className="font-mono text-base font-extrabold text-amber-900">
                    {ordemAtiva.dietasPublico.dietasPastosas}
                  </span>
                  <span className="text-[10px] text-amber-700 block">Pós-Operatório</span>
                </div>

                <div className="p-2.5 rounded-lg bg-purple-50/70 border border-purple-200">
                  <span className="text-[10px] text-purple-800 font-semibold block">Dietas Enterais:</span>
                  <span className="font-mono text-base font-extrabold text-purple-900">
                    {ordemAtiva.dietasPublico.dietasEnterais}
                  </span>
                  <span className="text-[10px] text-purple-700 block">UTI / Sondas</span>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-semibold block">Hipossódicas:</span>
                  <span className="font-mono text-base font-extrabold text-emerald-900">
                    {ordemAtiva.dietasPublico.dietasHipossodicas}
                  </span>
                  <span className="text-[10px] text-emerald-700 block">Cardiológicas</span>
                </div>

              </div>
            </div>

            {/* Preparações em Produção */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Preparações do Cardápio:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ordemAtiva.preparacoes.map((prep, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{prep}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-500 font-mono">
                      Ficha #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insumos Necessários x Separados */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Conferência de Insumos da Ordem:</span>
                <div className="text-slate-500 mt-0.5">
                  {ordemAtiva.insumosSeparadosQtd} de {ordemAtiva.insumosNecessariosQtd} insumos totalmente pesados e liberados pelo almoxarifado.
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-lg font-black text-emerald-700">
                  {((ordemAtiva.insumosSeparadosQtd / ordemAtiva.insumosNecessariosQtd) * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-slate-400 block">Liberado p/ Caldeiras</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
