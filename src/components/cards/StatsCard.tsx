// Stats Card Component - Fixed and Enhanced
interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    change?: number;
}

export const StatsCard = ({ title, value, icon: Icon, color = "text-gray-600", change }: StatsCardProps) => (
    <div className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
                <p className={`text-2xl font-bold ${color} mb-3 transition-colors duration-200`}>
                    {value}
                </p>
                {change !== undefined && (
                    <div className="flex items-center space-x-1">
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                            change > 0
                                ? 'bg-green-100 text-green-700'
                                : change < 0
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-700'
                        }`}>
                            <span className="mr-1">
                                {change > 0 ? '↗' : change < 0 ? '↘' : '→'}
                            </span>
                            {Math.abs(change)}%
                        </div>
                        <span className="text-xs text-gray-500">so với tháng trước</span>
                    </div>
                )}
            </div>
            <div className={`p-4 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                color === 'text-green-600' ? 'bg-green-50' :
                    color === 'text-blue-600' ? 'bg-blue-50' :
                        color === 'text-yellow-600' ? 'bg-yellow-50' :
                            color === 'text-purple-600' ? 'bg-purple-50' :
                                'bg-gray-50'
            }`}>
                <Icon className={`h-7 w-7 ${color} transition-colors duration-200`} />
            </div>
        </div>

        {/* Subtle gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
);