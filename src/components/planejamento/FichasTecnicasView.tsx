"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FICHAS_TECNICAS, PRODUTOS_BASE } from '@/data/mockData';
import { TechnicalSheet } from '@/types';
import { 
  ClipboardList, 
  Calculator, 
  ChefHat, 
  Layers, 
  Plus, 
  Clock, 
  Scale, 
  DollarSign, 
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function FichasTecnicasView() {
  const { openErpBackofficeModal, setActiveModule } = useApp();
  const [fichas, setFichas] = useState<TechnicalSheet[]>(FICHAS_TECNICAS);
  const [fichaSelecionadaId, setFichaSelecionadaId] = useState<string>(FICHAS_TECNICAS[0].id);
  const [quantidadeRefeicoes, setQuantidadeRefeicoes] = useState<number>(500); // 500 refeições do exemplo

  const fichaAtiva = fichas.find(f => f.id === fichaSelecionadaId) || fichas[0];

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Eixo 1: Planejamento
              </span>
              <span className="text-xs text-slate-500">• Engenharia de Cardápio</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Fichas Técnicas & Cálculo Per Capita
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Relação de ingredientes, fatores de correção/cocção, per capita líquido e cálculo volumétrico para produção hospitalar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('produtos')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Insumos ERP OCT6</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('requisicoes')}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Gerar Requisição D-1</span>
            </button>
          </div>
        </div>

        {/* Notificação da Regra de Cálculo */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
          <Calculator className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Fórmula Canônica Hospitalar:</strong> <code>Quantidade Total Necessária (kg) = (Refeições Planejadas × Per Capita em gramas × Fator de Correção) ÷ 1.000</code>. Permite projeção exata das requisições ao almoxarifado sem sobras ou déficits.
          </span>
        </div>
      </div>

      {/* Grid Principal: Seletor de Fichas à Esquerda, Calculadora e Ingredientes à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lista de Fichas Técnicas Cadastradas */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Preparações Cadastradas ({fichas.length})
            </h3>
            <span className="text-[10px] text-slate-400">Padrão Savvy</span>
          </div>

          <div className="space-y-2">
            {fichas.map((f) => {
              const isSelected = f.id === fichaAtiva.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFichaSelecionadaId(f.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-red-50/80 border-[#c62828] ring-1 ring-red-400 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {f.tipoRefeicao}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      R$ {f.custoPorcao.toFixed(2).replace('.', ',')} / porção
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 mb-1">
                    {f.nomePrato}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{f.familiaPrincipal}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {f.tempoPreparoMinutos} min
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detalhamento da Ficha Selecionada + Calculadora Interativa Per Capita */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Calculadora Interativa de Refeições */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
                  Simulador de Volume & Demanda
                </span>
                <h2 className="text-lg font-black text-white mt-1">
                  {fichaAtiva.nomePrato}
                </h2>
              </div>

              {/* Input Dinâmico de Quantidade de Refeições */}
              <div className="bg-slate-800/90 border border-slate-700 p-2.5 rounded-xl flex items-center space-x-3 shrink-0">
                <label className="text-xs font-semibold text-slate-300">
                  Refeições a Produzir:
                </label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  step="50"
                  value={quantidadeRefeicoes}
                  onChange={(e) => setQuantidadeRefeicoes(Math.max(1, Number(e.target.value)))}
                  className="w-24 px-2 py-1 bg-white text-slate-900 rounded-lg text-sm font-bold text-center border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Destaque Visual do Exemplo Solicitado */}
            <div className="p-3.5 bg-red-950/40 border border-red-800/50 rounded-xl">
              <div className="flex items-center space-x-2 text-xs text-red-200 font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Cálculo Per Capita em Tempo Real:</span>
              </div>
              <div className="text-sm sm:text-base font-mono font-extrabold text-white">
                {quantidadeRefeicoes} refeições × {fichaAtiva.ingredientes[0].quantidadePerCapitaG} g de proteína ={' '}
                <span className="text-amber-300 text-lg sm:text-xl underline decoration-amber-400">
                  {((quantidadeRefeicoes * fichaAtiva.ingredientes[0].quantidadePerCapitaG) / 1000).toFixed(1)} kg necessários
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                (Considerando rendimento per capita de {fichaAtiva.ingredientes[0].quantidadePerCapitaG}g líquida por paciente/comensal)
              </p>
            </div>
          </div>

          {/* Tabela de Ingredientes e Relação Per Capita */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Ingredientes Relacionados & Total Necessário
                </h3>
                <p className="text-xs text-slate-500">
                  Base dimensionada para {quantidadeRefeicoes} refeições hospitalares
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                Custo Total Estimado: R${' '}
                {(fichaAtiva.custoPorcao * quantidadeRefeicoes).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Ingrediente / Insumo</th>
                    <th className="py-2.5 px-3 text-center">Per Capita Líquido</th>
                    <th className="py-2.5 px-3 text-center">Fator Correção (FC)</th>
                    <th className="py-2.5 px-3 text-center">Per Capita Bruto</th>
                    <th className="py-2.5 px-3 text-right">Qtd. Total Necessária</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {fichaAtiva.ingredientes.map((ing, idx) => {
                    const totalNecessarioKg = ((quantidadeRefeicoes * ing.quantidadePerCapitaG * ing.fatorCorrecao) / 1000);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {ing.produtoNome}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                          {ing.quantidadePerCapitaG} {ing.unidade}
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-500 font-mono">
                          {ing.fatorCorrecao.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-600 font-mono">
                          {(ing.quantidadePerCapitaG * ing.fatorCorrecao).toFixed(1)} {ing.unidade}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="font-mono font-extrabold text-[#c62828] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                            {totalNecessarioKg.toFixed(2)} kg
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Modo de Preparo e Instruções Sanitárias */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Diretriz de Preparo & Controle de Temperatura:
              </span>
              <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 leading-relaxed italic">
                &ldquo;{fichaAtiva.modoPreparo}&rdquo;
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
