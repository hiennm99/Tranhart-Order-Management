// components/StatusTimeline.tsx
import React from 'react';
import { FileText, Clock } from 'lucide-react';
import type { StatusHistoryItem } from '../../types/orders'
import { statusConfig } from '../../constants/statusConfig';

interface StatusTimelineProps {
    statusHistory: StatusHistoryItem[];
    currentStatus: string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
                                                                  statusHistory,
                                                                  currentStatus
                                                              }) => {
    return (
        <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Lịch sử đơn hàng
            </h4>
            <div className="space-y-3">
                {statusHistory.map((item, index) => {
                    const config = statusConfig[item.status as keyof typeof statusConfig];
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