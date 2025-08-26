import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {ShopProvider} from "./context/ShopContext.tsx";
import { MOCK_USER } from "./constants/mockData.ts";
import { Layout } from "./components/layout/Layout.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Orders } from "./components/order/Orders.tsx";
import { PlaceholderView } from "./components/layout/PlaceholderView.tsx";
import { BarChart3, Package, Settings, Users, Wallet } from "lucide-react";

function App() {
    return (
        <ShopProvider>
            <Router>
                <Layout user={MOCK_USER}>
                    <Routes>
                        {/* Redirect root to dashboard */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        {/* Main routes */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route
                            path="/products"
                            element={
                                <PlaceholderView
                                    title="Quản lý sản phẩm"
                                    icon={Package}
                                    description="Tính năng đang được phát triển với nhiều tính năng mạnh mẽ để quản lý kho hàng, theo dõi tồn kho và cập nhật giá cả một cách hiệu quả"
                                />
                            }
                        />
                        <Route
                            path="/customers"
                            element={
                                <PlaceholderView
                                    title="Quản lý khách hàng"
                                    icon={Users}
                                    description="Hệ thống CRM hoàn chỉnh để quản lý thông tin khách hàng, lịch sử mua hàng và chương trình khuyến mãi"
                                />
                            }
                        />
                        <Route
                            path="/analytics"
                            element={
                                <PlaceholderView
                                    title="Báo cáo & Thống kê"
                                    icon={BarChart3}
                                    description="Dashboard phân tích chi tiết với biểu đồ trực quan, báo cáo doanh thu và xu hướng kinh doanh theo thời gian thực"
                                />
                            }
                        />
                        <Route
                            path="/finance"
                            element={
                                <PlaceholderView
                                    title="Quản lý tài chính"
                                    icon={Wallet}
                                    description="Theo dõi dòng tiền, quản lý chi phí, lợi nhuận và tạo báo cáo tài chính tự động cho doanh nghiệp"
                                />
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <PlaceholderView
                                    title="Cài đặt hệ thống"
                                    icon={Settings}
                                    description="Tùy chỉnh cấu hình hệ thống, quyền người dùng, thông báo và tích hợp với các dịch vụ bên thứ ba"
                                />
                            }
                        />

                        {/* Catch all route - redirect to dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </Layout>

                {/* Global Loading Spinner */}
                <div id="loading-spinner" className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center hidden">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm font-medium text-gray-600">Đang tải...</p>
                    </div>
                </div>
            </Router>
        </ShopProvider>
    );
}

export default App;