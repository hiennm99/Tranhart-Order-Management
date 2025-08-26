import {useMemo, useState} from "react";
import React from "react";
import {
    TruckIcon, Edit, Plus, Search, ShoppingCart,
    Trash2, Package, Calendar, User, Phone, MapPin,
    DollarSign, Clock, CheckCircle, AlertCircle,
    XCircle, RefreshCw, ArrowLeft, ShoppingBag,
    CreditCard, Truck, CheckCircle2, AlertTriangle,
    FileText, Eye
} from "lucide-react";

// Mock context - sử dụng useShop từ ShopContext
const useShop = () => ({
    selectedShop: {
        id: 1,
        name: "Aoi Gallery"
    },
    orders: [
        {
            id: 1001,
            shopId: 1,
            orderDate: "2024-08-26",
            customerName: "Nguyễn Văn A",
            phone: "0123456789",
            address: "123 Lê Lợi, Q1, TP.HCM",
            products: [
                {
                    sku: "AOI-TSN-001",
                    name: "Áo thun nam cổ tròn Basic",
                    quantity: 2,
                    unitPrice: 250000,
                    image: "aoi-tsn-001.jpg"
                },
                {
                    sku: "AOI-QJ-002",
                    name: "Quần jean slim fit",
                    quantity: 1,
                    unitPrice: 450000,
                    image: "aoi-qj-002.jpg"
                }
            ],
            totalAmount: 950000,
            statusHistory: [
                { status: "Chờ xác nhận", timestamp: "2024-08-26T08:00:00Z", completed: true },
                { status: "Đã xác nhận", timestamp: "2024-08-26T09:30:00Z", completed: true },
                { status: "Đang chuẩn bị hàng", timestamp: "2024-08-26T10:15:00Z", completed: true },
                { status: "Sẵn sàng giao hàng", timestamp: "2024-08-26T12:00:00Z", completed: true },
                { status: "Đang vận chuyển", timestamp: "2024-08-26T14:00:00Z", completed: true },
                { status: "Giao thành công", timestamp: "2024-08-26T16:30:00Z", completed: true }
            ],
            currentStatus: "Giao thành công",
            paymentStatus: "Đã thanh toán",
            notes: "Giao hàng nhanh, khách hàng hài lòng"
        },
        {
            id: 1002,
            shopId: 1,
            orderDate: "2024-08-25",
            customerName: "Trần Thị B",
            phone: "0987654321",
            address: "456 Nguyễn Huệ, Q1, TP.HCM",
            products: [
                {
                    sku: "AOI-VM-003",
                    name: "Váy maxi hoa nhí",
                    quantity: 1,
                    unitPrice: 350000,
                    image: "aoi-vm-003.jpg"
                }
            ],
            totalAmount: 350000,
            statusHistory: [
                { status: "Chờ xác nhận", timestamp: "2024-08-25T08:00:00Z", completed: true },
                { status: "Đã xác nhận", timestamp: "2024-08-25T09:00:00Z", completed: true },
                { status: "Đang chuẩn bị hàng", timestamp: "2024-08-25T10:00:00Z", completed: true },
                { status: "Sẵn sàng giao hàng", timestamp: "2024-08-25T12:00:00Z", completed: true },
                { status: "Đang vận chuyển", timestamp: "2024-08-25T14:00:00Z", completed: false }
            ],
            currentStatus: "Đang vận chuyển",
            paymentStatus: "Đã thanh toán",
            notes: "Khách yêu cầu gọi trước 30 phút"
        },
        {
            id: 1003,
            shopId: 1,
            orderDate: "2024-08-24",
            customerName: "Lê Văn C",
            phone: "0369258147",
            address: "789 Hai Bà Trưng, Q3, TP.HCM",
            products: [
                {
                    sku: "AOI-QJ-004",
                    name: "Quần jeans rách phong cách",
                    quantity: 1,
                    unitPrice: 450000,
                    image: "aoi-qj-004.jpg"
                }
            ],
            totalAmount: 450000,
            statusHistory: [
                { status: "Chờ xác nhận", timestamp: "2024-08-24T08:00:00Z", completed: false }
            ],
            currentStatus: "Chờ xác nhận",
            paymentStatus: "Chưa thanh toán",
            notes: "Khách hàng mới, cần xác nhận thông tin"
        }
    ],
    setOrders: () => {}
});

