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
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                selectedShop={selectedShop}
                onShopChange={setSelectedShop}
                shops={shops}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                {/* Header */}
                <Header
                    user={user}
                    onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                    selectedShop={selectedShop}
                />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};