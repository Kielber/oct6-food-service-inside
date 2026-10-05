"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MEDICOES_HOSPITALARES, HOSPITAIS } from '@/data/mockData';
import { HospitalMeasurement, HospitalUnitId } from '@/types';
import { 
  Receipt, 
  DollarSign, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Layers, 
  FileCheck2, 
  ShieldCheck,
  Eye,
  X,
  ScanFace,
  Download,
  ArrowRight
} from 'lucide-react';

export function MedicaoFaturamentoView() {
  const { selectedHospital, setSelectedHospital, biometricEvents, openErpBackofficeModal } = useApp();
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [periodoFiltro, setPeriodoFiltro] = useState('Outubro / 2026');

  // Buscar medição referente ao hospital ativo ou consolidada
  const medicaoAtiva = MEDICOES_HOSPITALARES.find(m => {
    if (selectedHospital === 'consolidado') return m.hospitalId === 'hospital-01';
    return m.hospitalId === selectedHospital;
  }) || MEDICOES_HOSPITALARES[0];

  const hospitalNome = selectedHospital === 'consolidado' 
    ? 'Hospital Unidade 01 (Demonstração Savvy)' 
    : HOSPITAIS.find(h => h.id === selectedHospital)?.nome || 'Hospital Unidade 01';

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                Eixo 3: Gestão & Controladoria
              </span>
              <span className="text-xs text-slate-500">• Como a operação está performando?</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Medição Hospitalar & Faturamento Savvy
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Consolidação auditada das refeições hospitalares, conciliação biométrica, glosas e faturamento integrado ao ERP OCT6.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('financeiro')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contas a Receber ERP OCT6</span>
            </button>
            <button
              type="button"
              onClick={() => setShowDrillDown(true)}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Auditoria Drill-Down (Rastreabilidade)</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtro de Unidade e Período */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-slate-700 uppercase">Hospital:</span>
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value as HospitalUnitId)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:ring-1 focus:ring-red-500"
            >
              <option value="consolidado">Visão Consolidada</option>
              {HOSPITAIS.map(h => (
                <option key={h.id} value={h.id}>{h.nome} ({h.sigla})</option>
              ))}
            </select>

            <span className="font-bold text-slate-700 uppercase ml-2">Competência:</span>
            <span className="font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
              {medicaoAtiva.periodoMesAno}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-500">Status da Medição:</span>
            <span className="px-2.5 py-0.5 rounded-full font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300">
              {medicaoAtiva.statusMedicao}
            </span>
          </div>
        </div>
      </div>

      {/* Painel com as 10 Métricas Obrigatórias Exigidas no Exemplo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c62828] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
              Demonstração Oficial de Fechamento Savvy
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">
              {hospitalNome} • {medicaoAtiva.periodoMesAno}
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Valor Faturável Previsto:</span>
            <span className="font-mono text-xl sm:text-2xl font-black text-emerald-700">
              R$ {medicaoAtiva.valorTotalPrevisto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Grade com os 10 Indicadores Obrigatórios */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          
          {/* 1. Refeições Previstas */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              1. Previstas:
            </span>
            <div className="font-mono text-base font-extrabold text-slate-900">
              {medicaoAtiva.refeicoesPrevistas.toLocaleString('pt-BR')}
            </div>
            <span className="text-[10px] text-slate-400 block">Contrato / Cardápio</span>
          </div>

          {/* 2. Produzidas */}
          <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
              2. Produzidas:
            </span>
            <div className="font-mono text-base font-extrabold text-blue-900">
              {medicaoAtiva.refeicoesProduzidas.toLocaleString('pt-BR')}
            </div>
            <span className="text-[10px] text-blue-700 block">Cozinha Central Savvy</span>
          </div>

          {/* 3. Distribuídas */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              3. Distribuídas:
            </span>
            <div className="font-mono text-base font-extrabold text-slate-900">
              {medicaoAtiva.refeicoesDistribuidas.toLocaleString('pt-BR')}
            </div>
            <span className="text-[10px] text-slate-400 block">Refeitório & Enfermarias</span>
          </div>

          {/* 4. Comprovadas por Biometria */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">
              4. Comprovadas:
            </span>
            <div className="font-mono text-base font-black text-indigo-900">
              {medicaoAtiva.refeicoesComprovadasBiometria.toLocaleString('pt-BR')}
            </div>
            <span className="text-[10px] text-indigo-700 block">Catracas Faciais</span>
          </div>

          {/* 5. Possíveis Duplicidades */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              5. Possíveis Duplicidades:
            </span>
            <div className="font-mono text-base font-black text-amber-700">
              {medicaoAtiva.possiveisDuplicidades}
            </div>
            <span className="text-[10px] text-amber-700 block">Marcações repetidas</span>
          </div>

          {/* 6. Ajustes */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              6. Ajustes Manuais:
            </span>
            <div className="font-mono text-base font-extrabold text-slate-900">
              +{medicaoAtiva.ajustesManuais}
            </div>
            <span className="text-[10px] text-slate-400 block">Plantões Extras Auditados</span>
          </div>

          {/* 7. Glosas */}
          <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider block">
              7. Glosas Contratuais:
            </span>
            <div className="font-mono text-base font-black text-red-700">
              -{medicaoAtiva.glosasAuditoria}
            </div>
            <span className="text-[10px] text-red-600 block">R$ {medicaoAtiva.valorGlosado.toFixed(2)}</span>
          </div>

          {/* 8. Quantidade Faturável */}
          <div className="p-3 bg-emerald-50/80 border border-emerald-300 rounded-xl space-y-1">
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
              8. Qtd. Faturável:
            </span>
            <div className="font-mono text-base font-black text-emerald-800">
              {medicaoAtiva.quantidadeFaturavel.toLocaleString('pt-BR')}
            </div>
            <span className="text-[10px] text-emerald-700 block">Base de Cobrança</span>
          </div>

          {/* 9. Valor Unitário */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              9. Valor Unitário:
            </span>
            <div className="font-mono text-base font-extrabold text-slate-900">
              R$ {medicaoAtiva.valorUnitarioRefeicao.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-slate-400 block">Preço por refeição</span>
          </div>

          {/* 10. Valor Total Previsto */}
          <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              10. Total Previsto:
            </span>
            <div className="font-mono text-sm font-black text-white truncate">
              R$ {medicaoAtiva.valorTotalPrevisto.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </div>
            <span className="text-[10px] text-slate-400 block">Lançado no ERP</span>
          </div>

        </div>

        {/* Storytelling de Auditoria com o Hospital */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Rastreabilidade Completa:</strong> A medição hospitalar da Savvy possui validação digital evento a evento. Cada uma das {medicaoAtiva.quantidadeFaturavel.toLocaleString('pt-BR')} refeições faturadas possui registro de horário, terminal e crachá.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowDrillDown(true)}
            className="shrink-0 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Fazer Drill-Down dos Eventos</span>
          </button>
        </div>
      </div>

      {/* Modal Drill-Down de Eventos para Demonstrar Rastreabilidade */}
      {showDrillDown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header do Drill-Down */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <ScanFace className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Drill-Down de Auditoria Savvy
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    Eventos Comprovatórios da Medição — {hospitalNome}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDrillDown(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabela do Drill-Down */}
            <div className="p-5 overflow-y-auto space-y-3">
              <p className="text-xs text-slate-500">
                Lista nominal individualizada dos eventos biométricos e registros que compõem o faturamento deste hospital:
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Data / Hora</th>
                      <th className="py-2.5 px-3">Matrícula</th>
                      <th className="py-2.5 px-3">Funcionário</th>
                      <th className="py-2.5 px-3">Tipo</th>
                      <th className="py-2.5 px-3">Terminal</th>
                      <th className="py-2.5 px-3 text-center">Faturável?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {biometricEvents.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/80">
                        <td className="py-2 px-3 font-mono text-slate-700">{ev.timestamp}</td>
                        <td className="py-2 px-3 font-mono font-bold text-slate-900">{ev.matricula}</td>
                        <td className="py-2 px-3 text-slate-800">{ev.nomeFuncionario}</td>
                        <td className="py-2 px-3 font-bold uppercase">{ev.tipoRefeicao}</td>
                        <td className="py-2 px-3 font-mono text-slate-500">{ev.equipamentoCodigo}</td>
                        <td className="py-2 px-3 text-center">
                          {ev.faturavel ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Sim (R$ 19,80)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              Não (Auditoria)
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500">Rastreabilidade integral habilitada para o cliente Grupo Savvy.</span>
              <button
                type="button"
                onClick={() => setShowDrillDown(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg"
              >
                Fechar Drill-Down
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
