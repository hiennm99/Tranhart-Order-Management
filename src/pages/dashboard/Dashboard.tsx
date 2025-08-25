// Dashboard Component
import {useMemo} from "react";
import {
    Search, Plus, Filter, Eye, Edit, Trash2, Calendar, Package, Users, TrendingUp,
    Menu, X, Bell, User, Settings, LogOut, ChevronDown, Store, Home, ShoppingCart,
    BarChart3, FileText, Wallet
} from 'lucide-react';
import {StatsCard} from "../../components/cards/StatsCard.tsx";

export const Dashboard = ({ orders, selectedShop }) => {
    const shopOrders = selectedShop ? orders.filter(order => order.shopId === selectedShop.id) : orders;

    const stats = useMemo(() => {
        const totalRevenue = shopOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = shopOrders.length;
        const pendingOrders = shopOrders.filter(order => order.status === 'Chờ xử lý').length;
        const completedOrders = shopOrders.filter(order => order.status === 'Đã giao').length;

        return { totalRevenue, totalOrders, pendingOrders, completedOrders };
    }, [shopOrders]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (!selectedShop) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn shop để xem dashboard</h3>
                    <p className="text-gray-500">Vui lòng chọn một shop từ sidebar để xem thống kê</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tổng doanh thu"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={TrendingUp}
                    color="text-green-600"
                    change={12.5}
                />
                <StatsCard
                    title="Tổng đơn hàng"
                    value={stats.totalOrders}
                    icon={Package}
                    color="text-blue-600"
                    change={8.2}
                />
                <StatsCard
                    title="Chờ xử lý"
                    value={stats.pendingOrders}
                    icon={Calendar}
                    color="text-yellow-600"
                    change={-5.1}
                />
                <StatsCard
                    title="Đã hoàn thành"
                    value={stats.completedOrders}
                    icon={Users}
                    color="text-green-600"
                    change={15.3}
                />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Đơn hàng gần đây - {selectedShop.name}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đặt</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {shopOrders.slice(0, 5).map(order => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="font-medium">{order.customerName}</p>
                                        <p className="text-sm text-gray-500">{order.phone}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{formatCurrency(order.totalAmount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                            order.status === 'Đang giao' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};