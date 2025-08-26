// components/ProductCard.tsx
import React from 'react';
import type {Product} from "../../types/orders.ts";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Hàm lấy URL image từ public/images/products/
    const getImageUrl = (imageName: string): string => {
        if (!imageName) return getPlaceholderImage(product.sku);

        // Đường dẫn tới thư mục public/images/products/
        return `/images/products/${imageName}`;
    };

    // Placeholder image khi không có ảnh
    const getPlaceholderImage = (sku: string): string => {
        const code = sku.split('-')[1] || sku.slice(0, 3).toUpperCase();
        return `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=${code}`;
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="relative">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getPlaceholderImage(product.sku);
                        }}
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    {product.quantity}x
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">
            {product.sku}
          </span>
                </div>
                <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h4>
                <p className="text-sm text-gray-600">
                    {formatCurrency(product.unitPrice)} / sản phẩm
                </p>
            </div>
        </div>
    );
};