"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Tags, 
  ClipboardList, 
  TrendingDown, 
  PackageCheck, 
  Scale, 
  Truck, 
  ChefHat, 
  ScanFace, 
  Receipt, 
  FileCode2, 
  Cpu, 
  Boxes, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

export function Sidebar() {
  const { activeModule, setActiveModule, openErpBackofficeModal } = useApp();

  const menuSections = [
    {
      title: 'VISÃO GERAL',
      items: [
        { id: 'dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard, badge: 'KPIs' },
      ]
    },
    {
      title: '1. PLANEJAMENTO (O que vamos precisar?)',
      items: [
        { id: 'cardapios', label: 'Cardápios por Hospital', icon: UtensilsCrossed },
        { id: 'familias', label: 'Famílias de Alimentos', icon: Tags },
        { id: 'fichas-tecnicas', label: 'Fichas Técnicas / Per Capita', icon: ClipboardList, badge: 'Cálculo' },
        { id: 'planejamento-consumo', label: 'Planejamento de Consumo (D-30)', icon: TrendingDown, badge: 'Déficit' },
      ]
    },
    {
      title: '2. OPERAÇÃO DIÁRIA (O que acontece hoje?)',
      items: [
        { id: 'requisicoes', label: 'Requisição ao Estoque (D-1)', icon: PackageCheck, badge: 'Nutrição' },
        { id: 'separacao-pesagem', label: 'Separação & Balança Digital', icon: Scale, badge: 'Balança' },
        { id: 'recebimento-compras', label: 'Recebimento de Compras c/ Peso', icon: Truck, badge: 'Doca' },
        { id: 'producao', label: 'Produção Diária & Dietas', icon: ChefHat },
        { id: 'refeitorio', label: 'Refeitório & Biometria Facial', icon: ScanFace, badge: 'Eventos' },
      ]
    },
    {
      title: '3. GESTÃO (Como estamos performando?)',
      items: [
        { id: 'medicao-faturamento', label: 'Medição & Faturamento Savvy', icon: Receipt, badge: 'Auditoria' },
        { id: 'fiscal-hub', label: 'OCT6 Fiscal Hub & Alterdata', icon: FileCode2, badge: 'XML' },
        { id: 'integracoes', label: 'Central de Integrações', icon: Cpu, badge: 'Hardware' },
      ]
    },
  ];

  const erpBackofficeItems = [
    { type: 'estoque' as const, label: 'Estoque do ERP', icon: Boxes, desc: 'Saldos físicos, reservas e movimentações' },
    { type: 'compras' as const, label: 'Compras do ERP', icon: ShoppingCart, desc: 'Cotações, ordens e manifesto de compras' },
    { type: 'financeiro' as const, label: 'Financeiro do ERP', icon: DollarSign, desc: 'Contas a pagar/receber e DRE por hospital' },
    { type: 'produtos' as const, label: 'Produtos (ERP)', icon: Layers, desc: 'Cadastro unificado de insumos e unidades' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 shrink-0 flex flex-col min-h-[calc(100vh-73px)] border-r border-slate-800">
      
      {/* Mini Banner de Vertical Inside */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center space-x-2 text-xs font-semibold text-white">
          <div className="w-6 h-6 rounded bg-[#c62828] text-white flex items-center justify-center font-bold text-[10px]">
            FS
          </div>
          <div>
            <div className="tracking-wide">OCT6 FOOD SERVICE</div>
            <div className="text-[10px] text-slate-400 font-normal">Vertical Hospitalar Savvy</div>
          </div>
        </div>
      </div>

      {/* Navegação Principal */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {menuSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-[#c62828] text-white font-semibold shadow-xs' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isActive 
                        ? 'bg-red-950/50 text-red-100 border border-red-700/50' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Separador e Seção dos Módulos do ERP Nativo */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-amber-400/90 flex items-center justify-between">
            <span>BACKOFFICE ERP OCT6</span>
            <span className="bg-amber-950/80 text-amber-300 border border-amber-800/60 px-1 py-0.2 rounded text-[9px]">
              Nativo
            </span>
          </div>
          <p className="px-3 text-[10px] text-slate-400 mt-0.5 mb-2 leading-tight">
            Módulos existentes reaproveitados pela vertical:
          </p>
          <div className="space-y-1">
            {erpBackofficeItems.map((erp, i) => {
              const Icon = erp.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => openErpBackofficeModal(erp.type)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800/90 hover:text-white transition-all group border border-transparent hover:border-slate-700/60"
                  title={`Ver integração do Food Service com ${erp.label}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-300 shrink-0" />
                    <span className="truncate">{erp.label}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer do Sidebar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[10px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between font-semibold text-slate-300">
          <span>Versão Inside: V1.0.0</span>
          <span className="text-emerald-400">Ativa</span>
        </div>
        <div>Ambiente de Validação Grupo Savvy</div>
      </div>
    </aside>
  );
}