// Cấu hình trạng thái với icons và màu sắc
const statusConfig = {
    "Chờ xác nhận": {
        icon: Clock,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200"
    },
    "Đã xác nhận": {
        icon: CheckCircle,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200"
    },
    "Đang chuẩn bị hàng": {
        icon: Package,
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-800",
        borderColor: "border-purple-200"
    },
    "Sẵn sàng giao hàng": {
        icon: ShoppingBag,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-800",
        borderColor: "border-indigo-200"
    },
    "Đang vận chuyển": {
        icon: Truck,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200"
    },
    "Đang giao hàng": {
        icon: TruckIcon,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-50",
        textColor: "text-cyan-800",
        borderColor: "border-cyan-200"
    },
    "Giao thành công": {
        icon: CheckCircle2,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        borderColor: "border-green-200"
    },
    "Giao thất bại": {
        icon: AlertTriangle,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        borderColor: "border-red-200"
    },
    "Đã hủy": {
        icon: XCircle,
        color: "from-gray-500 to-slate-500",
        bgColor: "bg-gray-50",
        textColor: "text-gray-800",
        borderColor: "border-gray-200"
    },
    "Hoàn hàng": {
        icon: RefreshCw,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-800",
        borderColor: "border-orange-200"
    },
    "Đổi trả": {
        icon: ArrowLeft,
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-pink-50",
        textColor: "text-pink-800",
        borderColor: "border-pink-200"
    }
};

