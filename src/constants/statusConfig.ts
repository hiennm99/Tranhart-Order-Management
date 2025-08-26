// constants/statusConfig.ts
import {
    TruckIcon, Clock, CheckCircle, Package, ShoppingBag,
    Truck, CheckCircle2, AlertTriangle, XCircle, RefreshCw, ArrowLeft
} from "lucide-react";
import type { StatusConfig, PaymentStatusConfig } from "../types/orders";

export const statusConfig: Record<string, StatusConfig> = {
    "Chờ xác nhận": {
        icon: Clock,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200"
    },
    "Đã xác nhận": {
        icon: CheckCircle,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200"
    },
    "Đang chuẩn bị hàng": {
        icon: Package,
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-800",
        borderColor: "border-purple-200"
    },
    "Sẵn sàng giao hàng": {
        icon: ShoppingBag,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-800",
        borderColor: "border-indigo-200"
    },
    "Đang vận chuyển": {
        icon: Truck,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200"
    },
    "Đang giao hàng": {
        icon: TruckIcon,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-50",
        textColor: "text-cyan-800",
        borderColor: "border-cyan-200"
    },
    "Giao thành công": {
        icon: CheckCircle2,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        borderColor: "border-green-200"
    },
    "Giao thất bại": {
        icon: AlertTriangle,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        borderColor: "border-red-200"
    },
    "Đã hủy": {
        icon: XCircle,
        color: "from-gray-500 to-slate-500",
        bgColor: "bg-gray-50",
        textColor: "text-gray-800",
        borderColor: "border-gray-200"
    },
    "Hoàn hàng": {
        icon: RefreshCw,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-800",
        borderColor: "border-orange-200"
    },
    "Đổi trả": {
        icon: ArrowLeft,
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-pink-50",
        textColor: "text-pink-800",
        borderColor: "border-pink-200"
    }
};

export const paymentStatusConfig: Record<string, PaymentStatusConfig> = {
    "Chưa thanh toán": { icon: Clock, color: "from-yellow-500 to-orange-500" },
    "Đã thanh toán": { icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    "Thanh toán thất bại": { icon: XCircle, color: "from-red-500 to-pink-500" },
    "Hoàn tiền": { icon: RefreshCw, color: "from-blue-500 to-cyan-500" }
};