import { useState } from "react";
import {
    Search, Menu, Bell, User, Settings, LogOut, ChevronDown, Store,
    Sparkles, Zap
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
        <header className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gradient-to-r from-purple-200/30 to-blue-200/30 sticky top-0 z-30 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

            {/* Floating elements */}
            <div className="absolute top-2 left-20 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute top-4 right-32 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce opacity-30"></div>
            <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping opacity-20"></div>

            <div className="relative flex items-center justify-between px-4 sm:px-6 py-4">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onSidebarToggle}
                        className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-4">
                            {selectedShop && (
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                                            <Store className="h-6 w-6 text-white drop-shadow-sm" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center animate-pulse">
                                            <Zap className="h-2 w-2 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                            {selectedShop.name}
                                        </h1>
                                        <p className="text-sm font-semibold text-gray-500 flex items-center space-x-1">
                                            <Sparkles className="h-3 w-3 text-purple-400" />
                                            <span>Dashboard & Quản lý Pro</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            {!selectedShop && (
                                <div className="animate-pulse">
                                    <h1 className="text-xl font-bold text-gray-400">
                                        🔮 Chọn shop để bắt đầu
                                    </h1>
                                    <p className="text-sm text-gray-400 flex items-center space-x-1">
                                        <Sparkles className="h-3 w-3" />
                                        <span>Hãy chọn một shop để khám phá</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile shop info */}
                    {selectedShop && (
                        <div className="lg:hidden">
                            <h1 className="font-black text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {selectedShop.name}
                            </h1>
                        </div>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-3">
                    {/* Search - enhanced */}
                    <div className="hidden md:block relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200/50 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5 group-hover:text-purple-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm ma thuật... ✨"
                                className="pl-12 pr-6 py-3 w-72 text-sm bg-transparent border-0 rounded-2xl focus:ring-2 focus:ring-purple-500/30 focus:outline-none placeholder-purple-300 font-medium"
                            />
                        </div>
                    </div>

                    {/* Notifications - enhanced */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
                        <button className="relative p-3 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-600 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl border border-red-200/50 group">
                            <Bell className="h-6 w-6 group-hover:animate-bounce transition-all" />
                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse border-2 border-white">
                                3
                            </span>
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                        </button>
                    </div>

                    {/* User Menu - enhanced */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border border-blue-200/50 group"
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl">
                                    <User className="h-5 w-5 text-white drop-shadow-sm" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="font-bold text-sm bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">{user.name}</p>
                                <p className="text-xs text-purple-600 font-semibold flex items-center space-x-1">
                                    <span>👑</span>
                                    <span>{user.role}</span>
                                </p>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-purple-500 transition-all duration-300 ${showUserMenu ? 'rotate-180 text-purple-700' : 'group-hover:text-purple-700'}`} />
                        </button>

                        {/* User Dropdown - enhanced */}
                        {showUserMenu && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-10 backdrop-blur-sm bg-black/20"
                                    onClick={() => setShowUserMenu(false)}
                                />

                                <div className="absolute top-full right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-purple-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden transform animate-in slide-in-from-top-2 duration-200">
                                    <div className="relative p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border-b border-purple-100">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
                                        <div className="relative">
                                            <p className="font-black text-gray-900 text-lg">{user.name}</p>
                                            <p className="text-sm text-purple-600 font-semibold flex items-center space-x-1">
                                                <span>✨</span>
                                                <span>{user.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <button className="w-full flex items-center space-x-3 px-6 py-4 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group">
                                            <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                                                <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <span className="font-semibold group-hover:text-blue-700">Hồ sơ cá nhân</span>
                                        </button>
                                        <button className="w-full flex items-center space-x-3 px-6 py-4 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all group">
                                            <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                                                <Settings className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <span className="font-semibold group-hover:text-purple-700">Cài đặt</span>
                                        </button>
                                        <hr className="my-2 border-gradient-to-r from-purple-200 to-transparent" />
                                        <button className="w-full flex items-center space-x-3 px-6 py-4 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all group">
                                            <div className="p-2 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                                                <LogOut className="h-4 w-4 text-red-600" />
                                            </div>
                                            <span className="font-semibold group-hover:text-red-700">Đăng xuất</span>
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