import './App.css'

import { useState } from "react";
import { MOCK_ORDERS, MOCK_SHOPS, MOCK_USER} from "./constants/mockData.ts";
import {Sidebar} from "./components/layout/Sidebar.tsx";
import {Header} from "./components/layout/Header.tsx";
import {BarChart3, Package, Settings, Users, Wallet} from "lucide-react";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Orders} from "./components/order/Orders.tsx";
import {PlaceholderView} from "./components/layout/PlaceholderView.tsx";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [activeView, setActiveView] = useState<string>('dashboard');
    const [selectedShop, setSelectedShop] = useState(MOCK_SHOPS[0]);
    const [orders, setOrders] = useState(MOCK_ORDERS);

    const handleViewChange = (view: string) => {
        setActiveView(view);
        setSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const handleShopChange = (shop: typeof MOCK_SHOPS[0]) => {
        setSelectedShop(shop);
    };

    const renderActiveView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard orders={orders} selectedShop={selectedShop} />;
            case 'orders':
                return <Orders orders={orders} selectedShop={selectedShop} onOrderUpdate={setOrders} />;
            case 'products':
                return <PlaceholderView title="Quản lý sản phẩm" icon={Package} description="Tính năng đang được phát triển với nhiều tính năng mạnh mẽ để quản lý kho hàng, theo dõi tồn kho và cập nhật giá cả một cách hiệu quả" />;
            case 'customers':
                return <PlaceholderView title="Quản lý khách hàng" icon={Users} description="Hệ thống CRM hoàn chỉnh để quản lý thông tin khách hàng, lịch sử mua hàng và chương trình khuyến mãi" />;
            case 'analytics':
                return <PlaceholderView title="Báo cáo & Thống kê" icon={BarChart3} description="Dashboard phân tích chi tiết với biểu đồ trực quan, báo cáo doanh thu và xu hướng kinh doanh theo thời gian thực" />;
            case 'finance':
                return <PlaceholderView title="Quản lý tài chính" icon={Wallet} description="Theo dõi dòng tiền, quản lý chi phí, lợi nhuận và tạo báo cáo tài chính tự động cho doanh nghiệp" />;
            case 'settings':
                return <PlaceholderView title="Cài đặt hệ thống" icon={Settings} description="Tùy chỉnh cấu hình hệ thống, quyền người dùng, thông báo và tích hợp với các dịch vụ bên thứ ba" />;
            default:
                return <Dashboard orders={orders} selectedShop={selectedShop} />;
        }
    };

    return (
        <>
            <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                    activeView={activeView}
                    onViewChange={handleViewChange}
                    selectedShop={selectedShop}
                    onShopChange={handleShopChange}
                    shops={MOCK_SHOPS}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                    {/* Header */}
                    <Header
                        user={MOCK_USER}
                        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                        selectedShop={selectedShop}
                    />

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {renderActiveView()}
                        </div>
                    </main>
                </div>
            </div>

            {/* Global Loading Spinner (hidden by default) */}
            <div id="loading-spinner" className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center hidden">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-600">Đang tải...</p>
                </div>
            </div>
        </>
    );
}

export default App;