// Mock data
export const MOCK_USER = {
    name: 'Nguyễn Văn Admin',
    email: 'admin@shop.com',
    avatar: null,
    role: 'Admin'
};

export const MOCK_SHOPS = [
    { id: 1, name: 'Aoi Gallery', type: 'fashion', status: 'active' },
    { id: 2, name: 'Tritone Gallery', type: 'electronics', status: 'active' },
    { id: 3, name: 'Green Gallery', type: 'cosmetics', status: 'active' }
];

export const MOCK_ORDERS = [
    {
        id: 1,
        shopId: 1,
        orderDate: '2024-01-15',
        customerName: 'Nguyễn Văn A',
        phone: '0901234567',
        address: 'Hà Nội',
        products: [
            {
                sku: 'AOI-TSN-001',
                name: 'Áo thun nam cao cấp',
                quantity: 2,
                unitPrice: 150000,
                image: 'ao-thun-1.jpg'
            }
        ],
        totalAmount: 300000,
        currentStatus: 'Giao thành công',
        paymentStatus: 'Đã thanh toán',
        statusHistory: [
            { status: 'Chờ xác nhận', timestamp: '2024-01-15T10:00:00Z', completed: true },
            { status: 'Đã xác nhận', timestamp: '2024-01-15T14:00:00Z', completed: true },
            { status: 'Đang chuẩn bị hàng', timestamp: '2024-01-16T09:00:00Z', completed: true },
            { status: 'Đang vận chuyển', timestamp: '2024-01-17T08:00:00Z', completed: true },
            { status: 'Giao thành công', timestamp: '2024-01-18T15:00:00Z', completed: true }
        ],
        notes: 'Giao nhanh'
    },
    {
        id: 2,
        shopId: 1,
        orderDate: '2024-01-16',
        customerName: 'Trần Thị B',
        phone: '0909876543',
        address: 'TP.HCM',
        products: [
            {
                sku: 'AOI-QJN-002',
                name: 'Quần jeans nữ slim fit',
                quantity: 1,
                unitPrice: 450000,
                image: 'quan-jeans-1.jpg'
            }
        ],
        totalAmount: 450000,
        currentStatus: 'Đang giao hàng',
        paymentStatus: 'Chưa thanh toán',
        statusHistory: [
            { status: 'Chờ xác nhận', timestamp: '2024-01-16T11:00:00Z', completed: true },
            { status: 'Đã xác nhận', timestamp: '2024-01-16T15:00:00Z', completed: true },
            { status: 'Đang chuẩn bị hàng', timestamp: '2024-01-17T10:00:00Z', completed: true },
            { status: 'Đang giao hàng', timestamp: '2024-01-18T09:00:00Z', completed: false }
        ],
        notes: ''
    },
    {
        id: 3,
        shopId: 2,
        orderDate: '2024-01-17',
        customerName: 'Lê Văn C',
        phone: '0912345678',
        address: 'Đà Nẵng',
        products: [
            {
                sku: 'TRI-IPH-001',
                name: 'iPhone 15 Pro Max 256GB',
                quantity: 1,
                unitPrice: 25000000,
                image: 'iphone-15-pro.jpg'
            }
        ],
        totalAmount: 25000000,
        currentStatus: 'Chờ xác nhận',
        paymentStatus: 'Đã thanh toán',
        statusHistory: [
            { status: 'Chờ xác nhận', timestamp: '2024-01-17T16:00:00Z', completed: false }
        ],
        notes: 'Kiểm tra máy kỹ'
    }
];