"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  FileCode, 
  Database, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export function ErpBackofficeModal() {
  const { erpModalData, closeErpBackofficeModal } = useApp();

  if (!erpModalData || !erpModalData.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho do Modal */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Módulo Nativo do ERP OCT6
                </span>
                <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.2 rounded font-mono">
                  Backoffice
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                {erpModalData.title}
              </h3>
            </div>
          </div>

          <button 
            type="button"
            onClick={closeErpBackofficeModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1">
              Diretriz Arquitetural Fundamental:
            </p>
            {erpModalData.description}
          </div>

          {/* Dados Técnicos do ERP OCT6 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center space-x-1.5 text-slate-500 font-semibold mb-1">
                <FileCode className="w-3.5 h-3.5 text-[#c62828]" />
                <span>Controller Existente no ERP:</span>
              </div>
              <code className="text-[11px] font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded block">
                {erpModalData.erpController}
              </code>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center space-x-1.5 text-slate-500 font-semibold mb-1">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Modelos & Tabelas Reutilizados:</span>
              </div>
              <code className="text-[11px] font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded block">
                {erpModalData.erpModel}
              </code>
            </div>
          </div>

          {/* Pontos de Integração e Storytelling */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Como o Food Service se comunica com este módulo:
            </h4>
            <div className="space-y-2">
              {erpModalData.foodServiceInteraction.map((item, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contexto do Cliente Savvy */}
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Cliente <strong>Grupo Savvy</strong> operando em 4 hospitais cadastrados no ERP como filiais com centros de custo segregados.
              </span>
            </div>
          </div>

        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={closeErpBackofficeModal}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            Entendido, Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
