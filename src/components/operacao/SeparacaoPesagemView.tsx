"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Scale, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Cpu, 
  Layers, 
  History, 
  ArrowRight,
  Sparkles,
  Wifi,
  Radio
} from 'lucide-react';

export function SeparacaoPesagemView() {
  const { 
    weighingState, 
    simulateWeightAddition, 
    resetWeighingSimulation, 
    openErpBackofficeModal, 
    setActiveModule 
  } = useApp();

  const [inputManualPeso, setInputManualPeso] = useState<string>('');

  const solicitado = weighingState.solicitadoKg; // 345,000 kg
  const pesado = weighingState.pesadoAcumuladoKg;
  const falta = Math.max(0, Number((solicitado - pesado).toFixed(3)));
  const diferencaAbs = Number(Math.abs(solicitado - pesado).toFixed(3));
  const diferencaPercent = Number(((diferencaAbs / solicitado) * 100).toFixed(2));
  const tolerancia = weighingState.toleranciaPercent; // 2.0%
  const estaDentroTolerancia = diferencaPercent <= tolerancia && pesado >= (solicitado * 0.95);

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputManualPeso.replace(',', '.'));
    if (!isNaN(val) && val > 0) {
      simulateWeightAddition(val);
      setInputManualPeso('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header da Tela Operacional do Almoxarifado */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Eixo 2: Operação Diária
              </span>
              <span className="text-xs text-slate-500">• Almoxarifado Central</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Separação & Pesagem Operacional em Balança
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Interface de pesagem conectada às balanças físicas da Savvy para conferência e acumulação de fracionamento de peças/caixas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('estoque')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Estoque ERP OCT6</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('producao')}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Liberar para Produção</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Nota Arquitetural sobre o Adapter de Balanças */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
          <Cpu className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            <strong>Arquitetura da Integração Física:</strong> A versão Inside V1 simula a balança conectada. Na solução definitiva, este módulo se conecta via <em>Scale Adapter Service (Serial RS-232 / TCP-IP Socket / Prix Protocol)</em> aos terminais industriais Toledo/Filizola sem necessidade de digitação humana.
          </span>
        </div>
      </div>

      {/* Display Principal da Balança Digital */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Painel da Balança e Indicadores Digitais */}
        <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
          
          {/* Barra Superior da Balança */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  BAL-ALMOX-01 • TOLEDO PRIX 4 UNO
                </span>
                <div className="text-xs text-slate-400">
                  Terminal Online • Porta TCP 192.168.10.152:9100
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                Tolerância Operacional: ±{tolerancia}%
              </span>
              <button
                type="button"
                onClick={resetWeighingSimulation}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Zerar Balança / Resetar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Identificação do Produto do Exemplo Oficial */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Item em Separação:
              </span>
              <h2 className="text-xl font-black text-white">
                {weighingState.produtoNome} (PROD-1001)
              </h2>
              <div className="text-xs text-slate-400">
                Vinculado à Requisição: <strong>{weighingState.requisicaoId}</strong> • Almoxarifado Savvy
              </div>
            </div>

            <div className="text-right">
              {estaDentroTolerancia ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Dentro da tolerância</span>
                </div>
              ) : pesado === 0 ? (
                <span className="inline-block px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-700">
                  Aguardando Peças
                </span>
              ) : (
                <span className="inline-block px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
                  Pesando em Andamento
                </span>
              )}
            </div>
          </div>

          {/* Grande Display Digital da Balança (Estilo LCD Industrial) */}
          <div className="bg-black/80 rounded-2xl p-6 border-2 border-slate-800 text-center space-y-2 shadow-inner">
            <div className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-widest">
              PESO LÍQUIDO AFERIDO NA PLATAFORMA
            </div>
            <div className="font-mono text-5xl sm:text-7xl font-black tracking-tight text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              {pesado.toFixed(3).replace('.', ',')} <span className="text-2xl text-emerald-500/70">kg</span>
            </div>
            <div className="flex items-center justify-center space-x-6 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <span>SOLICITADO: <strong className="text-white">{solicitado.toFixed(3).replace('.', ',')} kg</strong></span>
              <span>FALTA: <strong className={falta > 0 ? "text-amber-400" : "text-emerald-400"}>{falta.toFixed(3).replace('.', ',')} kg</strong></span>
            </div>
          </div>

          {/* Botões de Ação da Simulação Obrigatória */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Botão de Destaque Oficial: Simular Pesagem */}
              <button
                type="button"
                onClick={() => simulateWeightAddition()}
                className="w-full sm:flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
              >
                <Scale className="w-5 h-5" />
                <span>Simular Pesagem (Adicionar Peça/Caixa)</span>
              </button>

              <button
                type="button"
                onClick={resetWeighingSimulation}
                className="w-full sm:w-auto py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                Zerar Plataforma (Tara)
              </button>
            </div>

            {/* Inserção de Peso Específico (Caso queira adicionar os números do exemplo) */}
            <form onSubmit={handleManualAdd} className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Atalhos rápidos do exemplo:</span>
              <button
                type="button"
                onClick={() => simulateWeightAddition(23.840)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700"
              >
                +23,840 kg
              </button>
              <button
                type="button"
                onClick={() => simulateWeightAddition(21.310)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700"
              >
                +21,310 kg
              </button>
              <button
                type="button"
                onClick={() => simulateWeightAddition(24.125)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700"
              >
                +24,125 kg
              </button>
              <button
                type="button"
                onClick={() => simulateWeightAddition(Number((solicitado - pesado).toFixed(3)))}
                className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-bold text-[11px] border border-emerald-700/60"
              >
                Completar Saldo Exato (345 kg)
              </button>
            </form>
          </div>

        </div>

        {/* Painel Lateral: Métricas Obrigatórias & Log de Eventos Individuais */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          
          {/* Métricas Exigidas: Solicitado, Pesado, Diferença, % Diferença, Tolerância */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Conferência Dimensional de Separação
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-semibold">Quantidade Solicitada:</span>
                <span className="font-mono font-bold text-slate-900">{solicitado.toFixed(3)} kg</span>
              </div>
              
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-semibold">Quantidade Pesada:</span>
                <span className="font-mono font-bold text-emerald-700">{pesado.toFixed(3)} kg</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-semibold">Diferença Absoluta:</span>
                <span className={`font-mono font-bold ${diferencaAbs === 0 ? 'text-slate-500' : 'text-amber-700'}`}>
                  {diferencaAbs.toFixed(3)} kg
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-semibold">Percentual de Diferença:</span>
                <span className="font-mono font-bold text-slate-900">{diferencaPercent}%</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-semibold">Tolerância Contratual:</span>
                <span className="font-mono font-bold text-blue-800">±{tolerancia}%</span>
              </div>
            </div>

            {/* Tag de Validação Final */}
            <div className="pt-2">
              {estaDentroTolerancia ? (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dentro da tolerância</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs text-center">
                  Separação em andamento ({((pesado / solicitado) * 100).toFixed(1)}%)
                </div>
              )}
            </div>
          </div>

          {/* Histórico Individual de Pesagens (Eventos Registrados) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-1.5">
                <History className="w-4 h-4 text-slate-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Eventos Individuais ({weighingState.pesagensIndividuais.length})
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">Log em tempo real</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
              {weighingState.pesagensIndividuais.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Nenhum evento registrado ainda. Clique em &quot;Simular Pesagem&quot;.
                </div>
              ) : (
                weighingState.pesagensIndividuais.map((sub, i) => (
                  <div key={sub.id} className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-slate-800">#{weighingState.pesagensIndividuais.length - i}</span>
                      <span className="text-slate-400 text-[10px] ml-2">{sub.hora}</span>
                    </div>
                    <span className="font-mono font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      +{sub.pesoKg.toFixed(3)} kg
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
