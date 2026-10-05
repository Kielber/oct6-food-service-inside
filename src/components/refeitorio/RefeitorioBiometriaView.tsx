"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BiometricLogEvent } from '@/types';
import { 
  ScanFace, 
  Users, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  FileCheck2, 
  Sparkles,
  Filter,
  Download,
  Building2
} from 'lucide-react';

export function RefeitorioBiometriaView() {
  const { biometricEvents, simulateBiometricScan, selectedHospital, setActiveModule } = useApp();
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'comprovado' | 'duplicidade'>('todos');

  const eventosFiltrados = biometricEvents.filter(ev => {
    if (selectedHospital !== 'consolidado' && ev.hospitalId !== selectedHospital) return false;
    if (filtroStatus === 'comprovado' && ev.status !== 'Comprovado') return false;
    if (filtroStatus === 'duplicidade' && ev.status !== 'Possível duplicidade') return false;
    return true;
  });

  const totalComprovados = biometricEvents.filter(e => e.status === 'Comprovado').length;
  const totalDuplicidades = biometricEvents.filter(e => e.status === 'Possível duplicidade').length;

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                Auditoria & Comprovação
              </span>
              <span className="text-xs text-slate-500">• Refeitório Hospitalar</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Refeitório / Controle de Refeições por Biometria Facial
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Recebimento de telemetria e eventos de identificação dos terminais faciais com auditoria de duplicidades e comprovação 100% digital de faturamento.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Botão de Simulação de Evento Normal */}
            <button
              type="button"
              onClick={() => simulateBiometricScan(false)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ScanFace className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simular Leitura Biométrica</span>
            </button>

            {/* Botão de Simulação de Duplicidade Obrigatória */}
            <button
              type="button"
              onClick={() => simulateBiometricScan(true)}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simular Possível Duplicidade</span>
            </button>
          </div>
        </div>

        {/* Notificação Didática da Regra Contratual e de Hardware */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
          <div className="flex items-start gap-2">
            <Radio className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Integração de Hardware:</strong> O OCT6 Food Service <strong>NÃO realiza reconhecimento facial</strong> no servidor. O hardware biométrico do refeitório (Control iD Face Pro / Hikvision) realiza a captura ótica e envia o <em>Webhook de Identificação</em> para nosso sistema.
            </div>
          </div>
          <div className="flex items-start gap-2 border-t border-slate-200/60 pt-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Tratamento de Duplicidades:</strong> Quando um funcionário registra duas marcações durante o mesmo período de almoço, o sistema sinaliza visualmente <strong>&quot;Possível duplicidade&quot;</strong>. A regra de faturar ou glosar é parametrizável futuramente conforme o contrato com o hospital.
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Resumo dos Eventos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total de Eventos Hoje:
            </span>
            <span className="p-1 rounded bg-slate-100 text-slate-700">
              <ScanFace className="w-4 h-4" />
            </span>
          </div>
          <div className="font-mono text-2xl font-black text-slate-900">
            {biometricEvents.length}
          </div>
          <span className="text-[11px] text-slate-400">Origem: Terminais Faciais</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1 border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Refeições Comprovadas:
            </span>
            <span className="p-1 rounded bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="font-mono text-2xl font-black text-emerald-700">
            {totalComprovados}
          </div>
          <span className="text-[11px] text-slate-400">100% elegíveis para faturamento</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              Possíveis Duplicidades:
            </span>
            <span className="p-1 rounded bg-amber-100 text-amber-800">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="font-mono text-2xl font-black text-amber-600">
            {totalDuplicidades}
          </div>
          <span className="text-[11px] text-slate-400">Aguardando auditoria contratual</span>
        </div>

      </div>

      {/* Tabela de Eventos de Biometria em Tempo Real */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
              Stream de Eventos Biométricos • Refeitório Hospitalar
            </h3>
            <p className="text-[11px] text-slate-500">
              Substituição digital completa das antigas listas físicas de assinatura em papel
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-semibold">Filtrar:</span>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as 'todos' | 'comprovado' | 'duplicidade')}
              className="p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="todos">Todos os Eventos</option>
              <option value="comprovado">Apenas Comprovados</option>
              <option value="duplicidade">Apenas Possíveis Duplicidades</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/90 text-slate-700 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Data / Hora</th>
                <th className="py-3 px-3">Unidade Hospitalar</th>
                <th className="py-3 px-3">ID / Matrícula</th>
                <th className="py-3 px-3">Colaborador / Função</th>
                <th className="py-3 px-2">Tipo Refeição</th>
                <th className="py-3 px-3">Equipamento / Catraca</th>
                <th className="py-3 px-2 text-center">Origem</th>
                <th className="py-3 px-3 text-center">Status Auditoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {eventosFiltrados.map((ev) => {
                const isDup = ev.status === 'Possível duplicidade';
                return (
                  <tr key={ev.id} className={`hover:bg-slate-50/80 transition-colors ${
                    isDup ? 'bg-amber-50/40' : ''
                  }`}>
                    
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {ev.timestamp}
                    </td>

                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {ev.hospitalId === 'hospital-01' ? 'HU-01 (São Paulo)' : 'HU-02 (Campinas)'}
                    </td>

                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      {ev.matricula}
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="font-extrabold text-slate-900">{ev.nomeFuncionario}</div>
                      <div className="text-[10px] text-slate-500">{ev.cargo} • {ev.setor}</div>
                    </td>

                    <td className="py-2.5 px-2 font-bold uppercase text-slate-800">
                      {ev.tipoRefeicao}
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="font-mono text-slate-700 font-semibold">{ev.equipamentoCodigo}</div>
                      <div className="text-[10px] text-slate-400">{ev.equipamentoLocal}</div>
                    </td>

                    <td className="py-2.5 px-2 text-center">
                      <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-slate-800 text-white">
                        {ev.origem}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      {isDup ? (
                        <div className="space-y-0.5">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                            Possível duplicidade
                          </span>
                          <div className="text-[9px] text-amber-700 font-medium max-w-xs truncate" title={ev.motivoDuplicidade}>
                            {ev.motivoDuplicidade}
                          </div>
                        </div>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Comprovado
                        </span>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Rodapé da Tabela com Link para Medição */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Eventos transmitidos em tempo real via API REST / WebSocket.</span>
          <button
            type="button"
            onClick={() => setActiveModule('medicao-faturamento')}
            className="text-[#c62828] font-bold hover:underline"
          >
            Ver como esses eventos consolidam o Faturamento Savvy →
          </button>
        </div>
      </div>

    </div>
  );
}
