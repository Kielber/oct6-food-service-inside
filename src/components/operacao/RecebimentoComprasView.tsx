"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PurchaseReceiptItem } from '@/types';
import { 
  Truck, 
  Scale, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  AlertOctagon, 
  Layers, 
  Building2, 
  Check, 
  Info,
  Clock
} from 'lucide-react';

export function RecebimentoComprasView() {
  const { purchaseReceipts, setReceiptStatus, openErpBackofficeModal } = useApp();
  const [selectedReceiptId, setSelectedReceiptId] = useState<string>(purchaseReceipts[0].id);
  const [justificativaOcorrencia, setJustificativaOcorrencia] = useState('');
  const [feedbackMensagem, setFeedbackMensagem] = useState<string | null>(null);

  const ativo = purchaseReceipts.find(r => r.id === selectedReceiptId) || purchaseReceipts[0];

  const handleAction = (status: PurchaseReceiptItem['statusConferencia'], desc: string) => {
    setReceiptStatus(ativo.id, status);
    setFeedbackMensagem(desc);
    setTimeout(() => setFeedbackMensagem(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Eixo 2: Operação Diária
              </span>
              <span className="text-xs text-slate-500">• Conferência Física de Entrada</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Recebimento de Compras com Pesagem em Balança
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Confronto tríplice automatizado: Pedido de Compra ERP × DANFE/XML Fiscal Hub × Peso Aferido na Doca com tolerância contratual.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('compras')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Pedidos no Compras ERP</span>
            </button>
            <button
              type="button"
              onClick={() => openErpBackofficeModal('estoque')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Entrada no Estoque ERP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Lista de Cargas na Doca à Esquerda, Painel de Confronto à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lista de Recebimentos Pendentes / Na Doca */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Cargas em Conferência ({purchaseReceipts.length})
            </h3>
            <span className="text-[10px] text-slate-400">Doca Hospital Unidade 01</span>
          </div>

          <div className="space-y-2">
            {purchaseReceipts.map((rec) => {
              const isSelected = rec.id === ativo.id;
              return (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => setSelectedReceiptId(rec.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-red-50/90 border-[#c62828] ring-1 ring-red-400 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono">
                      NF {rec.numeroNFe}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{rec.dataChegada}</span>
                  </div>

                  <div className="font-extrabold text-xs text-slate-900 mb-0.5">
                    {rec.produtoNome}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mb-2">
                    {rec.fornecedorNome}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">NF: <strong>{rec.quantidadeNFeKg.toFixed(1)} kg</strong></span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      rec.statusConferencia === 'Aceito Conforme'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.statusConferencia === 'Aguardando Pesagem'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.statusConferencia}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel Central de Confronto Dimensional: Pedido x NF x Balança */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            
            {/* Cabeçalho da Carga Ativa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c62828] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Pedido ERP: {ativo.numeroPedidoERP}
                  </span>
                  <span className="text-xs text-slate-400">• Chave NF-e: {ativo.chaveNfe.substring(0, 16)}...</span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                  {ativo.produtoNome}
                </h2>
                <div className="text-xs text-slate-500">
                  Fornecedor: <strong>{ativo.fornecedorNome}</strong> (CNPJ: {ativo.cnpjFornecedor})
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  ativo.statusConferencia === 'Aceito Conforme'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  Status: {ativo.statusConferencia}
                </span>
              </div>
            </div>

            {/* As 5 Métricas Obrigatórias Exigidas no Exemplo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              
              {/* 1. Quantidade Pedida */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Qtd. Pedida (ERP):
                </span>
                <div className="font-mono text-base font-extrabold text-slate-900">
                  {ativo.quantidadePedidaKg.toFixed(3).replace('.', ',')} kg
                </div>
                <span className="text-[10px] text-slate-400">Contrato de Fornecimento</span>
              </div>

              {/* 2. Quantidade da NF */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                  Qtd. na NF-e:
                </span>
                <div className="font-mono text-base font-extrabold text-blue-900">
                  {ativo.quantidadeNFeKg.toFixed(3).replace('.', ',')} kg
                </div>
                <span className="text-[10px] text-blue-700">XML Fiscal Hub</span>
              </div>

              {/* 3. Quantidade Pesada na Balança */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Qtd. Pesada (Balança):
                </span>
                <div className="font-mono text-base font-black text-emerald-700">
                  {ativo.quantidadePesadaBalancaKg.toFixed(3).replace('.', ',')} kg
                </div>
                <span className="text-[10px] text-emerald-700">Aferição Toledo Doca</span>
              </div>

              {/* 4. Divergência Absoluta */}
              <div className={`p-3 border rounded-xl space-y-1 ${
                ativo.divergenciaAbsolutaKg < 0 
                  ? 'bg-red-50/70 border-red-200 text-red-900' 
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  Divergência Absoluta:
                </span>
                <div className="font-mono text-base font-black">
                  {ativo.divergenciaAbsolutaKg > 0 ? '+' : ''}
                  {ativo.divergenciaAbsolutaKg.toFixed(3).replace('.', ',')} kg
                </div>
                <span className="text-[10px] opacity-70">Balança - NF</span>
              </div>

              {/* 5. Divergência Percentual */}
              <div className={`p-3 border rounded-xl space-y-1 ${
                Math.abs(ativo.divergenciaPercentual) > ativo.toleranciaContratualPercent
                  ? 'bg-red-50/70 border-red-200 text-red-900'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
              }`}>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  Divergência (%):
                </span>
                <div className="font-mono text-base font-black">
                  {ativo.divergenciaPercentual > 0 ? '+' : ''}
                  {ativo.divergenciaPercentual.toFixed(2)}%
                </div>
                <span className="text-[10px] opacity-70">
                  Tolerância: ±{ativo.toleranciaContratualPercent}%
                </span>
              </div>

            </div>

            {/* Parecer Técnico do Recebimento */}
            <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
              <div className="flex items-center space-x-2 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Análise de Tolerância na Doca:</span>
              </div>
              <p className="leading-relaxed">
                {ativo.observacaoFiscal}
              </p>
            </div>

            {/* Painel com as 5 Ações Simuladas Obrigatórias */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
                Ações Operacionais de Recebimento (Simulação):
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
                
                {/* 1. Aceitar */}
                <button
                  type="button"
                  onClick={() => handleAction('Aceito Conforme', 'Carga aceita conforme e integrada ao Estoque do ERP!')}
                  className="p-2.5 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all flex flex-col items-center justify-center gap-1 text-center"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aceitar</span>
                </button>

                {/* 2. Aceitar com divergência */}
                <button
                  type="button"
                  onClick={() => handleAction('Aceito com Divergência', 'Aceite com divergência registrado! Gerada cobrança de diferença ao fornecedor.')}
                  className="p-2.5 rounded-lg font-bold bg-amber-500 hover:bg-amber-400 text-white shadow-xs transition-all flex flex-col items-center justify-center gap-1 text-center"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Aceitar c/ Divergência</span>
                </button>

                {/* 3. Aceitar parcialmente */}
                <button
                  type="button"
                  onClick={() => handleAction('Aceito Parcialmente', 'Entrada parcial registrada! Saldo remanescente estornado no Compras ERP.')}
                  className="p-2.5 rounded-lg font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-all flex flex-col items-center justify-center gap-1 text-center"
                >
                  <Check className="w-4 h-4" />
                  <span>Aceitar Parcialmente</span>
                </button>

                {/* 4. Recusar */}
                <button
                  type="button"
                  onClick={() => handleAction('Recusado', 'Carga recusada na doca! Devolução fiscal emitida para a transportadora.')}
                  className="p-2.5 rounded-lg font-bold bg-red-600 hover:bg-red-500 text-white shadow-xs transition-all flex flex-col items-center justify-center gap-1 text-center"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Recusar Carga</span>
                </button>

                {/* 5. Registrar ocorrência */}
                <button
                  type="button"
                  onClick={() => handleAction('Ocorrência Registrada', 'Ocorrência formal registrada no cadastro do fornecedor no ERP OCT6!')}
                  className="p-2.5 rounded-lg font-bold bg-slate-800 hover:bg-slate-700 text-white shadow-xs transition-all flex flex-col items-center justify-center gap-1 text-center"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>Registrar Ocorrência</span>
                </button>

              </div>
            </div>

            {/* Feedback da Ação */}
            {feedbackMensagem && (
              <div className="p-3 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feedbackMensagem}</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
