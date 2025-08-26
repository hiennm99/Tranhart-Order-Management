// types/orders.ts
import { LucideIcon } from "lucide-react";

export interface Product {
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
    image: string;
}

export interface StatusHistoryItem {
    status: string;
    timestamp: string;
    completed: boolean;
}

export interface Order {
    id: number;
    shopId: number;
    orderDate: string;
    customerName: string;
    phone: string;
    address: string;
    products: Product[];
    totalAmount: number;
    statusHistory: StatusHistoryItem[];
    currentStatus: string;
    paymentStatus: string;
    notes: string;
}

export interface Shop {
    id: number;
    name: string;
}

export interface StatusConfig {
    icon: LucideIcon;
    color: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
}

export interface PaymentStatusConfig {
    icon: LucideIcon;
    color: string;
}

export interface NewOrderForm {
    customerName: string;
    phone: string;
    address: string;
    products: Product[];
    currentStatus: string;
    paymentStatus: string;
    notes: string;
}

export interface ShopContextType {
    selectedShop: Shop | null;
    orders: Order[];
    setOrders: (orders: Order[]) => void;
}