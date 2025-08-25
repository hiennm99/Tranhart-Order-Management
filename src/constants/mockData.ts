// Mock data
export const MOCK_USER = {
    name: 'Nguyễn Văn Admin',
    email: 'admin@shop.com',
    avatar: null,
    role: 'Admin'
};

export const MOCK_SHOPS = [
    { id: 1, name: 'Shop Thời Trang', type: 'fashion', status: 'active' },
    { id: 2, name: 'Shop Điện Tử', type: 'electronics', status: 'active' },
    { id: 3, name: 'Shop Mỹ Phẩm', type: 'cosmetics', status: 'active' }
];

export const MOCK_ORDERS = [
    {
        id: 1,
        shopId: 1,
        orderDate: '2024-01-15',
        customerName: 'Nguyễn Văn A',
        phone: '0901234567',
        address: 'Hà Nội',
        product: 'Áo thun',
        quantity: 2,
        unitPrice: 150000,
        totalAmount: 300000,
        status: 'Đã giao',
        paymentStatus: 'Đã thanh toán',
        deliveryDate: '2024-01-18',
        notes: 'Giao nhanh'
    },
    {
        id: 2,
        shopId: 1,
        orderDate: '2024-01-16',
        customerName: 'Trần Thị B',
        phone: '0909876543',
        address: 'TP.HCM',
        product: 'Quần jeans',
        quantity: 1,
        unitPrice: 450000,
        totalAmount: 450000,
        status: 'Đang giao',
        paymentStatus: 'Chưa thanh toán',
        deliveryDate: '2024-01-20',
        notes: ''
    },
    {
        id: 3,
        shopId: 2,
        orderDate: '2024-01-17',
        customerName: 'Lê Văn C',
        phone: '0912345678',
        address: 'Đà Nẵng',
        product: 'iPhone 15',
        quantity: 1,
        unitPrice: 25000000,
        totalAmount: 25000000,
        status: 'Chờ xử lý',
        paymentStatus: 'Đã thanh toán',
        deliveryDate: '',
        notes: 'Kiểm tra máy kỹ'
    }
];