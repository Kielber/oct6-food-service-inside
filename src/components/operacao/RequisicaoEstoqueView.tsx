"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { REQUISICOES_ESTOQUE_D1, FAMILIAS_ALIMENTOS, PRODUTOS_BASE } from '@/data/mockData';
import { StockRequisition, MealType } from '@/types';
import { 
  PackageCheck, 
  Calendar, 
  Layers, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck
} from 'lucide-react';

export function RequisicaoEstoqueView() {
  const { requisicoes, atenderRequisicao, openErpBackofficeModal, selectedHospital, setActiveModule } = useApp();

  // Estado interativo para nova requisição D-1 pela nutricionista
  const [familiaSel, setFamiliaSel] = useState('fam-proteinas');
  const [produtoSel, setProdutoSel] = useState('prod-coxao-mole');
  const [almocoRef, setAlmocoRef] = useState<number>(45.0); // 45 kg
  const [almocoNac, setAlmocoNac] = useState<number>(48.0); // 48 kg
  const [almocoCd, setAlmocoCd] = useState<number>(17.0);   // 17 kg
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  // Produto selecionado
  const prod = PRODUTOS_BASE.find(p => p.id === produtoSel) || PRODUTOS_BASE[0];

  // Cálculos da requisição
  const totalSolicitado = Number((almocoRef + almocoNac + almocoCd).toFixed(1)); // 110 kg
  const estoqueDisponivel = prod.estoqueDisponivel; // 75 kg (ou conforme mock)
  const estoqueReservado = prod.estoqueReservado;   // 345 kg
  const saldoApos = Number((estoqueDisponivel - totalSolicitado).toFixed(1));
  const deficit = saldoApos < 0 ? Math.abs(saldoApos) : 0;

  const handleConfirmarRequisicao = (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemSucesso(true);
    setTimeout(() => setMensagemSucesso(false), 4000);
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
              <span className="text-xs text-slate-500">• O que precisa acontecer hoje?</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Requisição de Insumos ao Estoque (D-1)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Geração de requisições de matéria-prima pela equipe de nutrição para o dia seguinte com distribuição por dietas e reserva imediata no ERP OCT6.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('estoque')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Saldos no Estoque ERP</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('separacao-pesagem')}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Ir para Balança de Separação</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Formulário Interativo da Nutricionista à Esquerda, Cartão de Resposta Imediata à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulário da Nutricionista (D-1) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Gerar Nova Requisição para o Dia Seguinte (03/10/2026)
              </h2>
              <p className="text-xs text-slate-500">
                Preencha a distribuição por setor de consumo
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Turno: Almoço D-1
            </span>
          </div>

          <form onSubmit={handleConfirmarRequisicao} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Família de Alimento:
                </label>
                <select
                  value={familiaSel}
                  onChange={(e) => setFamiliaSel(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-1 focus:ring-red-500"
                >
                  {FAMILIAS_ALIMENTOS.map(f => (
                    <option key={f.id} value={f.id}>{f.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Produto / Insumo Requisitado:
                </label>
                <select
                  value={produtoSel}
                  onChange={(e) => setProdutoSel(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-1 focus:ring-red-500"
                >
                  {PRODUTOS_BASE.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Distribuição Fictícia Obrigatória do Exemplo */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
                  Distribuição por Público / Dieta Hospitalar:
                </span>
                <span className="text-[11px] font-bold text-[#c62828]">
                  Total: {totalSolicitado.toFixed(1)} kg
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Almoço REF */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Almoço REF (Refeitório):
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={almocoRef}
                      onChange={(e) => setAlmocoRef(Number(e.target.value))}
                      className="w-full font-mono font-bold text-sm text-slate-900 border border-slate-300 rounded px-2 py-1"
                    />
                    <span className="text-slate-500 font-semibold">kg</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Funcionários / Acomp.</span>
                </div>

                {/* Almoço N+AC */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Almoço N+AC:
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={almocoNac}
                      onChange={(e) => setAlmocoNac(Number(e.target.value))}
                      className="w-full font-mono font-bold text-sm text-slate-900 border border-slate-300 rounded px-2 py-1"
                    />
                    <span className="text-slate-500 font-semibold">kg</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Nutrição Clínica Leitos</span>
                </div>

                {/* Almoço CD */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Almoço CD:
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={almocoCd}
                      onChange={(e) => setAlmocoCd(Number(e.target.value))}
                      className="w-full font-mono font-bold text-sm text-slate-900 border border-slate-300 rounded px-2 py-1"
                    />
                    <span className="text-slate-500 font-semibold">kg</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Centro Cirúrgico / Dietas</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Nutricionista solicitante: Dra. Camila Vasconcelos (CRN-3 18.492)
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-[#c62828] hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-all"
              >
                Gerar Requisição D-1 & Reservar Estoque
              </button>
            </div>

            {mensagemSucesso && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  Requisição gerada com sucesso! 110,0 kg reservados no almoxarifado do ERP OCT6 para D-1.
                </span>
              </div>
            )}

          </form>
        </div>

        {/* Cartão de Resposta Imediata (Exigência Obrigatória) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-3">
              <FileCheck className="w-5 h-5 text-[#c62828]" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Conferência Imediata de Saldos
                </h3>
                <p className="text-[11px] text-slate-500">
                  Verificação em tempo real no módulo de Estoque do ERP OCT6
                </p>
              </div>
            </div>

            {/* Painel com as 5 métricas obrigatórias imediatas */}
            <div className="space-y-2.5 text-xs">
              
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-600">Quantidade Solicitada:</span>
                <span className="font-mono font-extrabold text-slate-900 text-sm">
                  {totalSolicitado.toFixed(1)} kg
                </span>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex justify-between items-center">
                <span className="font-semibold text-blue-900">Estoque Disponível no ERP:</span>
                <span className="font-mono font-extrabold text-blue-900 text-sm">
                  {estoqueDisponivel.toFixed(1)} kg
                </span>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex justify-between items-center">
                <span className="font-semibold text-amber-900">Quantidade Já Reservada:</span>
                <span className="font-mono font-extrabold text-amber-900 text-sm">
                  {estoqueReservado.toFixed(1)} kg
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Saldo Após Atendimento:</span>
                <span className={`font-mono font-black text-sm ${saldoApos >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {saldoApos.toFixed(1)} kg
                </span>
              </div>

              <div className={`p-3 rounded-lg border flex justify-between items-center ${
                deficit > 0 
                  ? 'bg-red-50 border-red-200 text-red-900' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <span className="font-bold">Eventual Déficit de Separação:</span>
                <span className="font-mono font-black text-sm">
                  {deficit > 0 ? `-${deficit.toFixed(1)} kg` : '0,0 kg (Atendimento Total)'}
                </span>
              </div>

            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Garantia Operacional:</span> A reserva é gravada diretamente na tabela <code>estoque_movimentacoes</code> do ERP OCT6, bloqueando o lote para a pesagem da equipe do almoxarifado.
          </div>
        </div>

      </div>

      {/* Histórico de Requisições D-1 Pendentes e Atendidas */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Requisições Recentes Registradas (Hospital Unidade 01 & 02)
          </h3>
          <span className="text-[11px] text-slate-400">Total: {requisicoes.length} requisições</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Código</th>
                <th className="py-2.5 px-3">Hospital / Unidade</th>
                <th className="py-2.5 px-3">Produto</th>
                <th className="py-2.5 px-2 text-right">REF (kg)</th>
                <th className="py-2.5 px-2 text-right">N+AC (kg)</th>
                <th className="py-2.5 px-2 text-right">CD (kg)</th>
                <th className="py-2.5 px-2 text-right font-bold">Total Solicitado</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requisicoes.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{req.codigoRequisicao}</td>
                  <td className="py-2.5 px-3 text-slate-700">{req.hospitalId === 'hospital-01' ? 'Hospital Unidade 01' : 'Hospital Unidade 02'}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{req.produtoNome}</td>
                  <td className="py-2.5 px-2 text-right font-mono">{req.distribuicao.almocoRefKg.toFixed(1)}</td>
                  <td className="py-2.5 px-2 text-right font-mono">{req.distribuicao.almocoNacKg.toFixed(1)}</td>
                  <td className="py-2.5 px-2 text-right font-mono">{req.distribuicao.almocoCdKg.toFixed(1)}</td>
                  <td className="py-2.5 px-2 text-right font-mono font-black text-[#c62828]">{req.totalSolicitadoKg.toFixed(1)} kg</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'Atendida Total' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveModule('separacao-pesagem')}
                      className="text-xs font-bold text-[#c62828] hover:underline"
                    >
                      Pesar na Balança →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
