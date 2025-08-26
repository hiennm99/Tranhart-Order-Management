import {useMemo, useState} from "react";
import {
    TruckIcon, Edit, Plus, Search, ShoppingCart,
    Trash2, Package, Calendar, User, Phone, MapPin,
    DollarSign, Clock, CheckCircle, AlertCircle
} from "lucide-react";

// Mock context - replace with your actual context
const useShop = () => ({
    selectedShop: {
        id: 1,
        name: "Shop Thời Trang ABC"
    },
    orders: [
        {
            id: 1001,
            shopId: 1,
            orderDate: "2024-08-26",
            customerName: "Nguyễn Văn A",
            phone: "0123456789",
            address: "123 Lê Lợi, Q1, TP.HCM",
            product: "Áo thun nam",
            quantity: 2,
            unitPrice: 250000,
            totalAmount: 500000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            notes: "Giao hàng nhanh"
        },
        {
            id: 1002,
            shopId: 1,
            orderDate: "2024-08-25",
            customerName: "Trần Thị B",
            phone: "0987654321",
            address: "456 Nguyễn Huệ, Q1, TP.HCM",
            product: "Váy maxi nữ",
            quantity: 1,
            unitPrice: 350000,
            totalAmount: 350000,
            status: "Đang giao",
            paymentStatus: "Đã thanh toán",
            notes: ""
        },
        {
            id: 1003,
            shopId: 1,
            orderDate: "2024-08-24",
            customerName: "Lê Văn C",
            phone: "0369258147",
            address: "789 Hai Bà Trưng, Q3, TP.HCM",
            product: "Quần jeans",
            quantity: 1,
            unitPrice: 450000,
            totalAmount: 450000,
            status: "Chờ xử lý",
            paymentStatus: "Chưa thanh toán",
            notes: "Khách yêu cầu gọi trước khi giao"
        }
    ],
    setOrders: () => {}
});

export const Orders = () => {
    const { selectedShop, orders, setOrders } = useShop();
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

    const formatCurrency = (amount: any) => {
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
        setOrders([...orders, order]);
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
        setOrders(updatedOrders);
        resetForm();
    };

    const handleDeleteOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Đã giao':
                return <CheckCircle className="h-4 w-4" />;
            case 'Đang giao':
                return <TruckIcon className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đã giao':
                return 'from-green-500 to-emerald-500 text-white shadow-green-500/25';
            case 'Đang giao':
                return 'from-blue-500 to-cyan-500 text-white shadow-blue-500/25';
            default:
                return 'from-yellow-500 to-orange-500 text-white shadow-yellow-500/25';
        }
    };

    const getPaymentStatusColor = (status) => {
        return status === 'Đã thanh toán'
            ? 'from-green-500 to-emerald-500 text-white shadow-green-500/25'
            : 'from-red-500 to-pink-500 text-white shadow-red-500/25';
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
                            placeholder="Tìm kiếm theo tên, sản phẩm, số điện thoại..."
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
                        <option value="Chờ xử lý">Chờ xử lý</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã giao">Đã giao</option>
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
                        <div key={order.id} className="group relative overflow-hidden bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90">
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 p-6">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Order Info */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">#{order.id}</h3>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Calendar className="h-4 w-4" />
                                                        {order.orderDate}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700 mb-1">
                                                    <User className="h-4 w-4 text-blue-500" />
                                                    <span className="font-semibold">{order.customerName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                                    <Phone className="h-4 w-4 text-green-500" />
                                                    <span>{order.phone}</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-gray-600">
                                                    <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                                                    <span className="text-sm">{order.address}</span>
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button
                                                    onClick={() => handleEditOrder(order)}
                                                    className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product & Quantity */}
                                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                                            <Package className="h-8 w-8 text-purple-500" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.product}</p>
                                                <p className="text-sm text-gray-600">Số lượng: {order.quantity}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Payment */}
                                    <div className="lg:w-80 space-y-4">
                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-2 mb-2">
                                                <DollarSign className="h-5 w-5 text-green-600" />
                                                <span className="text-2xl font-bold text-gray-900">
                                                    {formatCurrency(order.totalAmount)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">Đơn giá: {formatCurrency(order.unitPrice)}</p>
                                        </div>

                                        {/* Status badges */}
                                        <div className="space-y-3">
                                            <div className="flex justify-end">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${getStatusColor(order.status)} shadow-lg`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-end">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${getPaymentStatusColor(order.paymentStatus)} shadow-lg`}>
                                                    {order.paymentStatus === 'Đã thanh toán' ?
                                                        <CheckCircle className="h-4 w-4" /> :
                                                        <AlertCircle className="h-4 w-4" />
                                                    }
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                        </div>

                                        {order.notes && (
                                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <p className="text-sm text-yellow-800 font-medium">Ghi chú:</p>
                                                <p className="text-sm text-yellow-700">{order.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Order Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                            <h2 className="text-2xl font-bold">
                                {editingOrder ? 'Chỉnh sửa đơn hàng' : `Thêm đơn hàng mới - ${selectedShop.name}`}
                            </h2>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Tên khách hàng</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                        value={newOrder.customerName}
                                        onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                                        placeholder="Nhập tên khách hàng"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                        value={newOrder.phone}
                                        onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Địa chỉ</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                    value={newOrder.address}
                                    onChange={(e) => setNewOrder({...newOrder, address: e.target.value})}
                                    placeholder="Nhập địa chỉ giao hàng"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Sản phẩm</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                        value={newOrder.product}
                                        onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                                        placeholder="Tên sản phẩm"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Số lượng</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                        value={newOrder.quantity}
                                        onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value)})}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Đơn giá</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                        value={newOrder.unitPrice}
                                        onChange={(e) => setNewOrder({...newOrder, unitPrice: parseInt(e.target.value)})}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Trạng thái</label>
                                    <select
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 cursor-pointer"
                                        value={newOrder.status}
                                        onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                                    >
                                        <option value="Chờ xử lý">Chờ xử lý</option>
                                        <option value="Đang giao">Đang giao</option>
                                        <option value="Đã giao">Đã giao</option>
                                    </select>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Thanh toán</label>
                                    <select
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 cursor-pointer"
                                        value={newOrder.paymentStatus}
                                        onChange={(e) => setNewOrder({...newOrder, paymentStatus: e.target.value})}
                                    >
                                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                                        <option value="Đã thanh toán">Đã thanh toán</option>
                                    </select>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">Ghi chú</label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 resize-none"
                                    rows="3"
                                    value={newOrder.notes}
                                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                                    placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                                />
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-700">Tổng tiền:</span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {formatCurrency(newOrder.quantity * newOrder.unitPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-gray-100 flex justify-end space-x-4 bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={resetForm}
                                className="px-6 py-3 text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={editingOrder ? handleUpdateOrder : handleAddOrder}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                            >
                                {editingOrder ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};