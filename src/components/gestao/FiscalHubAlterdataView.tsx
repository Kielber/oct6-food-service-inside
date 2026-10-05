"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FiscalHubDocument } from '@/types';
import { 
  FileCode2, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';

export function FiscalHubAlterdataView() {
  const { fiscalDocs, syncAlterdata, openErpBackofficeModal } = useApp();
  const [docSelecionadoId, setDocSelecionadoId] = useState<string>(fiscalDocs[0].id);
  const [sincronizando, setSincronizando] = useState(false);

  const docAtivo = fiscalDocs.find(d => d.id === docSelecionadoId) || fiscalDocs[0];

  const handleSync = (id: string) => {
    setSincronizando(true);
    setTimeout(() => {
      syncAlterdata(id);
      setSincronizando(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Eixo 3: Gestão & Integrações
              </span>
              <span className="text-xs text-slate-500">• Ecossistema OCT6</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              OCT6 Fiscal Hub & Integração Alterdata
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Captura automática de XMLs de NF-e, manifesto de destinatário, recepção de estoque no ERP OCT6 e disponibilização contábil para o Alterdata.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('compras')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Compras no ERP OCT6</span>
            </button>
          </div>
        </div>

        {/* Pipeline Arquitetural Exigido */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Fluxo Oficial de Integração Fiscal:
          </div>

          <div className="p-3.5 bg-slate-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Fornecedor (NF-e)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
            
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">2</span>
              <span className="font-bold text-red-300">OCT6 Fiscal Hub (XML)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />

            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">3</span>
              <span>ERP OCT6 (Entrada/Estoque)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />

            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-[10px]">4</span>
              <span>Repositório Fiscal</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />

            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">5</span>
              <span className="font-bold text-emerald-300">Alterdata (Contábil)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Documentos do Fiscal Hub e Detalhes do XML */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tabela de Documentos Fiscais Recebidos */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
              Documentos XML Capturados pelo OCT6 Fiscal Hub ({fiscalDocs.length})
            </h3>
            <span className="text-[11px] text-slate-400">Ambiente Simulado Inside</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100/90 text-slate-700 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Número / Série</th>
                  <th className="py-2.5 px-3">Fornecedor / CNPJ</th>
                  <th className="py-2.5 px-2">Emissão</th>
                  <th className="py-2.5 px-2 text-right">Valor Total</th>
                  <th className="py-2.5 px-2">Pedido ERP</th>
                  <th className="py-2.5 px-2 text-center">Status Entrada</th>
                  <th className="py-2.5 px-2 text-center">Alterdata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {fiscalDocs.map((doc) => {
                  const isSel = doc.id === docAtivo.id;
                  return (
                    <tr 
                      key={doc.id}
                      onClick={() => setDocSelecionadoId(doc.id)}
                      className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                        isSel ? 'bg-red-50/40' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        {doc.numeroNota} / {doc.serie}
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900">{doc.fornecedorNome}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{doc.cnpj}</div>
                      </td>

                      <td className="py-2.5 px-2 font-mono text-slate-600">
                        {doc.dataEmissao}
                      </td>

                      <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900">
                        R$ {doc.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-2.5 px-2 font-mono text-slate-700">
                        {doc.pedidoRelacionadoERP}
                      </td>

                      <td className="py-2.5 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {doc.statusEntradaERP}
                        </span>
                      </td>

                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          doc.statusAlterdata === 'Enviado' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : doc.statusAlterdata === 'Processado'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {doc.statusAlterdata}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detalhes do Documento Selecionado & Sincronização Alterdata */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center space-x-1.5">
                <FileCode2 className="w-4 h-4 text-[#c62828]" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  Inspeção do XML Fiscal
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">NF {docAtivo.numeroNota}</span>
            </div>

            {/* Chave de Acesso Fictícia Obrigatória */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs">
              <span className="font-bold text-slate-600 block text-[10px] uppercase">
                Chave de Acesso NF-e (44 Dígitos):
              </span>
              <code className="text-[11px] font-mono font-bold text-slate-800 break-all block bg-white p-2 rounded border border-slate-200">
                {docAtivo.chaveNFe}
              </code>
            </div>

            {/* Itens do XML */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Itens Descritos no XML:
              </span>
              {docAtivo.detalhesItens.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs space-y-1">
                  <div className="font-bold text-slate-900">{item.descricao}</div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>NCM: {item.ncm} • CFOP: {item.cfop}</span>
                    <strong className="text-slate-800">{item.qtd} {item.unidade}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Alterdata */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Status de Envio Alterdata:</span>
                <span className="font-bold text-slate-900">{docAtivo.statusAlterdata}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Os arquivos XML permanecem arquivados no repositório fiscal em formato assinado digitalmente.
              </p>
            </div>
          </div>

          {/* Botão de Disparo para o Alterdata */}
          <button
            type="button"
            disabled={sincronizando || docAtivo.statusAlterdata === 'Enviado'}
            onClick={() => handleSync(docAtivo.id)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${
              docAtivo.statusAlterdata === 'Enviado'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {sincronizando ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Transmitindo ao Alterdata...</span>
              </>
            ) : docAtivo.statusAlterdata === 'Enviado' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>XML já disponibilizado ao Alterdata</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Disponibilizar ao Sistema Alterdata</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
