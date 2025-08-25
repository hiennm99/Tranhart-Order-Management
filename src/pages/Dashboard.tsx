// Enhanced Dashboard Component
import {useMemo} from "react";
import {
    Plus, Package, TrendingUp,
    Settings, Store, ShoppingCart,
    BarChart3, ArrowUpRight, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import {StatsCard} from "../components/cards/StatsCard.tsx";
import type {DashboardProps} from "../types";


export const Dashboard = ({ orders, selectedShop }: DashboardProps) => {
    const shopOrders = selectedShop ? orders.filter(order => order.shopId === selectedShop.id) : orders;

    const stats = useMemo(() => {
        const totalRevenue = shopOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = shopOrders.length;
        const pendingOrders = shopOrders.filter(order => order.status === 'Chờ xử lý').length;
        const completedOrders = shopOrders.filter(order => order.status === 'Đã giao').length;
        const inProgressOrders = shopOrders.filter(order => order.status === 'Đang giao').length;

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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Đã giao':
                return <CheckCircle className="h-4 w-4 text-green-600"/>;
            case 'Đang giao':
                return <Clock className="h-4 w-4 text-blue-600"/>;
            case 'Chờ xử lý':
                return <AlertCircle className="h-4 w-4 text-yellow-600"/>;
            default:
                return <Clock className="h-4 w-4 text-gray-600"/>;
        }
    };

    if (!selectedShop) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center max-w-md mx-auto p-8">
                    <div
                        className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Store className="h-12 w-12 text-gray-400"/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Chọn shop để xem dashboard</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Vui lòng chọn một shop từ sidebar để xem thống kê chi tiết và quản lý đơn hàng
                    </p>
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-700 font-medium">
                            💡 Mẹo: Sử dụng dropdown ở sidebar để chuyển đổi giữa các shop
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Chào mừng đến với {selectedShop.name} 👋
                        </h2>
                        <p className="text-gray-600 font-medium">
                            Theo dõi hiệu suất kinh doanh và quản lý đơn hàng của bạn
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div
                            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <BarChart3 className="h-8 w-8 text-white"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tổng doanh thu"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={TrendingUp}
                    color="text-green-600"
                    change={stats.revenueGrowth}
                />
                <StatsCard
                    title="Tổng đơn hàng"
                    value={stats.totalOrders}
                    icon={Package}
                    color="text-blue-600"
                    change={stats.orderGrowth}
                />
                <StatsCard
                    title="Chờ xử lý"
                    value={stats.pendingOrders}
                    icon={Clock}
                    color="text-yellow-600"
                    change={stats.pendingGrowth}
                />
                <StatsCard
                    title="Đã hoàn thành"
                    value={stats.completedOrders}
                    icon={CheckCircle}
                    color="text-green-600"
                    change={stats.completedGrowth}
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            <Plus className="h-6 w-6 text-blue-600"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Thêm đơn hàng mới</h4>
                            <p className="text-sm text-gray-500">Tạo đơn hàng nhanh chóng</p>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                            <BarChart3 className="h-6 w-6 text-green-600"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Xem báo cáo</h4>
                            <p className="text-sm text-gray-500">Phân tích doanh số chi tiết</p>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                            <Settings className="h-6 w-6 text-purple-600"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Cài đặt shop</h4>
                            <p className="text-sm text-gray-500">Quản lý thông tin cửa hàng</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Đơn hàng gần đây</h3>
                            <p className="text-sm text-gray-500 font-medium">
                                {selectedShop.name} • {shopOrders.length} đơn hàng
                            </p>
                        </div>
                        <button
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors font-semibold">
                            <span>Xem tất cả</span>
                            <ArrowUpRight className="h-4 w-4"/>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {shopOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart className="h-8 w-8 text-gray-400"/>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Chưa có đơn hàng</h4>
                            <p className="text-gray-500 text-center max-w-sm">
                                Đây sẽ là nơi hiển thị các đơn hàng của {selectedShop.name}
                            </p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Ngày đặt
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {shopOrders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center font-semibold text-blue-700 text-sm">
                                                {order.customerName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-500 font-medium">{order.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{order.product}</div>
                                        <div className="text-sm text-gray-500">SL: {order.quantity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className="font-bold text-gray-900 text-lg">{formatCurrency(order.totalAmount)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(order.status)}
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                                order.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Đang giao' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                    {order.status}
                                                </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.orderDate}</div>
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
}