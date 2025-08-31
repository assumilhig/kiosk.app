export interface ScreenProps {
    onNext?: () => void;
    onBack?: () => void;
    onStartOver?: () => void;
}

export interface Category {
    id: number;
    name: string;
    inactive: boolean;
    order_no: number;
    prev_id: number | null;
    next_id: number | null;
    required: boolean;
    items: Item[];
    descriptions: Name[];
    notes: Name[];
}

export interface Name {
    name?: string;
}

export interface Item {
    id: number;
    itemcode: string;
    description: string;
    extended_description: string;
    department_id: number;
    category_id: number;
    subcategory_id: number;
    message_id: number;
    price: number;
    item_status: string;
    discountable: boolean;
    inactive: boolean;
    order_no: number;
}

export interface Cart extends Item {
    quantity: number;
    total: number;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message: string;
}
export interface Totals {
    total: number;
    subtotal: number;
    discount: number;
    service_charge: number;
}
