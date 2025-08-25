import './App.css'

import OrderManagementApp from "./pages/OrderManagementApp.tsx";
import React, { useState } from "react";
import { MOCK_ORDERS, MOCK_SHOPS, MOCK_USER} from "./constants/mockData.ts";
import {Sidebar} from "./components/layout/Sidebar.tsx";
import {Header} from "./components/layout/Header.tsx";
import {BarChart3, Package, Settings, Users, Wallet} from "lucide-react";
import {Dashboard} from "./pages/dashboard/Dashboard.tsx";
import {Orders} from "./components/order/Orders.tsx";
import {PlaceholderView} from "./components/layout/PlaceholderView.tsx";


function App() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [activeView, setActiveView] = useState<string>('dashboard');
    const [selectedShop, setSelectedShop] = useState(MOCK_SHOPS[0]);
    const [orders, setOrders] = useState(MOCK_ORDERS);

    const handleViewChange = (view) => {
        setActiveView(view);
        setSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const handleShopChange = (shop) => {
        setSelectedShop(shop);
    };

    const renderActiveView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard orders={orders} selectedShop={selectedShop} />;
            case 'orders':
                return <Orders orders={orders} selectedShop={selectedShop} onOrderUpdate={setOrders} />;
            case 'products':
                return <PlaceholderView title="Quản lý sản phẩm" icon={Package} description="Tính năng đang được phát triển" />;
            case 'customers':
                return <PlaceholderView title="Quản lý khách hàng" icon={Users} description="Tính năng đang được phát triển" />;
            case 'analytics':
                return <PlaceholderView title="Báo cáo & Thống kê" icon={BarChart3} description="Tính năng đang được phát triển" />;
            case 'finance':
                return <PlaceholderView title="Quản lý tài chính" icon={Wallet} description="Tính năng đang được phát triển" />;
            case 'settings':
                return <PlaceholderView title="Cài đặt hệ thống" icon={Settings} description="Tính năng đang được phát triển" />;
            default:
                return <Dashboard orders={orders} selectedShop={selectedShop} />;
        }
    };

  return (
      <>
          <div className="flex h-screen bg-gray-100">
              {/* Sidebar */}
              <Sidebar
                  isOpen={sidebarOpen}
                  onToggle={() => setSidebarOpen(!sidebarOpen)}
                  activeView={activeView}
                  onViewChange={handleViewChange}
                  selectedShop={selectedShop}
                  onShopChange={handleShopChange}
                  shops={MOCK_SHOPS}
              />

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                  {/* Header */}
                  <Header
                      user={MOCK_USER}
                      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                      selectedShop={selectedShop}
                  />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      {renderActiveView()}
                  </div>
              </div>
          </div>
      </>
  );
}

export default App
