import React, {useState} from "react";
import {
    Search, Plus, Filter, Eye, Edit, Trash2, Calendar, Package, Users, TrendingUp,
    Menu, X, Bell, User, Settings, LogOut, ChevronDown, Store, Home, ShoppingCart,
    BarChart3, FileText, Wallet
} from 'lucide-react';


export const Header = ({ user, onSidebarToggle, selectedShop }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-4">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onSidebarToggle}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="hidden lg:block">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {selectedShop ? `${selectedShop.name} - Dashboard` : 'Chọn shop để bắt đầu'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Quản lý đơn hàng và doanh thu
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Bell className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
                    </button>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </button>

                        {/* User Dropdown */}
                        {showUserMenu && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                                <div className="p-3 border-b">
                                    <p className="font-medium text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <div className="py-1">
                                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <User className="h-4 w-4" />
                                        <span>Hồ sơ</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <Settings className="h-4 w-4" />
                                        <span>Cài đặt</span>
                                    </button>
                                    <hr className="my-1" />
                                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <LogOut className="h-4 w-4" />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};