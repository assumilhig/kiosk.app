import { Cart, Totals } from '@/types/kioks';

// --- Kiosk Screen Index ---

const KIOSK_SCREEN_INDEX = 'kiosk_screen_index';

export const getScreenIndex = (): number => {
    const value = localStorage.getItem(KIOSK_SCREEN_INDEX);
    return value ? parseInt(value, 10) : 0;
};

export const setScreenIndex = (index: number): void => {
    localStorage.setItem(KIOSK_SCREEN_INDEX, index.toString());
};

export const clearScreenIndex = (): void => {
    localStorage.removeItem(KIOSK_SCREEN_INDEX);
};

// --- Reference Number ---

const REFERENCE_NO = 'reference_no';

export const getReferenceNo = (): string => {
    return localStorage.getItem(REFERENCE_NO) || '';
};

export const setReferenceNo = (reference_no: string): void => {
    localStorage.setItem(REFERENCE_NO, reference_no);
};

export const clearReferenceNo = (): void => {
    localStorage.removeItem(REFERENCE_NO);
};

// --- Cart ---

const CART_KEY = 'cart';

export const getCart = (): Cart[] => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as Cart[]) : [];
};

export const setCart = (cart: Cart[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = (): void => {
    localStorage.removeItem(CART_KEY);
};

const SYNCED_CART_KEY = 'kiosk_cart_synced'; // last successfully posted cart

// 🔽 NEW: snapshot helpers
export const getSyncedCart = (): Cart[] => {
    try {
        const s = localStorage.getItem(SYNCED_CART_KEY);
        return s ? (JSON.parse(s) as Cart[]) : [];
    } catch {
        return [];
    }
};

export const setSyncedCart = (cart: Cart[]): void => {
    localStorage.setItem(SYNCED_CART_KEY, JSON.stringify(cart));
};

// --- Totals ---

const TOTAL_KEY = 'totals';

export const getTotals = (): Cart[] => {
    const stored = localStorage.getItem(TOTAL_KEY);
    return stored ? (JSON.parse(stored) as Cart[]) : [];
};

export const setTotals = (totals: Totals): void => {
    localStorage.setItem(TOTAL_KEY, JSON.stringify(totals));
};

export const clearTotals = (): void => {
    localStorage.removeItem(TOTAL_KEY);
};

// --- CSRF Token ---

export const getCSRFToken = (): string | null => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token === undefined ? null : token;
};
