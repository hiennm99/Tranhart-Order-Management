// components/order/Orders.tsx - Refactored version
import React, { useMemo, useState } from "react";
import { Search, ShoppingCart, Plus, Package } from "lucide-react";

// Types
import type {  NewOrderForm, Order, Product } from '../../types/orders';

// Components
import { OrderCard } from './OrderCard';
import { TimelineModal } from "../modals/TimelineModal";
import { OrderModal } from './OrderModal';

// Hooks
import { useShop } from '../../hooks/useShop';

// Constants
import { statusConfig } from '../../constants/statusConfig';
import { DEFAULT_ORDER_STATUS, DEFAULT_PAYMENT_STATUS } from '../../constants/common';

export const Orders: React.FC = () => {
    const { selectedShop, orders, setOrders } = useShop();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [showTimelineModal, setShowTimelineModal] = useState<Order | null>(null);

    const [newOrder, setNewOrder] = useState<NewOrderForm>({
        customerName: '',
        phone: '',
        address: '',
        products: [{
            sku: '',
            name: '',
            quantity: 1,
            unitPrice: 0,
            image: ''
        }],

        currentStatus: DEFAULT_ORDER_STATUS,
        paymentStatus: DEFAULT_PAYMENT_STATUS,
        notes: ''
    });

    const shopOrders = selectedShop ? orders.filter(order => order.shopId === selectedShop.id) : orders;

    const filteredOrders = useMemo(() => {
        return shopOrders.filter(order => {
            const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.products.some(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
                ) ||
                order.phone.includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || order.currentStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [shopOrders, searchTerm, statusFilter]);

    const handleAddOrder = () => {
        const totalAmount = newOrder.products.reduce((sum, product) =>
            sum + (product.quantity * product.unitPrice), 0
        );

        const order: Order = {
            id: Date.now(),
            shopId: selectedShop!.id,
            orderDate: new Date().toISOString().split('T')[0],
            ...newOrder,
            totalAmount,
            statusHistory: [
                { status: newOrder.currentStatus, timestamp: new Date().toISOString(), completed: false }
            ]
        };
        setOrders([...orders, order]);
        resetForm();
    };

    const resetForm = () => {
        setNewOrder({
            customerName: '',
            phone: '',
            address: '',
            products: [{
                sku: '',
                name: '',
                quantity: 1,
                unitPrice: 0,
                image: ''
            }],
            currentStatus: DEFAULT_ORDER_STATUS,
            paymentStatus: DEFAULT_PAYMENT_STATUS,
            notes: ''
        });
        setShowAddForm(false);
        setEditingOrder(null);
    };

    const addProduct = () => {
        setNewOrder({
            ...newOrder,
            products: [...newOrder.products, {
                sku: '',
                name: '',
                quantity: 1,
                unitPrice: 0,
                image: ''
            }]
        });
    };

    const removeProduct = (index: number) => {
        if (newOrder.products.length > 1) {
            setNewOrder({
                ...newOrder,
                products: newOrder.products.filter((_, i) => i !== index)
            });
        }
    };

    const updateProduct = (index: number, field: keyof Product, value: string | number) => {
        const updatedProducts = newOrder.products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setNewOrder({ ...newOrder, products: updatedProducts });
    };

    const handleEditOrder = (order: Order) => {
        setEditingOrder(order);
        setNewOrder({
            customerName: order.customerName,
            phone: order.phone,
            address: order.address,
            products: [...order.products],
            currentStatus: order.currentStatus,
            paymentStatus: order.paymentStatus,
            notes: order.notes
        });
        setShowAddForm(true);
    };

    const handleDeleteOrder = (orderId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            setOrders(orders.filter(order => order.id !== orderId));
        }
    };

    const handleUpdateOrder = () => {
        if (!editingOrder) return;

        const totalAmount = newOrder.products.reduce((sum, product) =>
            sum + (product.quantity * product.unitPrice), 0
        );

        const updatedOrder: Order = {
            ...editingOrder,
            ...newOrder,
            totalAmount
        };

        setOrders(orders.map(order =>
            order.id === editingOrder.id ? updatedOrder : order
        ));
        resetForm();
    };

    if (!selectedShop) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
                        <ShoppingCart className="h-20 w-20 text-blue-600 mx-auto relative z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Chọn shop để quản lý đơn hàng
                    </h3>
                    <p className="text-gray-600 text-lg">Vui lòng chọn một shop từ sidebar để xem đơn hàng</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
            {/* Header với gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 shadow-2xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Quản lý đơn hàng</h1>
                    <p className="text-blue-100 text-lg">{selectedShop.name}</p>
                </div>
            </div>

            {/* Search and Filter với glassmorphism */}
            <div className="backdrop-blur-lg bg-white/70 border border-white/20 p-6 rounded-2xl shadow-xl">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, sản phẩm, SKU, số điện thoại..."
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        {Object.keys(statusConfig).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl shadow-blue-500/25"
                    >
                        <Plus className="h-5 w-5" />
                        Thêm đơn hàng
                    </button>
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid gap-6">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20">
                        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Không có đơn hàng nào</h3>
                        <p className="text-gray-500">Hãy thêm đơn hàng đầu tiên cho shop của bạn</p>
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onViewTimeline={setShowTimelineModal}
                            onEdit={handleEditOrder}
                            onDelete={handleDeleteOrder}
                        />
                    ))
                )}
            </div>

            {/* Timeline Modal */}
            <TimelineModal
                order={showTimelineModal}
                onClose={() => setShowTimelineModal(null)}
            />

            {/* Add/Edit Order Modal */}
            <OrderModal
                showAddForm={showAddForm}
                newOrder={newOrder}
                setNewOrder={setNewOrder}
                editingOrder={editingOrder}
                selectedShop={selectedShop}
                onClose={resetForm}
                onSave={editingOrder ? handleUpdateOrder : handleAddOrder}
                onAddProduct={addProduct}
                onRemoveProduct={removeProduct}
                onUpdateProduct={updateProduct}
            />
        </div>
    );
};