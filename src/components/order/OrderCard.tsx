// components/OrderCard.tsx
import React from 'react';
import {
    Calendar, User, Phone, MapPin, DollarSign, Package,
    Eye, Edit, Trash2, Clock
} from 'lucide-react';
import type { Order } from '../../types/orders';
import { ProductCard } from '../cards/ProductCard';
import { StatusTimeline } from './StatusTimeline';
import { statusConfig, paymentStatusConfig } from '../../constants/statusConfig';
import { formatCurrency } from '../../utils/formatters';

interface OrderCardProps {
    order: Order;
    onViewTimeline: (order: Order) => void;
    onEdit?: (order: Order) => void;
    onDelete?: (orderId: number) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
                                                        order,
                                                        onViewTimeline,
                                                        onEdit,
                                                        onDelete
                                                    }) => {

    const config = statusConfig[order.currentStatus as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;

    const paymentConfig = paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig];

    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-white/90">
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
                                    onClick={() => onViewTimeline(order)}
                                    className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    title="Xem lịch sử"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(order)}
                                        className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(order.id)}
                                        className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
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
              <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${paymentConfig?.color} text-white shadow-lg`}>
                {paymentConfig?.icon && (
                    <paymentConfig.icon className="h-4 w-4" />
                )}
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
                                    onClick={() => onViewTimeline(order)}
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
};