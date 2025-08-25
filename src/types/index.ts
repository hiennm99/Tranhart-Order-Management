export interface Order {
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

export interface Shop {
    id: number;
    name: string;
    type: string;
    status: string;
}

export interface DashboardProps {
    orders: Order[];
    selectedShop: Shop | null;
}