const paymentStatusConfig = {
    "Chờ thanh toán": { icon: Clock, color: "from-yellow-500 to-orange-500" },
    "Đã thanh toán": { icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    "Thanh toán thất bại": { icon: XCircle, color: "from-red-500 to-pink-500" },
    "Hoàn tiền": { icon: RefreshCw, color: "from-blue-500 to-cyan-500" }
};

// Component hiển thị timeline trạng thái
const StatusTimeline = ({ statusHistory, currentStatus }) => {
    return (
        <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Lịch sử đơn hàng
            </h4>
            <div className="space-y-3">
                {statusHistory.map((item, index) => {
                    const config = statusConfig[item.status];
                    const Icon = config?.icon || Clock;
                    const isCompleted = item.completed;
                    const isLast = index === statusHistory.length - 1;
                    const isCurrent = item.status === currentStatus;

                    return (
                        <div key={index} className="flex items-center gap-3 relative">
                            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                                isCompleted
                                    ? `bg-gradient-to-r ${config?.color} text-white shadow-lg`
                                    : isCurrent
                                        ? `bg-white border-2 ${config?.borderColor} text-gray-600 shadow-md animate-pulse`
                                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                            }`}>
                                <Icon className="w-5 h-5" />
                                {!isLast && (
                                    <div className={`absolute top-10 left-1/2 w-0.5 h-8 transform -translate-x-1/2 transition-colors duration-300 ${
                                        isCompleted ? 'bg-gradient-to-b from-green-400 to-green-300' : 'bg-gray-200'
                                    }`} />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium transition-colors duration-300 ${
                                    isCompleted ? 'text-gray-900' : isCurrent ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                    {item.status}
                                    {isCurrent && <span className="text-xs ml-2 text-blue-500">(Hiện tại)</span>}
                                </p>
                                {item.timestamp && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(item.timestamp).toLocaleString('vi-VN')}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Component hiển thị sản phẩm với SKU và image
const ProductCard = ({ product }) => {
    // Hàm tạo URL image từ SKU
    const getImageUrl = (imageName) => {
        // Trong thực tế, có thể lấy từ CDN hoặc API
        return `/images/products/${imageName}`;
    };

    // Placeholder image khi không có ảnh
    const getPlaceholderImage = (sku) => {
        return `https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=${sku.split('-')[1] || 'IMG'}`;
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="relative">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                        src={getPlaceholderImage(product.sku)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = getPlaceholderImage(product.sku);
                        }}
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    {product.quantity}x
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">
                        {product.sku}
                    </span>
                </div>
                <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h4>
                <p className="text-sm text-gray-600">
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(product.unitPrice)} / sản phẩm
                </p>
            </div>
        </div>
    );
};

export const Orders = () => {
    const { selectedShop, orders, setOrders } = useShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showTimelineModal, setShowTimelineModal] = useState(null);

    const [newOrder, setNewOrder] = useState({
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
        currentStatus: 'Chờ xác nhận',
        paymentStatus: 'Chưa thanh toán',
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleAddOrder = () => {
        const totalAmount = newOrder.products.reduce((sum, product) =>
            sum + (product.quantity * product.unitPrice), 0
        );

        const order = {
            id: Date.now(),
            shopId: selectedShop.id,
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
            currentStatus: 'Chờ xác nhận',
            paymentStatus: 'Chưa thanh toán',
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

    const removeProduct = (index) => {
        if (newOrder.products.length > 1) {
            setNewOrder({
                ...newOrder,
                products: newOrder.products.filter((_, i) => i !== index)
            });
        }
    };

    const updateProduct = (index, field, value) => {
        const updatedProducts = newOrder.products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setNewOrder({ ...newOrder, products: updatedProducts });
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
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                        <option value="Sẵn sàng giao hàng">Sẵn sàng giao hàng</option>
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Giao thành công">Giao thành công</option>
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
                    filteredOrders.map(order => {
                        const config = statusConfig[order.currentStatus];
                        const Icon = config?.icon || Clock;

                        return (
                            <div key={order.id} className="group relative overflow-hidden bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-white/90">
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 p-6">
                                    <div className="flex flex-col xl:flex-row gap-6">
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
                                                        onClick={() => setShowTimelineModal(order)}
                                                        className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                        title="Xem lịch sử"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
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

                                            {/* Products */}
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Package className="h-4 w-4" />
                                                    Sản phẩm ({order.products.length})
                                                </h4>
                                                {order.products.map((product, index) => (
                                                    <ProductCard key={index} product={product} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Status & Payment */}
                                        <div className="xl:w-96 space-y-4">
                                            <div className="text-right">
                                                <div className="flex items-center justify-end gap-2 mb-2">
                                                    <DollarSign className="h-5 w-5 text-green-600" />
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        {formatCurrency(order.totalAmount)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {order.products.length} sản phẩm
                                                </p>
                                            </div>

                                            {/* Current Status */}
                                            <div className="flex justify-end mb-4">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${config?.color} text-white shadow-lg`}>
                                                    <Icon className="h-4 w-4" />
                                                    {order.currentStatus}
                                                </span>
                                            </div>

                                            {/* Payment Status */}
                                            <div className="flex justify-end mb-4">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${paymentStatusConfig[order.paymentStatus]?.color} text-white shadow-lg`}>
                                                    {paymentStatusConfig[order.paymentStatus]?.icon &&
                                                        React.createElement(paymentStatusConfig[order.paymentStatus].icon, { className: "h-4 w-4" })
                                                    }
                                                    {order.paymentStatus}
                                                </span>
                                            </div>

                                            {/* Mini Timeline */}
                                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border">
                                                <StatusTimeline
                                                    statusHistory={order.statusHistory.slice(-3)}
                                                    currentStatus={order.currentStatus}
                                                />
                                                {order.statusHistory.length > 3 && (
                                                    <button
                                                        onClick={() => setShowTimelineModal(order)}
                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center gap-1"
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                        Xem đầy đủ
                                                    </button>
                                                )}
                                            </div>

                                            {order.notes && (
                                                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                    <p className="text-sm text-yellow-800 font-medium mb-1">Ghi chú:</p>
                                                    <p className="text-sm text-yellow-700">{order.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Timeline Modal */}
            {showTimelineModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">Chi tiết đơn hàng #{showTimelineModal.id}</h2>
                                    <p className="text-blue-100">{showTimelineModal.customerName}</p>
                                </div>
                                <button
                                    onClick={() => setShowTimelineModal(null)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <StatusTimeline
                                statusHistory={showTimelineModal.statusHistory}
                                currentStatus={showTimelineModal.currentStatus}
                            />

                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Thông tin sản phẩm</h4>
                                <div className="space-y-2">
                                    {showTimelineModal.products.map((product, index) => (
                                        <ProductCard key={index} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Order Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                            <h2 className="text-2xl font-bold">
                                {editingOrder ? 'Chỉnh sửa đơn hàng' : `Thêm đơn hàng mới - ${selectedShop.name}`}
                            </h2>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                        Tên khách hàng
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                        value={newOrder.customerName}
                                        onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                                        placeholder="Nhập tên khách hàng"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                        Số điện thoại
                                    </label>
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                    Địa chỉ giao hàng
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                                    value={newOrder.address}
                                    onChange={(e) => setNewOrder({...newOrder, address: e.target.value})}
                                    placeholder="Nhập địa chỉ giao hàng"
                                />
                            </div>

                            {/* Products Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Sản phẩm</h3>
                                    <button
                                        type="button"
                                        onClick={addProduct}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm sản phẩm
                                    </button>
                                </div>

                                {newOrder.products.map((product, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-800">Sản phẩm #{index + 1}</h4>
                                            {newOrder.products.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Mã SKU
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-mono"
                                                    value={product.sku}
                                                    onChange={(e) => updateProduct(index, 'sku', e.target.value)}
                                                    placeholder="AOI-TSN-001"
                                                />
                                            </div>

                                            <div className="group lg:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Tên sản phẩm
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                    value={product.name}
                                                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                                                    placeholder="Tên sản phẩm"
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Hình ảnh
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-xs"
                                                    value={product.image}
                                                    onChange={(e) => updateProduct(index, 'image', e.target.value)}
                                                    placeholder="image.jpg"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Số lượng
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                    value={product.quantity}
                                                    onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Đơn giá
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                    value={product.unitPrice}
                                                    onChange={(e) => updateProduct(index, 'unitPrice', parseInt(e.target.value) || 0)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        <div className="text-right p-4 bg-blue-50 rounded-lg">
                                            <span className="text-sm text-gray-600">Thành tiền: </span>
                                            <span className="font-bold text-blue-600">
                                                {formatCurrency(product.quantity * product.unitPrice)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Status & Payment */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Trạng thái đơn hàng
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 cursor-pointer"
                                        value={newOrder.currentStatus}
                                        onChange={(e) => setNewOrder({...newOrder, currentStatus: e.target.value})}
                                    >
                                        {Object.keys(statusConfig).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Trạng thái thanh toán
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 cursor-pointer"
                                        value={newOrder.paymentStatus}
                                        onChange={(e) => setNewOrder({...newOrder, paymentStatus: e.target.value})}
                                    >
                                        {Object.keys(paymentStatusConfig).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ghi chú
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                                    rows="3"
                                    value={newOrder.notes}
                                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                                    placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                                />
                            </div>

                            {/* Total Amount */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-700">Tổng tiền đơn hàng:</span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {formatCurrency(newOrder.products.reduce((sum, product) =>
                                            sum + (product.quantity * product.unitPrice), 0
                                        ))}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mt-2">
                                    Gồm {newOrder.products.length} sản phẩm •
                                    Tổng SL: {newOrder.products.reduce((sum, product) => sum + product.quantity, 0)}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
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