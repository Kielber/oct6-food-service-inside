"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HOSPITAIS, FICHAS_TECNICAS } from '@/data/mockData';
import { MealType, HospitalUnitId } from '@/types';
import { 
  UtensilsCrossed, 
  Calendar, 
  Clock, 
  Building2, 
  Plus, 
  Filter, 
  FileText, 
  ChefHat, 
  Sparkles,
  Layers,
  ChevronRight,
  Apple,
  Coffee,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';

export function CardapiosView() {
  const { selectedHospital, setSelectedHospital, setActiveModule } = useApp();
  
  const [dataSelecionada, setDataSelecionada] = useState('2026-10-02');
  const [tipoRefeicaoFiltro, setTipoRefeicaoFiltro] = useState<MealType | 'todos'>('todos');
  const [periodoFiltro, setPeriodoFiltro] = useState<'dia' | 'semana' | 'mes'>('dia');

  const refeicoesTipos: { id: MealType; nome: string; horario: string; icone: React.ElementType }[] = [
    { id: 'cafe', nome: 'Café da Manhã', horario: '06:30 - 08:30', icone: Coffee },
    { id: 'lanche-manha', nome: 'Lanche da Manhã', horario: '09:45 - 10:30', icone: Apple },
    { id: 'almoco', nome: 'Almoço', horario: '11:30 - 14:00', icone: Sun },
    { id: 'lanche-tarde', nome: 'Lanche da Tarde', horario: '15:30 - 16:30', icone: Sunset },
    { id: 'jantar', nome: 'Jantar', horario: '18:30 - 20:30', icone: Moon },
  ];

  // Itens de cardápio simulados para o dia selecionado
  const cardapioItems = [
    {
      id: 'card-01',
      tipo: 'cafe' as MealType,
      nomeRefeicao: 'Café da Manhã Hospitalar Padrão',
      publico: 'Pacientes Leitos + Funcionários',
      pratos: [
        { nome: 'Café com Leite Desnatado Pasteurizado', perCapita: '200ml', categoria: 'Bebidas' },
        { nome: 'Pão Francês com Margarina sem Sal', perCapita: '50g', categoria: 'Panificação' },
        { nome: 'Mamão Papaia Picado', perCapita: '120g', categoria: 'Frutas' },
        { nome: 'Biscoito Cream Cracker Integral', perCapita: '30g', categoria: 'Estocáveis' },
      ],
      dietasAtendidas: ['Geral', 'Branda', 'Diabéticos', 'Hipossódica'],
      refeicoesPrevistas: 850,
      status: 'Aprovado Nutrição',
    },
    {
      id: 'card-02',
      tipo: 'lanche-manha' as MealType,
      nomeRefeicao: 'Colação / Lanche da Manhã',
      publico: 'Pacientes Pediátricos e Diabéticos',
      pratos: [
        { nome: 'Iogurte Natural Batido com Frutas', perCapita: '150ml', categoria: 'Laticínios' },
        { nome: 'Torrada Multigrãos', perCapita: '25g', categoria: 'Panificação' },
      ],
      dietasAtendidas: ['Diabética', 'Pediátrica', 'Renal'],
      refeicoesPrevistas: 320,
      status: 'Aprovado Nutrição',
    },
    {
      id: 'card-03',
      tipo: 'almoco' as MealType,
      nomeRefeicao: 'Almoço Principal Especial',
      publico: 'Refeitório Savvy + Alas de Internação (Leitos)',
      pratos: [
        { nome: 'Coxão Mole Bovino ao Molho Rústico de Ervas', perCapita: '150g', categoria: 'Proteína Principal' },
        { nome: 'Filé de Frango Grelhado (Opção Dieta Branda)', perCapita: '140g', categoria: 'Opção Clínica' },
        { nome: 'Arroz Branco Soltinho Especial', perCapita: '80g', categoria: 'Guarnição' },
        { nome: 'Feijão Carioca Cremoso com Louro', perCapita: '55g', categoria: 'Leguminosa' },
        { nome: 'Purê de Batata Monalisa Aveludado', perCapita: '100g', categoria: 'Acompanhamento' },
        { nome: 'Salada de Tomate Italiano com Manjericão', perCapita: '70g', categoria: 'Salada Crua' },
      ],
      dietasAtendidas: ['Refeitório Geral', 'Dieta Branda', 'Dieta Pastosa', 'Dieta Hipossódica'],
      refeicoesPrevistas: 1250,
      status: 'Em Produção',
    },
    {
      id: 'card-04',
      tipo: 'lanche-tarde' as MealType,
      nomeRefeicao: 'Lanche da Tarde Hospitalar',
      publico: 'Pacientes + Equipes de Plantão',
      pratos: [
        { nome: 'Suco Natural de Laranja Pera', perCapita: '200ml', categoria: 'Bebidas' },
        { nome: 'Sanduíche Natural de Frango com Ricota', perCapita: '90g', categoria: 'Lanche' },
        { nome: 'Maçã Fuji Higienizada', perCapita: '120g', categoria: 'Frutas' },
      ],
      dietasAtendidas: ['Geral', 'Branda'],
      refeicoesPrevistas: 780,
      status: 'Aprovado Nutrição',
    },
    {
      id: 'card-05',
      tipo: 'jantar' as MealType,
      nomeRefeicao: 'Jantar Leve & Sopas Clínicas',
      publico: 'Pacientes e Plantonistas Noturnos',
      pratos: [
        { nome: 'Filé de Tilápia Grelhada ao Limão', perCapita: '130g', categoria: 'Proteína Principal' },
        { nome: 'Sopa Creme de Mandioquinha com Cenoura', perCapita: '250ml', categoria: 'Sopas/Pastosas' },
        { nome: 'Arroz Integral Cateto com Salsa', perCapita: '75g', categoria: 'Guarnição' },
        { nome: 'Legumes Salteados no Azeite (Abobrinha e Vagem)', perCapita: '90g', categoria: 'Acompanhamento' },
      ],
      dietasAtendidas: ['Geral', 'Leve/Branda', 'Pastosa', 'Enteral'],
      refeicoesPrevistas: 950,
      status: 'Aguardando Separação D-1',
    },
  ];

  const itensFiltrados = cardapioItems.filter(item => {
    if (tipoRefeicaoFiltro === 'todos') return true;
    return item.tipo === tipoRefeicaoFiltro;
  });

  return (
    <div className="space-y-6">
      
      {/* Header do Módulo de Cardápios */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Eixo 1: Planejamento
              </span>
              <span className="text-xs text-slate-500">• O que vamos precisar?</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Gestão de Cardápios Hospitalares
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Programação nutricional por hospital, data, ciclo periódico e tipos de refeições com fichas técnicas vinculadas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveModule('fichas-tecnicas')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <ChefHat className="w-3.5 h-3.5 text-slate-600" />
              <span>Ver Fichas Técnicas / Per Capita</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#c62828] hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Cardápio Hospitalar</span>
            </button>
          </div>
        </div>

        {/* Filtros Paramétricos Reativos */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Seletor de Hospital */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Unidade Hospitalar:
            </label>
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value as HospitalUnitId)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option value="consolidado">Consolidado (Todas as 4 Unidades)</option>
              {HOSPITAIS.map(h => (
                <option key={h.id} value={h.id}>{h.nome} ({h.sigla})</option>
              ))}
            </select>
          </div>

          {/* Seletor de Data */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Data de Aplicação:
            </label>
            <input
              type="date"
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Filtro de Período */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Visão do Período:
            </label>
            <div className="flex rounded-lg border border-slate-300 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setPeriodoFiltro('dia')}
                className={`flex-1 py-1 text-center rounded text-[11px] font-semibold transition-colors ${
                  periodoFiltro === 'dia' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Diário
              </button>
              <button
                type="button"
                onClick={() => setPeriodoFiltro('semana')}
                className={`flex-1 py-1 text-center rounded text-[11px] font-semibold transition-colors ${
                  periodoFiltro === 'semana' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Semanal
              </button>
              <button
                type="button"
                onClick={() => setPeriodoFiltro('mes')}
                className={`flex-1 py-1 text-center rounded text-[11px] font-semibold transition-colors ${
                  periodoFiltro === 'mes' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Ciclo Mensal
              </button>
            </div>
          </div>

          {/* Tipo de Refeição */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Tipo de Refeição:
            </label>
            <select
              value={tipoRefeicaoFiltro}
              onChange={(e) => setTipoRefeicaoFiltro(e.target.value as MealType | 'todos')}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option value="todos">Todos os 5 Tipos de Refeição</option>
              {refeicoesTipos.map(t => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Tabs / Barra de Atalho dos Tipos de Refeições */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {refeicoesTipos.map(t => {
          const Icon = t.icone;
          const isSelected = tipoRefeicaoFiltro === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTipoRefeicaoFiltro(isSelected ? 'todos' : t.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected 
                  ? 'bg-red-50 border-[#c62828] text-red-900 shadow-2xs ring-1 ring-red-400' 
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#c62828]' : 'text-slate-500'}`} />
                <span className="text-[10px] text-slate-400 font-mono">{t.horario}</span>
              </div>
              <div className="font-bold text-xs truncate">{t.nome}</div>
            </button>
          );
        })}
      </div>

      {/* Grade de Cardápios Programados */}
      <div className="space-y-4">
        {itensFiltrados.map((card) => (
          <div key={card.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#c62828] flex items-center justify-center font-bold">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-base text-slate-900">{card.nomeRefeicao}</h3>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {card.tipo}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Público-alvo: <strong>{card.publico}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">
                    {card.refeicoesPrevistas} refeições previstas
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {card.status}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModule('requisicoes')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                >
                  Gerar Requisição D-1
                </button>
              </div>
            </div>

            {/* Lista de Preparações / Pratos */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Preparações e Quantidades Per Capita Mapeadas:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {card.pratos.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">{p.nome}</div>
                      <span className="text-[10px] text-slate-400">{p.categoria}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-[#c62828] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {p.perCapita}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dietas e Conformidades Clínicas */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-semibold text-[11px]">Dietas Cobertas:</span>
                {card.dietasAtendidas.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                    {d}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Arquitetura aberta para tipos customizados de dietas e ceias
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
