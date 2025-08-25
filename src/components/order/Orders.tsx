import React, {useMemo, useState} from "react";
import {Edit, Plus, Search, ShoppingCart, Trash2} from "lucide-react";

export const Orders = ({ orders, selectedShop, onOrderUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    const [newOrder, setNewOrder] = useState({
        customerName: '',
        phone: '',
        address: '',
        product: '',
        quantity: 1,
        unitPrice: 0,
        status: 'Chờ xử lý',
        paymentStatus: 'Chưa thanh toán',
        notes: ''
    });

    const shopOrders = selectedShop ? orders.filter(order => order.shopId === selectedShop.id) : orders;

    const filteredOrders = useMemo(() => {
        return shopOrders.filter(order => {
            const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.phone.includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [shopOrders, searchTerm, statusFilter]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleAddOrder = () => {
        const order = {
            id: Date.now(),
            shopId: selectedShop.id,
            orderDate: new Date().toISOString().split('T')[0],
            ...newOrder,
            totalAmount: newOrder.quantity * newOrder.unitPrice
        };
        onOrderUpdate([...orders, order]);
        resetForm();
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setNewOrder(order);
        setShowAddForm(true);
    };

    const handleUpdateOrder = () => {
        const updatedOrders = orders.map(order =>
            order.id === editingOrder.id
                ? { ...newOrder, totalAmount: newOrder.quantity * newOrder.unitPrice }
                : order
        );
        onOrderUpdate(updatedOrders);
        resetForm();
    };

    const handleDeleteOrder = (id) => {
        onOrderUpdate(orders.filter(order => order.id !== id));
    };

    const resetForm = () => {
        setNewOrder({
            customerName: '',
            phone: '',
            address: '',
            product: '',
            quantity: 1,
            unitPrice: 0,
            status: 'Chờ xử lý',
            paymentStatus: 'Chưa thanh toán',
            notes: ''
        });
        setShowAddForm(false);
        setEditingOrder(null);
    };

    if (!selectedShop) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn shop để quản lý đơn hàng</h3>
                    <p className="text-gray-500">Vui lòng chọn một shop từ sidebar để xem đơn hàng</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, sản phẩm, số điện thoại..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="Chờ xử lý">Chờ xử lý</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã giao">Đã giao</option>
                    </select>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Thêm đơn hàng
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Đơn hàng - {selectedShop.name}</h3>
                    <p className="text-sm text-gray-500">Tổng cộng {filteredOrders.length} đơn hàng</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thanh toán</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {filteredOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">#{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="font-medium">{order.customerName}</p>
                                        <p className="text-sm text-gray-500">{order.phone}</p>
                                        <p className="text-xs text-gray-400">{order.address}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
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
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.paymentStatus === 'Đã thanh toán' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditOrder(order)}
                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Order Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">
                                {editingOrder ? 'Chỉnh sửa đơn hàng' : `Thêm đơn hàng mới - ${selectedShop.name}`}
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.customerName}
                                        onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.phone}
                                        onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={newOrder.address}
                                    onChange={(e) => setNewOrder({...newOrder, address: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sản phẩm</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.product}
                                        onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.quantity}
                                        onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value)})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.unitPrice}
                                        onChange={(e) => setNewOrder({...newOrder, unitPrice: parseInt(e.target.value)})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.status}
                                        onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                                    >
                                        <option value="Chờ xử lý">Chờ xử lý</option>
                                        <option value="Đang giao">Đang giao</option>
                                        <option value="Đã giao">Đã giao</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thanh toán</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={newOrder.paymentStatus}
                                        onChange={(e) => setNewOrder({...newOrder, paymentStatus: e.target.value})}
                                    >
                                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                                        <option value="Đã thanh toán">Đã thanh toán</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    value={newOrder.notes}
                                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                                />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-lg font-semibold">
                                    Tổng tiền: {formatCurrency(newOrder.quantity * newOrder.unitPrice)}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 border-t flex justify-end space-x-3">
                            <button
                                onClick={resetForm}
                                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={editingOrder ? handleUpdateOrder : handleAddOrder}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                {editingOrder ? 'Cập nhật' : 'Thêm đơn hàng'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};