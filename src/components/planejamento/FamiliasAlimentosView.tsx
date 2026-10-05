"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FAMILIAS_ALIMENTOS } from '@/data/mockData';
import { FoodFamily } from '@/types';
import { 
  Tags, 
  Plus, 
  Layers, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Info,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export function FamiliasAlimentosView() {
  const { openErpBackofficeModal } = useApp();
  const [familias, setFamilias] = useState<FoodFamily[]>(FAMILIAS_ALIMENTOS);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Novo item formulário
  const [novoNome, setNovoNome] = useState('');
  const [novoCodigo, setNovoCodigo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoPrazo, setNovoPrazo] = useState(3);

  const handleAddFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome) return;

    const nova: FoodFamily = {
      id: `fam-${Date.now()}`,
      nome: novoNome,
      codigoERP: novoCodigo || `FAM-00${familias.length + 1}`,
      descricao: novaDescricao || 'Família customizada de insumos alimentares hospitalares.',
      corBadge: 'bg-blue-100 text-blue-800 border-blue-200',
      produtosContagem: 0,
      responsavelCompras: 'Equipe de Suprimentos Savvy',
      prazoMedioReposicaoDias: novoPrazo,
    };

    setFamilias([...familias, nova]);
    setShowAddModal(false);
    setNovoNome('');
    setNovoCodigo('');
    setNovaDescricao('');
  };

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
              <span className="text-xs text-slate-500">• Parametrização Aberta</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Famílias de Alimentos Parametrizáveis
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Classificação estratégica dos insumos para requisição por setor, cotação de compras e gestão de estoque hospitalar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openErpBackofficeModal('produtos')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Categorias ERP OCT6</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Família de Alimentos</span>
            </button>
          </div>
        </div>

        {/* Notificação Didática */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            <strong>Diretriz Savvy:</strong> O sistema não se limita às famílias iniciais (Proteínas e Laticínios, Estocáveis, Hortifrúti). A Savvy pode cadastrar novas famílias a qualquer momento (ex: Dietas Especiais, Panificação, Congelados, Nutrição Enteral) com integração aos centros de custo do ERP OCT6.
          </span>
        </div>
      </div>

      {/* Grid de Cards das Famílias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {familias.map((fam) => (
          <div key={fam.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${fam.corBadge}`}>
                  {fam.codigoERP}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {fam.produtosContagem} produtos vinculados
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                {fam.nome}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {fam.descricao}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span className="text-slate-400">Responsável Compras:</span>
                <span className="font-medium text-slate-800">{fam.responsavelCompras}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="text-slate-400">Lead Time / Reposição:</span>
                <span className="font-bold text-slate-900">{fam.prazoMedioReposicaoDias} dias úteis</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[10px] text-slate-400">Integrado ao ERP OCT6</span>
              <button 
                type="button" 
                className="text-xs font-semibold text-[#c62828] hover:underline flex items-center gap-1"
              >
                <span>Parametrizar Regras</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Criação de Nova Família */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Adicionar Família de Alimentos</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFamily} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome da Família:</label>
                <input
                  type="text"
                  placeholder="Ex: Nutrição Enteral e Dietas Clínicas"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Código de Mapeamento ERP:</label>
                <input
                  type="text"
                  placeholder="Ex: FAM-006"
                  value={novoCodigo}
                  onChange={(e) => setNovoCodigo(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Prazo Médio de Reposição (Dias):</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={novoPrazo}
                  onChange={(e) => setNovoPrazo(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição / Escopo:</label>
                <textarea
                  rows={3}
                  placeholder="Descreva os produtos e finalidade hospitalar..."
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c62828] text-white rounded-lg font-semibold hover:bg-red-700 shadow-xs"
                >
                  Salvar Família
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
