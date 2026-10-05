"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { STATUS_INTEGRACOES, HOSPITAIS } from '@/data/mockData';
import { 
  Cpu, 
  Scale, 
  ScanFace, 
  Wifi, 
  Radio, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Clock,
  Server,
  Layers,
  ArrowRight
} from 'lucide-react';

export function CentralIntegracoesView() {
  const { selectedHospital, setSelectedHospital, setActiveModule } = useApp();
  const [balancas, setBalancas] = useState(STATUS_INTEGRACOES.balancas);
  const [biometria, setBiometria] = useState(STATUS_INTEGRACOES.biometria);
  const [pingando, setPingando] = useState(false);

  const balancasFiltradas = balancas.filter(b => {
    if (selectedHospital === 'consolidado') return true;
    return b.hospitalId === selectedHospital;
  });

  const biometriaFiltrada = biometria.filter(b => {
    if (selectedHospital === 'consolidado') return true;
    return b.hospitalId === selectedHospital;
  });

  const handleTestPing = () => {
    setPingando(true);
    setTimeout(() => {
      setPingando(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header da Central de Integrações */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Hardware & Telemetria
              </span>
              <span className="text-xs text-slate-500">• Camada de Conectividade</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Central de Integrações (Balanças & Biometria)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoramento em tempo real do estado de conexão dos equipamentos industriais de pesagem e catracas biométricas do Grupo Savvy.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestPing}
              disabled={pingando}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${pingando ? 'animate-spin' : ''}`} />
              <span>Testar Conectividade Geral</span>
            </button>
          </div>
        </div>

        {/* Status Geral */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-800">Serviço de Comunicação (Scale & Face Adapter):</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Operacional e Conectado
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Latência média: 14ms • Protocolo TCP/IP Socket & HTTP Webhook
          </span>
        </div>
      </div>

      {/* SEÇÃO 1: CARDS DE BALANÇAS FÍSICAS (STATUS: ONLINE / OFFLINE) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Balanças Industriais Conectadas ({balancasFiltradas.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveModule('separacao-pesagem')}
            className="text-xs font-bold text-[#c62828] hover:underline flex items-center gap-1"
          >
            <span>Ir para Separação & Pesagem</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {balancasFiltradas.map((bal) => (
            <div 
              key={bal.id} 
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {bal.id.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    bal.status === 'Online' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${bal.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    {bal.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                  {bal.nome}
                </h3>
                <div className="text-[11px] text-slate-500 mt-1">
                  Modelo: {bal.modelo}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>IP/Porta:</span>
                  <code className="font-mono text-[10px] text-slate-800 font-bold">{bal.ipPorta}</code>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Pesagens Hoje:</span>
                  <strong className="text-slate-900 font-mono">{bal.pesagensHoje} eventos</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Última Aferição:</span>
                  <span className="text-slate-700 text-[10px] font-mono">{bal.ultimaPesagem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO 2: CARDS DE TERMINAIS BIOMÉTRICOS (EVENTOS RECEBIDOS HOJE) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ScanFace className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Terminais de Biometria Facial ({biometriaFiltrada.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveModule('refeitorio')}
            className="text-xs font-bold text-[#c62828] hover:underline flex items-center gap-1"
          >
            <span>Ver Stream de Eventos do Refeitório</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {biometriaFiltrada.map((bio) => (
            <div 
              key={bio.id} 
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {bio.id.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    bio.status === 'Online' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${bio.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    {bio.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                  {bio.nome}
                </h3>
                <div className="text-[11px] text-slate-500 mt-1">
                  Local: {bio.localizacao}
                </div>
              </div>

              {/* Destaque Exigido: Eventos Recebidos Hoje */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Eventos Recebidos Hoje:
                </span>
                <div className="font-mono text-xl font-black text-emerald-800">
                  {bio.eventosHoje.toLocaleString('pt-BR')} <span className="text-xs font-normal text-emerald-600">refeições</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>IP/Porta:</span>
                  <code className="font-mono text-[10px] text-slate-800 font-bold">{bio.ipPorta}</code>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Última Leitura:</span>
                  <span className="text-slate-700 text-[10px] font-mono">{bio.ultimaCaptura}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
