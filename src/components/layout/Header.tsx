import {useState} from "react";
import {
    Search, Menu, Bell, User, Settings, LogOut, ChevronDown, Store,
} from 'lucide-react';

interface HeaderProps {
    user: {
        name: string;
        email: string;
        role: string;
    };
    onSidebarToggle: () => void;
    selectedShop: {
        id: number;
        name: string;
        type: string;
    } | null;
}

export const Header = ({ user, onSidebarToggle, selectedShop }: HeaderProps) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onSidebarToggle}
                        className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        <Menu className="h-6 w-6 text-gray-700" />
                    </button>

                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-3 mb-1">
                            {selectedShop && (
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                        <Store className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                                            {selectedShop.name}
                                        </h1>
                                        <p className="text-sm text-gray-500 font-medium">
                                            Dashboard & Quản lý
                                        </p>
                                    </div>
                                </div>
                            )}
                            {!selectedShop && (
                                <div>
                                    <h1 className="text-xl font-bold text-gray-400">
                                        Chọn shop để bắt đầu
                                    </h1>
                                    <p className="text-sm text-gray-400">
                                        Vui lòng chọn một shop để quản lý
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile shop info */}
                    {selectedShop && (
                        <div className="lg:hidden">
                            <h1 className="font-semibold text-gray-900 text-sm">
                                {selectedShop.name}
                            </h1>
                        </div>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-3">
                    {/* Search - hidden on mobile */}
                    <div className="hidden md:block relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 group">
                        <Bell className="h-5 w-5 group-hover:text-gray-900 transition-colors" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse">
                            3
                        </span>
                    </button>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 font-medium">{user.role}</p>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* User Dropdown */}
                        {showUserMenu && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowUserMenu(false)}
                                />

                                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-100">
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="py-2">
                                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                                            <User className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                                            <span className="group-hover:text-gray-900 font-medium">Hồ sơ cá nhân</span>
                                        </button>
                                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                                            <Settings className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                                            <span className="group-hover:text-gray-900 font-medium">Cài đặt</span>
                                        </button>
                                        <hr className="my-2 border-gray-100" />
                                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group">
                                            <LogOut className="h-4 w-4 group-hover:text-red-700 transition-colors" />
                                            <span className="group-hover:text-red-700 font-medium">Đăng xuất</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};