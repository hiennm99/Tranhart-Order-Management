import { useState } from "react";
import {useShop} from "../../context/ShopContext.tsx";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
    children: React.ReactNode;
    user: {
        name: string;
        email: string;
        role: string;
    };
}

export const Layout = ({ children, user }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { selectedShop, shops, setSelectedShop } = useShop();

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-200/15 to-blue-200/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

            {/* Floating particles */}
            <div className="absolute top-20 left-40 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce opacity-30"></div>
            <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-25"></div>
            <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping opacity-20"></div>

            {/* Sidebar - Fixed width */}
            <div className="hidden lg:block w-80 flex-shrink-0">
                <Sidebar
                    isOpen={true}
                    onToggle={() => {}}
                    selectedShop={selectedShop}
                    onShopChange={setSelectedShop}
                    shops={shops}
                />
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden">
                <Sidebar
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                    selectedShop={selectedShop}
                    onShopChange={setSelectedShop}
                    shops={shops}
                />
            </div>

            {/* Main Content - Full width minus sidebar */}
            <div className="relative flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Header */}
                <Header
                    user={user}
                    onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                    selectedShop={selectedShop}
                />

                {/* Main Content Area */}
                <main className="relative flex-1 overflow-y-auto">
                    {/* Content background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 pointer-events-none"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};