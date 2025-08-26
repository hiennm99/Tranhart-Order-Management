import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Package, Users, Settings, ChevronDown, Store, Home, ShoppingCart, BarChart3, Wallet, X } from 'lucide-react';

interface Shop {
    id: number;
    name: string;
    type: string;
    status: string;
}

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    selectedShop: Shop | null;
    onShopChange: (shop: Shop) => void;
    shops: Shop[];
}

export const Sidebar = ({ isOpen, onToggle, selectedShop, onShopChange, shops }: SidebarProps) => {
    const [showShopDropdown, setShowShopDropdown] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard', color: 'blue' },
        { id: 'orders', icon: ShoppingCart, label: 'Đơn hàng', path: '/orders', color: 'green' },
        { id: 'products', icon: Package, label: 'Sản phẩm', path: '/products', color: 'purple' },
        { id: 'customers', icon: Users, label: 'Khách hàng', path: '/customers', color: 'yellow' },
        { id: 'analytics', icon: BarChart3, label: 'Báo cáo', path: '/analytics', color: 'indigo' },
        { id: 'finance', icon: Wallet, label: 'Tài chính', path: '/finance', color: 'emerald' }
    ];

    const getShopIcon = (type: string) => {
        switch (type) {
            case 'fashion': return '👔';
            case 'electronics': return '📱';
            case 'cosmetics': return '💄';
            default: return '🏪';
        }
    };

    const getShopColor = (type: string) => {
        switch (type) {
            case 'fashion': return 'from-pink-500 to-rose-500';
            case 'electronics': return 'from-blue-500 to-cyan-500';
            case 'cosmetics': return 'from-purple-500 to-pink-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        onToggle(); // Close mobile menu after navigation
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:z-auto
                w-72 flex flex-col border-r border-gray-100
            `}>
                {/* Logo & Close Button */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Store className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Multi Shop</h2>
                                <p className="text-xs text-gray-500 font-medium">Management System</p>
                            </div>
                        </div>
                        <button
                            onClick={onToggle}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Shop Selector */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
                    <div className="relative">
                        <button
                            onClick={() => setShowShopDropdown(!showShopDropdown)}
                            className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group"
                        >
                            <div className="flex items-center space-x-3">
                                {selectedShop && (
                                    <>
                                        <div className={`w-10 h-10 bg-gradient-to-br ${getShopColor(selectedShop.type)} rounded-xl flex items-center justify-center shadow-sm text-lg`}>
                                            {getShopIcon(selectedShop.type)}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900 group-hover:text-gray-800">
                                                {selectedShop.name}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize font-medium">
                                                {selectedShop.type}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {!selectedShop && (
                                    <>
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                            <Store className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-500">Chọn shop</p>
                                            <p className="text-xs text-gray-400">Chọn để bắt đầu</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Shop Dropdown */}
                        {showShopDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                {shops.map((shop, index) => (
                                    <button
                                        key={shop.id}
                                        onClick={() => {
                                            onShopChange(shop);
                                            setShowShopDropdown(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-all duration-200 ${
                                            selectedShop?.id === shop.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                        } ${index === 0 ? 'rounded-t-xl' : ''} ${index === shops.length - 1 ? 'rounded-b-xl' : ''}`}
                                    >
                                        <div className={`w-8 h-8 bg-gradient-to-br ${getShopColor(shop.type)} rounded-lg flex items-center justify-center shadow-sm text-sm`}>
                                            {getShopIcon(shop.type)}
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="font-semibold text-sm text-gray-900">{shop.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{shop.type}</p>
                                        </div>
                                        {selectedShop?.id === shop.id && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-4">
                            Menu chính
                        </p>
                        {menuItems.map(item => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                        isActive
                                            ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                                    }`}
                                >
                                    <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                                        isActive ? 'bg-blue-100' : 'group-hover:bg-gray-100'
                                    }`}>
                                        <Icon className={`h-5 w-5 transition-colors duration-200 ${
                                            isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                                        }`} />
                                    </div>
                                    <span className="font-semibold transition-colors duration-200">{item.label}</span>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute right-2 w-1.5 h-6 bg-blue-500 rounded-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Settings */}
                <div className="p-4 border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                    <button
                        onClick={() => handleNavigation('/settings')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                            location.pathname === '/settings'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <Settings className="h-5 w-5 text-gray-600 group-hover:text-gray-700 transition-colors" />
                        </div>
                        <span className="font-semibold">Cài đặt</span>
                    </button>
                </div>
            </div>
        </>
    );
};