import { ArrowRight, Calendar, Zap, Sparkles, Star, Crown, Rocket } from 'lucide-react';

interface PlaceholderViewProps {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}

export const PlaceholderView = ({ title, icon: Icon, description }: PlaceholderViewProps) => (
    <div className="flex items-center justify-center min-h-96 p-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-bounce opacity-25"></div>

        <div className="relative text-center max-w-3xl mx-auto">
            {/* Icon with enhanced animated background */}
            <div className="relative mb-12">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-8 relative overflow-hidden transform hover:scale-110 transition-transform duration-500">
                    {/* Multiple animated rings */}
                    <div className="absolute inset-6 border-4 border-purple-300/30 rounded-full animate-spin"></div>
                    <div className="absolute inset-10 border-2 border-blue-400/40 rounded-full animate-pulse"></div>
                    <div className="absolute inset-12 border border-pink-300/50 rounded-full animate-ping"></div>

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-purple-200/30 to-indigo-200/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-gradient-to-tl from-pink-200/10 via-purple-200/20 to-blue-200/15 rounded-full animate-pulse delay-500"></div>

                    <Icon className="relative h-20 w-20 text-purple-500 drop-shadow-lg z-10" />
                </div>

                {/* Enhanced floating elements */}
                <div className="absolute -top-4 -left-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                    <Star className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -top-8 -right-8 w-14 h-14 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                    <Sparkles className="h-7 w-7 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -bottom-6 -right-10 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-bounce delay-300 shadow-xl">
                    <Zap className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -bottom-2 -left-8 w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center animate-pulse delay-700 shadow-xl">
                    <Crown className="h-5 w-5 text-white drop-shadow-sm" />
                </div>
            </div>

            {/* Enhanced content */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-4xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-3">
                        <span>{title}</span>
                        <Rocket className="h-8 w-8 text-purple-500 animate-bounce" />
                    </h3>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                        {description}
                    </p>
                </div>

                {/* Enhanced feature preview cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
                    <div className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-110">
                                <Zap className="h-7 w-7 text-white drop-shadow-sm" />
                            </div>
                            <h4 className="font-black text-xl text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                ⚡ Tính năng siêu mạnh
                            </h4>
                        </div>
                        <p className="relative text-gray-600 leading-relaxed font-medium">
                            Được xây dựng với công nghệ AI tiên tiến và trải nghiệm người dùng đẳng cấp thế giới
                        </p>

                        {/* Hover shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        </div>
                    </div>

                    <div className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl group-hover:from-emerald-600 group-hover:to-green-600 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-110">
                                <Calendar className="h-7 w-7 text-white drop-shadow-sm" />
                            </div>
                            <h4 className="font-black text-xl text-gray-900 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                🚀 Sắp ra mắt
                            </h4>
                        </div>
                        <p className="relative text-gray-600 leading-relaxed font-medium">
                            Đội ngũ của chúng tôi đang nỗ lực từng ngày để mang đến những trải nghiệm tuyệt vời nhất
                        </p>

                        {/* Hover shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        </div>
                    </div>
                </div>

                {/* Enhanced call to action */}
                <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl border border-purple-200/50 shadow-xl relative overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/30 to-indigo-100/20"></div>
                    <div className="absolute top-2 right-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse opacity-40"></div>
                    <div className="absolute bottom-4 left-12 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce opacity-30"></div>

                    <div className="relative flex items-center justify-center space-x-4 text-purple-700">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-xl">
                            <Calendar className="h-6 w-6 text-white drop-shadow-sm" />
                        </div>
                        <span className="font-black text-xl flex items-center space-x-2">
                            <span>✨ Theo dõi cập nhật tại phần thông báo</span>
                        </span>
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg animate-bounce">
                            <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Enhanced progress indicator */}
                <div className="mt-10 relative">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <Rocket className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Tiến độ phát triển
                        </span>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                            <Star className="h-4 w-4 text-white animate-spin" />
                        </div>
                    </div>

                    <div className="relative w-full max-w-md mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
                        <div className="h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full shadow-lg relative overflow-hidden" style={{width: '75%'}}>
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                        </div>

                        {/* Floating progress indicator */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-xl" style={{left: '72%'}}>
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                                <Crown className="h-3 w-3 text-white" />
                            </div>
                        </div>
                    </div>

                    <p className="text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-4 flex items-center justify-center space-x-2">
                        <span>🎯</span>
                        <span>75% hoàn thành - Sắp có những điều tuyệt vời!</span>
                        <span>🎉</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
);