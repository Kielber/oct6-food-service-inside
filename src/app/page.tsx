"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ErpBackofficeModal } from '@/components/erp-modals/ErpBackofficeModal';

// Componentes dos Módulos
import { ExecutiveDashboard } from '@/components/dashboard/ExecutiveDashboard';
import { CardapiosView } from '@/components/planejamento/CardapiosView';
import { FamiliasAlimentosView } from '@/components/planejamento/FamiliasAlimentosView';
import { FichasTecnicasView } from '@/components/planejamento/FichasTecnicasView';
import { PlanejamentoConsumoView } from '@/components/planejamento/PlanejamentoConsumoView';
import { RequisicaoEstoqueView } from '@/components/operacao/RequisicaoEstoqueView';
import { SeparacaoPesagemView } from '@/components/operacao/SeparacaoPesagemView';
import { RecebimentoComprasView } from '@/components/operacao/RecebimentoComprasView';
import { ProducaoDiariaView } from '@/components/producao/ProducaoDiariaView';
import { RefeitorioBiometriaView } from '@/components/refeitorio/RefeitorioBiometriaView';
import { MedicaoFaturamentoView } from '@/components/gestao/MedicaoFaturamentoView';
import { FiscalHubAlterdataView } from '@/components/gestao/FiscalHubAlterdataView';
import { CentralIntegracoesView } from '@/components/integracoes/CentralIntegracoesView';

import { 
  Building2, 
  ChevronRight, 
  Home, 
  Layers, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function InsideMainPage() {
  const { activeModule, setActiveModule, selectedHospital, openErpBackofficeModal } = useApp();

  const getBreadcrumbTitle = () => {
    switch (activeModule) {
      case 'dashboard': return 'Dashboard Executivo';
      case 'cardapios': return 'Cardápios por Hospital';
      case 'familias': return 'Famílias de Alimentos';
      case 'fichas-tecnicas': return 'Fichas Técnicas & Per Capita';
      case 'planejamento-consumo': return 'Planejamento de Consumo (D-30)';
      case 'requisicoes': return 'Requisições ao Estoque (D-1)';
      case 'separacao-pesagem': return 'Separação & Balança Digital';
      case 'recebimento-compras': return 'Recebimento de Compras c/ Peso';
      case 'producao': return 'Produção Diária & Dietas';
      case 'refeitorio': return 'Refeitório & Biometria Facial';
      case 'medicao-faturamento': return 'Medição & Faturamento Hospitalar';
      case 'fiscal-hub': return 'OCT6 Fiscal Hub & Alterdata';
      case 'integracoes': return 'Central de Integrações';
      default: return 'Food Service';
    }
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard': return <ExecutiveDashboard />;
      case 'cardapios': return <CardapiosView />;
      case 'familias': return <FamiliasAlimentosView />;
      case 'fichas-tecnicas': return <FichasTecnicasView />;
      case 'planejamento-consumo': return <PlanejamentoConsumoView />;
      case 'requisicoes': return <RequisicaoEstoqueView />;
      case 'separacao-pesagem': return <SeparacaoPesagemView />;
      case 'recebimento-compras': return <RecebimentoComprasView />;
      case 'producao': return <ProducaoDiariaView />;
      case 'refeitorio': return <RefeitorioBiometriaView />;
      case 'medicao-faturamento': return <MedicaoFaturamentoView />;
      case 'fiscal-hub': return <FiscalHubAlterdataView />;
      case 'integracoes': return <CentralIntegracoesView />;
      default: return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fe]">
      {/* Header Topbar */}
      <Header />

      {/* Corpo Principal com Sidebar e Área de Conteúdo */}
      <div className="flex-1 flex">
        {/* Sidebar Lateral */}
        <Sidebar />

        {/* Área Central de Conteúdo */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Faixa de Breadcrumbs e Alerta Conceitual Inside */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <nav className="flex items-center space-x-2 text-slate-500 font-medium">
              <button 
                type="button" 
                onClick={() => setActiveModule('dashboard')}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-slate-400" />
                <span>OCT6 ERP</span>
              </button>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#c62828] font-bold">Food Service (Savvy)</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-800 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                {getBreadcrumbTitle()}
              </span>
            </nav>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => openErpBackofficeModal('estoque')}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Como este módulo se integra ao ERP OCT6?</span>
              </button>
            </div>
          </div>

          {/* Renderização do Módulo Ativo */}
          {renderModuleContent()}

        </main>
      </div>

      {/* Footer Corporativo */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-extrabold text-slate-800">OCT6 Food Service — Inside V1</span>
            <span className="text-slate-400 ml-2">© 2026 OCT6 Soluções Globais e Informática</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Cliente: <strong>Grupo Savvy</strong> (Operação de Alimentação Coletiva Hospitalar)</span>
            <span>•</span>
            <span>4 Hospitais Ativos</span>
          </div>
        </div>
      </footer>

      {/* Modal Didático de Arquitetura do ERP OCT6 */}
      <ErpBackofficeModal />
    </div>
  );
}
