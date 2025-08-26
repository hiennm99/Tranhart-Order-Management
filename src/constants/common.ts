export const DEFAULT_ORDER_STATUS = 'Chờ xác nhận';
export const DEFAULT_PAYMENT_STATUS = 'Chưa thanh toán';

export const SHOP_TYPES = {
    FASHION: 'fashion',
    ELECTRONICS: 'electronics',
    COSMETICS: 'cosmetics'
} as const;

export const SHOP_TYPE_LABELS = {
    [SHOP_TYPES.FASHION]: 'Thời trang',
    [SHOP_TYPES.ELECTRONICS]: 'Điện tử',
    [SHOP_TYPES.COSMETICS]: 'Mỹ phẩm'
} as const;

export const SHOP_TYPE_ICONS = {
    [SHOP_TYPES.FASHION]: '👔',
    [SHOP_TYPES.ELECTRONICS]: '📱',
    [SHOP_TYPES.COSMETICS]: '💄'
} as const;

export const SHOP_TYPE_COLORS = {
    [SHOP_TYPES.FASHION]: 'from-pink-500 to-rose-500',
    [SHOP_TYPES.ELECTRONICS]: 'from-blue-500 to-cyan-500',
    [SHOP_TYPES.COSMETICS]: 'from-purple-500 to-pink-500'
} as const;
