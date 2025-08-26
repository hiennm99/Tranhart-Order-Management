// Enhanced Stats Card Component with modern design
interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    change?: number;
    gradient?: string;
}

export const StatsCard = ({
                              title,
                              value,
                              icon: Icon,
                              color = "text-gray-700",
                              change,
                              gradient = "from-blue-500 to-indigo-600"
                          }: StatsCardProps) => (
    <div className="group relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-transparent opacity-80"></div>

        {/* Animated floating elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-700 animate-bounce"></div>

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {title}
                    </p>
                    <p className={`text-3xl font-black ${color} mb-4 transition-all duration-300 group-hover:scale-105`}>
                        {value}
                    </p>

                    {change !== undefined && (
                        <div className="flex items-center space-x-2">
                            <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                                change > 0
                                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 shadow-md'
                                    : change < 0
                                        ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 shadow-md'
                                        : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 shadow-md'
                            }`}>
                                <span className="mr-1 text-sm">
                                    {change > 0 ? '📈' : change < 0 ? '📉' : '➡️'}
                                </span>
                                {Math.abs(change)}%
                            </div>
                            <span className="text-xs text-gray-400 font-medium">vs tháng trước</span>
                        </div>
                    )}
                </div>

                <div className={`relative p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg bg-gradient-to-r ${gradient}`}>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-50 blur-lg transition-opacity duration-500 group-hover:opacity-75`}></div>
                    <Icon className="relative h-8 w-8 text-white drop-shadow-sm" />
                </div>
            </div>

            {/* Progress bar animation */}
            <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: change ? `${Math.min(Math.abs(change) * 2, 100)}%` : '60%' }}
                ></div>
            </div>
        </div>

        {/* Hover shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
    </div>
);