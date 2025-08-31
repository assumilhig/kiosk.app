import { Cart as CartItem, Item } from '@/types/kioks';

export enum CartActionType {
    INCREASE = 'INCREASE',
    DECREASE = 'DECREASE',
    CLEAR = 'CLEAR',
}

export type CartAction =
    | { type: CartActionType.INCREASE; payload: Item }
    | { type: CartActionType.DECREASE; payload: Item }
    | { type: CartActionType.CLEAR };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case CartActionType.INCREASE: {
            const item = action.payload;
            const existing = state.find((ci) => ci.id === item.id);

            if (!existing) {
                return [...state, { ...item, quantity: 1, total: item.price }];
            }

            return state.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + 1, total: (ci.quantity + 1) * ci.price } : ci));
        }

        case CartActionType.DECREASE: {
            const item = action.payload;
            const existing = state.find((ci) => ci.id === item.id);
            if (!existing) return state;

            const newQty = existing.quantity - 1;
            if (newQty <= 0) {
                return state.filter((ci) => ci.id !== item.id);
            }

            return state.map((ci) => (ci.id === item.id ? { ...ci, quantity: newQty, total: newQty * ci.price } : ci));
        }

        case CartActionType.CLEAR:
            return [];

        default:
            return state;
    }
};

export default cartReducer;
