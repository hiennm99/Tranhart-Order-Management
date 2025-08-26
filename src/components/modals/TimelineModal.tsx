// components/TimelineModal.tsx
import React from 'react';
import { XCircle } from 'lucide-react';
import type { Order } from '../../types/orders';
import { StatusTimeline } from '../order/StatusTimeline';
import { ProductCard } from '../cards/ProductCard';

interface TimelineModalProps {
    order: Order | null;
    onClose: () => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Chi tiết đơn hàng #{order.id}</h2>
                            <p className="text-blue-100">{order.customerName}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <XCircle className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <StatusTimeline
                        statusHistory={order.statusHistory}
                        currentStatus={order.currentStatus}
                    />

                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Thông tin sản phẩm</h4>
                        <div className="space-y-2">
                            {order.products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};