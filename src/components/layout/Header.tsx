"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HOSPITAIS } from '@/data/mockData';
import { HospitalUnitId } from '@/types';
import { 
  Building2, 
  ChevronDown, 
  Bell, 
  ShieldCheck, 
  Activity, 
  User, 
  Scale, 
  ScanFace,
  Search,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export function Header() {
  const { selectedHospital, setSelectedHospital, openErpBackofficeModal } = useApp();
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentHospitalData = HOSPITAIS.find(h => h.id === selectedHospital);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Barra Institucional Superior OCT6 - Savvy */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">
              OCT6 Food Service — Inside V1
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              Cliente: <strong className="text-white">Grupo Savvy</strong> (Alimentação Coletiva Hospitalar)
            </span>
            <span className="hidden md:inline bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2 py-0.2 rounded text-[10px] font-medium">
              Vertical Especializada
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-400">
            <button 
              onClick={() => openErpBackofficeModal('estoque')}
              className="hover:text-white flex items-center gap-1 transition-colors text-[10px]"
              title="Ver arquitetura de integração com o ERP OCT6"
            >
              <Layers className="w-3 h-3 text-rose-400" />
              <span>Backoffice: ERP OCT6 Nativo</span>
            </button>
            <span className="text-slate-700">•</span>
            <span className="text-slate-300 hidden sm:inline">02/10/2026</span>
          </div>

        </div>
      </div>

      {/* Barra Principal (Topbar) */}
      <div className="px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Lado Esquerdo: Identidade do Produto e Cliente */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2.5">
              {/* Logo OCT6 Icon */}
              <div className="w-9 h-9 rounded-lg bg-[#c62828] text-white flex items-center justify-center font-black text-sm shadow-sm shadow-red-900/20">
                OCT6
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-base font-extrabold text-slate-900 tracking-tight">
                    Food Service
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-100 text-[#c62828] rounded border border-red-200">
                    SAVVY INSIDE
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium leading-none">
                  Gestão Hospitalar de Refeições
                </div>
              </div>
            </div>

            {/* Separador vertical */}
            <div className="hidden lg:block h-7 w-px bg-slate-200 ml-2" />

            {/* Seletor Reativo de Unidade / Hospital */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-all shadow-2xs"
                title="Selecione a Unidade Operacional ou Visão Consolidada"
              >
                <Building2 className="w-3.5 h-3.5 text-[#c62828]" />
                <span>
                  {selectedHospital === 'consolidado' 
                    ? 'Consolidado (Todas as 4 Unidades)' 
                    : currentHospitalData?.nome}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {showUnitDropdown && (
                <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Selecione a Operação Hospitalar:
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedHospital('consolidado');
                      setShowUnitDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      selectedHospital === 'consolidado' ? 'bg-red-50/80 text-[#c62828] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#c62828]" />
                      <span>Consolidado (4 Hospitais)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">7.460 ref/dia</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  {HOSPITAIS.map((hosp) => (
                    <button
                      key={hosp.id}
                      type="button"
                      onClick={() => {
                        setSelectedHospital(hosp.id);
                        setShowUnitDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        selectedHospital === hosp.id ? 'bg-red-50/80 text-[#c62828] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-800">{hosp.nome}</div>
                        <div className="text-[10px] text-slate-500">{hosp.cidade} • {hosp.leitosAtivos} leitos</div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded font-medium ${
                          hosp.statusOperacao === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {hosp.statusOperacao}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lado Direito: Status das Integrações & Perfil */}
          <div className="flex items-center space-x-3">
            
            {/* Telemetria Rápida */}
            <div className="hidden xl:flex items-center space-x-2 text-[11px] bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
              <span className="flex items-center gap-1 text-slate-600">
                <Scale className="w-3 h-3 text-emerald-600" />
                <span>Balanças: <strong>Online (4/4)</strong></span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-slate-600">
                <ScanFace className="w-3 h-3 text-emerald-600" />
                <span>Biometria: <strong>Ativa (12 ter.)</strong></span>
              </span>
            </div>

            {/* Notificações */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Alertas operacionais"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#c62828] ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="text-xs font-bold text-slate-800">Alertas da Operação</span>
                    <span className="text-[10px] text-slate-400">Atualizado agora</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-red-50 border border-red-100 text-red-900">
                      <div className="font-semibold text-[11px]">Risco de Ruptura: Filé de Tilápia</div>
                      <div className="text-[10px] text-red-700">Hospital 01: Estoque de apenas 1.8 dias. Pedido de compra pendente.</div>
                    </div>
                    <div className="p-2 rounded bg-amber-50 border border-amber-100 text-amber-900">
                      <div className="font-semibold text-[11px]">Divergência na Pesagem de Doca</div>
                      <div className="text-[10px] text-amber-700">Tomate Italiano: -12,35 kg em relação à NF-e no Hospital 01.</div>
                    </div>
                    <div className="p-2 rounded bg-blue-50 border border-blue-100 text-blue-900">
                      <div className="font-semibold text-[11px]">Possível Duplicidade no Refeitório</div>
                      <div className="text-[10px] text-blue-700">Dupla marcação detectada na catraca 02 para funcionário TEC-3301.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Usuário da Savvy Logado */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                CV
              </div>
              <div className="hidden md:block leading-tight text-left">
                <div className="text-xs font-bold text-slate-800">
                  Dra. Camila Vasconcelos
                </div>
                <div className="text-[10px] text-slate-500">
                  Coordenação de Nutrição • Savvy
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
