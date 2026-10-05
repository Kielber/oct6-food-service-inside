"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PLANEJAMENTO_CONSUMO } from '@/data/mockData';
import { ConsumptionPlanRow } from '@/types';
import { 
  TrendingDown, 
  FileSpreadsheet, 
  AlertTriangle, 
  ShoppingCart, 
  Layers, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  Sparkles,
  Download
} from 'lucide-react';

export function PlanejamentoConsumoView() {
  const { openErpBackofficeModal, selectedHospital } = useApp();
  const [horizonte, setHorizonte] = useState<'hoje' | '7d' | '15d' | '30d'>('15d');
  const [busca, setBusca] = useState('');
  const [filtroFamilia, setFiltroFamilia] = useState<string>('todas');
  const [somenteRisco, setSomenteRisco] = useState(false);

  const linhasFiltradas = PLANEJAMENTO_CONSUMO.filter((row) => {
    if (busca && !row.produtoNome.toLowerCase().includes(busca.toLowerCase())) return false;
    if (filtroFamilia !== 'todas' && row.familiaNome !== filtroFamilia) return false;
    if (somenteRisco && row.nivelRisco === 'seguro') return false;
    return true;
  });

  const getConsumoPorHorizonte = (row: ConsumptionPlanRow) => {
    switch (horizonte) {
      case 'hoje': return row.consumoHoje;
      case '7d': return row.consumo7d;
      case '30d': return row.consumo30d;
      case '15d':
      default: return row.consumo15d;
    }
  };

  const getEstoqueProjetado = (row: ConsumptionPlanRow) => {
    const consumo = getConsumoPorHorizonte(row);
    // Fórmula: Estoque Disponível + Compras em Aberto - Consumo Previsto
    return Number((row.estoqueDisponivel + row.comprasAberto - consumo).toFixed(1));
  };

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo Inspirado em Planilha de Gestão Savvy */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Eixo 1: Planejamento
              </span>
              <span className="text-xs text-slate-500">• Matriz de Demanda & Ruptura</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Planejamento de Consumo de Insumos (Controle de Planilha)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Projeção analítica de estoque físico, reservas operacionais, consumo de cardápio e ordens de compra em aberto com alerta antecipado de ruptura.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('compras')}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Gerar Pedido no Compras ERP</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtros e Seleção de Horizontes */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Seletor de Horizonte de Análise */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Horizonte de Projeção:
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setHorizonte('hoje')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  horizonte === 'hoje' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={() => setHorizonte('7d')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  horizonte === '7d' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                7 Dias
              </button>
              <button
                type="button"
                onClick={() => setHorizonte('15d')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  horizonte === '15d' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                15 Dias (Padrão)
              </button>
              <button
                type="button"
                onClick={() => setHorizonte('30d')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  horizonte === '30d' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                30 Dias
              </button>
            </div>
          </div>

          {/* Campo de Busca e Filtro de Risco */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-red-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setSomenteRisco(!somenteRisco)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                somenteRisco 
                  ? 'bg-red-50 border-red-300 text-red-800 font-bold' 
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Apenas Risco / Ruptura</span>
            </button>
          </div>

        </div>
      </div>

      {/* Tabela Planilha de Consumo & Ruptura */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
              Grade Analítica de Planejamento de Consumo • Horizonte ({horizonte.toUpperCase()})
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Total de {linhasFiltradas.length} insumos monitorados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/90 text-slate-700 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Produto / Insumo</th>
                <th className="py-3 px-2">Família</th>
                <th className="py-3 px-2 text-right">Estoque Físico</th>
                <th className="py-3 px-2 text-right">Reservado D-1</th>
                <th className="py-3 px-2 text-right text-blue-900 bg-blue-50/50">Disponível</th>
                <th className="py-3 px-2 text-right">Consumo Prev. ({horizonte})</th>
                <th className="py-3 px-2 text-right text-emerald-900 bg-emerald-50/50">Compras Aberto</th>
                <th className="py-3 px-2 text-right font-black">Estoque Projetado</th>
                <th className="py-3 px-2 text-right text-red-700">Déficit Projetado</th>
                <th className="py-3 px-3 text-center">Data Est. Ruptura</th>
                <th className="py-3 px-3 text-center">Status Risco</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {linhasFiltradas.map((row) => {
                const consumo = getConsumoPorHorizonte(row);
                const proj = getEstoqueProjetado(row);
                const deficit = proj < 0 ? Math.abs(proj) : 0;
                const isCritico = row.nivelRisco === 'crítico';
                const isAtencao = row.nivelRisco === 'atenção';

                return (
                  <tr 
                    key={row.produtoId} 
                    className={`hover:bg-slate-50/90 transition-colors ${
                      isCritico ? 'bg-red-50/40' : isAtencao ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{row.produtoNome}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{row.codigoERP}</span>
                    </td>

                    <td className="py-2.5 px-2 text-slate-600">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 border border-slate-200">
                        {row.familiaNome}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                      {row.estoqueFisico.toFixed(1)} {row.unidade}
                    </td>

                    <td className="py-2.5 px-2 text-right font-mono text-amber-700 font-semibold">
                      {row.estoqueReservado.toFixed(1)} {row.unidade}
                    </td>

                    <td className="py-2.5 px-2 text-right font-mono font-bold text-blue-900 bg-blue-50/50">
                      {row.estoqueDisponivel.toFixed(1)} {row.unidade}
                    </td>

                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-800">
                      {consumo.toFixed(1)} {row.unidade}
                    </td>

                    <td className="py-2.5 px-2 text-right font-mono text-emerald-800 font-semibold bg-emerald-50/50">
                      +{row.comprasAberto.toFixed(1)} {row.unidade}
                    </td>

                    <td className={`py-2.5 px-2 text-right font-mono font-black ${
                      proj < 0 ? 'text-red-600' : 'text-emerald-700'
                    }`}>
                      {proj.toFixed(1)} {row.unidade}
                    </td>

                    <td className="py-2.5 px-2 text-right font-mono font-extrabold text-red-600">
                      {deficit > 0 ? (
                        <span className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200">
                          -{deficit.toFixed(1)} {row.unidade}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">0.0</span>
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-center font-mono text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        isCritico ? 'bg-red-600 text-white' : isAtencao ? 'bg-amber-100 text-amber-900' : 'text-slate-600'
                      }`}>
                        {row.dataEstimadaRuptura}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isCritico 
                          ? 'bg-red-100 text-red-800 border border-red-300' 
                          : isAtencao 
                            ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {row.nivelRisco}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Rodapé da Grade com Storytelling Savvy x ERP OCT6 */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Risco Crítico: Ruptura em menos de 3 dias de cardápio hospitalar.</span>
          </div>
          <button
            type="button"
            onClick={() => openErpBackofficeModal('compras')}
            className="text-[#c62828] font-bold hover:underline flex items-center gap-1"
          >
            <span>Ver como o déficit aciona cotações automáticas no ERP OCT6</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
