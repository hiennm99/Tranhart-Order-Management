import React, { useState, useMemo } from 'react';
import {
    Search, Plus, Filter, Eye, Edit, Trash2, Calendar, Package, Users, TrendingUp,
    Menu, X, Bell, User, Settings, LogOut, ChevronDown, Store, Home, ShoppingCart,
    BarChart3, FileText, Wallet
} from 'lucide-react';

import {Sidebar} from "../components/layout/Sidebar.tsx";
import {StatsCard} from "../components/cards/StatsCard.tsx";

// Main App Component
const OrderManagementApp = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');


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
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderActiveView()}
            </div>
        </div>
    );
};

export default OrderManagementApp;