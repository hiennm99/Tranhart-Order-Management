// components/OrderModal.tsx
import React from 'react';
import { XCircle, Plus, Trash2 } from 'lucide-react';
import { NewOrderForm, Product, Shop } from '../types/orders';
import { statusConfig, paymentStatusConfig } from '../constants/statusConfig';

interface OrderModalProps {
    showAddForm: boolean;
    newOrder: NewOrderForm;
    setNewOrder: (order: NewOrderForm) => void;
    editingOrder: any; // You might want to type this properly
    selectedShop: Shop | null;
    onClose: () => void;
    onSave: () => void;
    onAddProduct: () => void;
    onRemoveProduct: (index: number) => void;
    onUpdateProduct: (index: number, field: keyof Product, value: string | number) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
                                                          showAddForm,
                                                          newOrder,
                                                          setNewOrder,
                                                          editingOrder,
                                                          selectedShop,
                                                          onClose,
                                                          onSave,
                                                          onAddProduct,
                                                          onRemoveProduct,
                                                          onUpdateProduct
                                                      }) => {
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (!showAddForm) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            {editingOrder ? 'Chỉnh sửa đơn hàng' : `Thêm đơn hàng mới - ${selectedShop?.name}`}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <XCircle className="h-5 w-5" />
                        </button>
                    </div>
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
                                onClick={onAddProduct}
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
                                            onClick={() => onRemoveProduct(index)}
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
                                            onChange={(e) => onUpdateProduct(index, 'sku', e.target.value)}
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
                                            onChange={(e) => onUpdateProduct(index, 'name', e.target.value)}
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
                                            onChange={(e) => onUpdateProduct(index, 'image', e.target.value)}
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
                                            onChange={(e) => onUpdateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
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
                                            onChange={(e) => onUpdateProduct(index, 'unitPrice', parseInt(e.target.value) || 0)}
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
                            rows={3}
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
                        onClick={onClose}
                        className="px-6 py-3 text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSave}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                    >
                        {editingOrder ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}
                    </button>
                </div>
            </div>
        </div>
    );
};