// Stats Card Component
interface StatsCardProps {
    title: string;
    value: number;
    icon: string;
    color?: string;
    change: number;
}

export const StatsCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                {change && (
                    <p className="text-xs text-gray-500 mt-1">
                        {change > 0 ? '+' : ''}{change}% so với tháng trước
                    </p>
                )}
            </div>
            <Icon className={`h-8 w-8 ${color.replace('text-', 'text-').replace('-600', '-500')}`} />
        </div>
    </div>
);