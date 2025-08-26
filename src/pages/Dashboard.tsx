// Enhanced Dashboard Component with magical design
import {useMemo} from "react";
import {
    Plus, Package, TrendingUp,
    Settings, Store, ShoppingCart,
    BarChart3, ArrowUpRight, Clock, CheckCircle, AlertCircle,
    Sparkles, Zap, Star, Crown
} from 'lucide-react';
import {StatsCard} from "../components/cards/StatsCard.tsx";
import {useShop} from "../context/ShopContext.tsx";
import { formatCurrency } from '../utils/formatters';

export const Dashboard = () => {
    const { selectedShop, orders } = useShop();
    const shopOrders = selectedShop ? orders.filter(order => order.shopId === selectedShop.id) : orders;

    const stats = useMemo(() => {
        const totalRevenue = shopOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = shopOrders.length;
        const pendingOrders = shopOrders.filter(order => order.currentStatus === 'Chờ xác nhận').length;
        const completedOrders = shopOrders.filter(order => order.currentStatus === 'Giao thành công').length;
        const inProgressOrders = shopOrders.filter(order => order.currentStatus === 'Đang giao hàng').length;

        // Calculate growth rates (mock data for demo)
        const revenueGrowth = 12.5;
        const orderGrowth = 8.2;
        const pendingGrowth = -5.1;
        const completedGrowth = 15.3;

        return {
            totalRevenue,
            totalOrders,
            pendingOrders,
            completedOrders,
            inProgressOrders,
            revenueGrowth,
            orderGrowth,
            pendingGrowth,
            completedGrowth
        };
    }, [shopOrders]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Giao thành công':
                return <CheckCircle className="h-4 w-4 text-emerald-600"/>;
            case 'Đang giao hàng':
                return <Clock className="h-4 w-4 text-blue-600"/>;
            case 'Chờ xác nhận':
                return <AlertCircle className="h-4 w-4 text-amber-600"/>;
            default:
                return <Clock className="h-4 w-4 text-gray-600"/>;
        }
    };

    if (!selectedShop) {
        return (
            <div className="flex items-center justify-center min-h-96 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>

                {/* Floating particles */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse opacity-40"></div>
                <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce opacity-30"></div>
                <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping opacity-20"></div>

                <div className="relative text-center max-w-md mx-auto p-8">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6 relative overflow-hidden">
                            {/* Animated rings */}
                            <div className="absolute inset-4 border-4 border-purple-300/30 rounded-full animate-spin"></div>
                            <div className="absolute inset-8 border-2 border-blue-400/40 rounded-full animate-pulse"></div>
                            <Store className="relative h-16 w-16 text-purple-500 drop-shadow-lg"/>
                        </div>

                        {/* Floating icons */}
                        <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                            <Star className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-bounce delay-300 shadow-lg">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                    </div>

                    <h3 className="text-3xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                        🚀 Chọn shop để bay cao!
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium mb-6">
                        Hãy chọn một shop từ sidebar để khám phá thế giới quản lý thông minh và xem những thống kê tuyệt vời!
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-2xl border border-purple-200/50 p-6 shadow-lg">
                        <div className="flex items-center justify-center space-x-2 text-purple-700 font-bold">
                            <Crown className="h-5 w-5 text-yellow-500" />
                            <span>💡 Mẹo Pro: Dùng dropdown sidebar để chuyển đổi shop!</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl -z-10"></div>

            {/* Welcome Section - Enhanced */}
            <div className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-200/50 shadow-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-8 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 right-16 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping"></div>
                </div>

                <div className="relative flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3 flex items-center space-x-3">
                            <span>Chào mừng đến với {selectedShop.name}</span>
                            <div className="flex space-x-1">
                                <span className="text-2xl animate-bounce">👋</span>
                                <span className="text-2xl animate-pulse">✨</span>
                            </div>
                        </h2>
                        <p className="text-gray-700 font-semibold text-lg flex items-center space-x-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <span>Theo dõi hiệu suất kinh doanh và quản lý đơn hàng thông minh</span>
                        </p>
                    </div>
                    <div className="hidden md:block relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                            <BarChart3 className="h-12 w-12 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                            <Crown className="h-4 w-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Enhanced */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="💰 Tổng doanh thu"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={TrendingUp}
                    color="text-emerald-600"
                    change={stats.revenueGrowth}
                    gradient="from-emerald-500 to-teal-600"
                />
                <StatsCard
                    title="📦 Tổng đơn hàng"
                    value={stats.totalOrders}
                    icon={Package}
                    color="text-blue-600"
                    change={stats.orderGrowth}
                    gradient="from-blue-500 to-cyan-600"
                />
                <StatsCard
                    title="⏳ Chờ xử lý"
                    value={stats.pendingOrders}
                    icon={Clock}
                    color="text-amber-600"
                    change={stats.pendingGrowth}
                    gradient="from-amber-500 to-orange-600"
                />
                <StatsCard
                    title="✅ Đã hoàn thành"
                    value={stats.completedOrders}
                    icon={CheckCircle}
                    color="text-emerald-600"
                    change={stats.completedGrowth}
                    gradient="from-emerald-500 to-green-600"
                />
            </div>

            {/* Quick Actions - Enhanced */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:scale-110">
                            <Plus className="h-8 w-8 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                🚀 Thêm đơn hàng mới
                            </h4>
                            <p className="text-gray-600 font-semibold">Tạo đơn hàng siêu nhanh</p>
                        </div>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                </div>

                <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl group-hover:from-emerald-600 group-hover:to-green-600 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:scale-110">
                            <BarChart3 className="h-8 w-8 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xl group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                📊 Xem báo cáo
                            </h4>
                            <p className="text-gray-600 font-semibold">Phân tích doanh số thông minh</p>
                        </div>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                </div>

                <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:scale-110">
                            <Settings className="h-8 w-8 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xl group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                ⚙️ Cài đặt shop
                            </h4>
                            <p className="text-gray-600 font-semibold">Quản lý thông tin cửa hàng</p>
                        </div>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                </div>
            </div>

            {/* Recent Orders - Enhanced */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-emerald-100/30 to-cyan-100/30 rounded-full blur-2xl"></div>

                <div className="relative p-8 border-b border-gray-200/50 bg-gradient-to-r from-white/80 via-blue-50/30 to-purple-50/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <ShoppingCart className="h-8 w-8 text-white drop-shadow-sm" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-1 flex items-center space-x-2">
                                    <span>Đơn hàng gần đây</span>
                                    <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                                </h3>
                                <p className="text-gray-600 font-bold flex items-center space-x-2">
                                    <Store className="h-4 w-4 text-purple-500" />
                                    <span>{selectedShop.name} • {shopOrders.length} đơn hàng</span>
                                </p>
                            </div>
                        </div>
                        <button className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl transition-all duration-300 font-black shadow-xl hover:shadow-2xl transform hover:scale-105">
                            <span>Xem tất cả</span>
                            <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    {shopOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 relative">
                            {/* Floating elements */}
                            <div className="absolute top-8 left-1/4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce opacity-40"></div>
                            <div className="absolute top-12 right-1/3 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-30"></div>

                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                                    <ShoppingCart className="h-12 w-12 text-gray-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                    <Star className="h-4 w-4 text-white" />
                                </div>
                            </div>

                            <h4 className="text-2xl font-black text-gray-900 mb-3 flex items-center space-x-2">
                                <span>🎯 Chưa có đơn hàng</span>
                            </h4>
                            <p className="text-gray-500 text-center max-w-sm font-medium">
                                Đây sẽ là nơi hiển thị những đơn hàng tuyệt vời của <span className="font-bold text-purple-600">{selectedShop.name}</span>
                            </p>

                            <div className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-purple-200/50">
                                <p className="text-sm font-bold text-purple-700 flex items-center space-x-2">
                                    <Zap className="h-4 w-4" />
                                    <span>Hãy tạo đơn hàng đầu tiên để bắt đầu! ✨</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50/80 to-purple-50/50">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                                    👤 Khách hàng
                                </th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                                    🛍️ Sản phẩm
                                </th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                                    💰 Tổng tiền
                                </th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                                    📊 Trạng thái
                                </th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                                    📅 Ngày đặt
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/50">
                            {shopOrders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-xl group-hover:scale-110 transition-transform duration-300">
                                                    {order.customerName.charAt(0)}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                    {order.customerName}
                                                </p>
                                                <p className="text-sm text-gray-500 font-bold flex items-center space-x-1">
                                                    <span>📱</span>
                                                    <span>{order.phone}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-black text-gray-900 text-lg">{order.products[0]?.name || 'N/A'}</div>
                                        <div className="text-sm text-purple-600 font-bold flex items-center space-x-1">
                                            <span>📦</span>
                                            <span>SL: {order.products.reduce((sum, p) => sum + p.quantity, 0)}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            {formatCurrency(order.totalAmount)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(order.currentStatus)}
                                            <span className={`px-4 py-2 text-xs font-black rounded-2xl shadow-lg ${
                                                order.currentStatus === 'Giao thành công' ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800' :
                                                    order.currentStatus === 'Đang giao hàng' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800' :
                                                        'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800'
                                            }`}>
                                                {order.currentStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-gray-900 flex items-center space-x-2">
                                            <span>📅</span>
                                            <span>{order.orderDate}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};