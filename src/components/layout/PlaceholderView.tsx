import { ArrowRight, Calendar, Zap } from 'lucide-react';

interface PlaceholderViewProps {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}

export const PlaceholderView = ({ title, icon: Icon, description }: PlaceholderViewProps) => (
    <div className="flex items-center justify-center min-h-96 p-8">
        <div className="text-center max-w-2xl mx-auto">
            {/* Icon with animated background */}
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-inner mb-4 relative overflow-hidden">
                    {/* Animated background circles */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full absolute top-2 left-2 animate-pulse"></div>
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full absolute bottom-3 right-3 animate-pulse delay-300"></div>
                    </div>
                    <Icon className="h-16 w-16 text-gray-400 relative z-10" />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce delay-100"></div>
                <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-green-200 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-200 rounded-full animate-bounce delay-500"></div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
                        {description}
                    </p>
                </div>

                {/* Feature preview cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Tính năng mạnh mẽ</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Được thiết kế với công nghệ hiện đại và trải nghiệm người dùng tối ưu
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <Calendar className="h-5 w-5 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Sắp ra mắt</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Chúng tôi đang nỗ lực phát triển để mang đến trải nghiệm tuyệt vời nhất
                        </p>
                    </div>
                </div>

                {/* Call to action */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-center space-x-3 text-blue-700">
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold">Theo dõi cập nhật tại phần thông báo</span>
                        <ArrowRight className="h-4 w-4" />
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <span className="text-sm font-medium text-gray-600">Tiến độ phát triển</span>
                    </div>
                    <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">60% hoàn thành</p>
                </div>
            </div>
        </div>
    </div>
);