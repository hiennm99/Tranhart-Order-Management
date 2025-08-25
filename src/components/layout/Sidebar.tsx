// Sidebar Component
import {useState} from "react";
import {Package, Users, Settings, ChevronDown, Store, Home, ShoppingCart, BarChart3, Wallet } from 'lucide-react';

export const Sidebar = ({ isOpen, onToggle, activeView, onViewChange, selectedShop, onShopChange, shops }) => {
    const [showShopDropdown, setShowShopDropdown] = useState<boolean>(false);

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'orders', icon: ShoppingCart, label: 'Đơn hàng' },
        { id: 'products', icon: Package, label: 'Sản phẩm' },
        { id: 'customers', icon: Users, label: 'Khách hàng' },
        { id: 'analytics', icon: BarChart3, label: 'Báo cáo' },
        { id: 'finance', icon: Wallet, label: 'Tài chính' }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
                {/* Logo */}
                <div className="p-6 border-b">
                    <div className="flex items-center space-x-3">
                        <Store className="h-8 w-8 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-800">Multi Shop</h2>
                    </div>
                </div>

                {/* Shop Selector */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <button
                            onClick={() => setShowShopDropdown(!showShopDropdown)}
                            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Store className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-sm">{selectedShop?.name || 'Chọn shop'}</p>
                                    <p className="text-xs text-gray-500">
                                        {selectedShop?.type || 'Loại shop'}
                                    </p>
                                </div>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${showShopDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Shop Dropdown */}
                        {showShopDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
                                {shops.map(shop => (
                                    <button
                                        key={shop.id}
                                        onClick={() => {
                                            onShopChange(shop);
                                            setShowShopDropdown(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                                            selectedShop?.id === shop.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                        }`}
                                    >
                                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                            <Store className="h-3 w-3 text-blue-600" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="font-medium text-sm">{shop.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{shop.type}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4">
                    <div className="space-y-1">
                        {menuItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onViewChange(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                        activeView === item.id
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Settings */}
                <div className="p-4 border-t">
                    <button
                        onClick={() => onViewChange('settings')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Cài đặt</span>
                    </button>
                </div>
            </div>
        </>
    );
};