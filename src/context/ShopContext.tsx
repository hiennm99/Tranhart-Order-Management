import { createContext, useContext, useState } from 'react';
import type {ReactNode} from "react";
import { MOCK_SHOPS, MOCK_ORDERS } from '../constants/mockData';

interface Shop {
    id: number;
    name: string;
    type: string;
    status: string;
}

interface Order {
    id: number;
    shopId: number;
    orderDate: string;
    customerName: string;
    phone: string;
    address: string;
    product: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    deliveryDate?: string;
    notes?: string;
}

interface ShopContextType {
    selectedShop: Shop | null;
    shops: Shop[];
    orders: Order[];
    setSelectedShop: (shop: Shop) => void;
    setOrders: (orders: Order[]) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider = ({ children }: ShopProviderProps) => {
    const [selectedShop, setSelectedShop] = useState<Shop | null>(MOCK_SHOPS[0]);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    const value = {
        selectedShop,
        shops: MOCK_SHOPS,
        orders,
        setSelectedShop,
        setOrders
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};