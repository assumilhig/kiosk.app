import cartReducer, { CartActionType } from '@/reducers/cartReducer';
import { ApiResponse, Category, Totals } from '@/types/kioks';
import { api, parseAxiosError } from '@/util/axios';
import { getCart, getReferenceNo, getSyncedCart, setCart, setSyncedCart, setTotals } from '@/util/storage';
import { FC, useEffect, useReducer, useState } from 'react';

interface ScreenProps {
    onNext: () => void;
    onBack: () => void;
    onStartOver: () => void;
}

interface ResponseData {
    totals: Totals;
}

type Response = ApiResponse<ResponseData>;

const MenuScreen: FC<ScreenProps> = ({ onNext, onStartOver, onBack }) => {
    const [data, setData] = useState<Category[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [cart, dispatchCart] = useReducer(cartReducer, [], (initial) => {
        try {
            const stored = getCart();
            return stored ? stored : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        setCart(cart);
    }, [cart]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(route('api.items'));
                if (!res.ok) throw new Error(`Error ${res.status}`);
                const json = await res.json();
                if (isMounted) setData(json);
            } catch (err: any) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <p>Loading menu...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const current: Category = data[index];
    const cartsEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

    const handleBack = () => {
        if (!current.prev_id) {
            onBack();
            return;
        }
        const prevIndex = data.findIndex((c) => c.id === current.prev_id);
        prevIndex !== -1 ? setIndex(prevIndex) : onBack();
    };

    const handleNext = async () => {
        if (current.required) {
            const totalSelected = current.items.reduce((sum, item) => sum + getQuantity(item.id), 0);
            if (totalSelected === 0) {
                alert('This category requires at least one selection.');
                return;
            }
        }

        const lastSynced = getSyncedCart();
        const changed = !cartsEqual(cart, lastSynced);

        try {
            if (changed) {
                const payload = {
                    reference_no: getReferenceNo(),
                    cart,
                };
                const res = await api.post<Response>(route('api.add_to_cart'), payload);
                const result = res.data;
                if (!result.success) throw new Error(result.message || 'Failed to sync cart');

                setTotals(result.data.totals);
                setSyncedCart(cart);
            }
            if (!current.next_id) {
                onNext();
                return;
            }

            const nextIndex = data.findIndex((c) => c.id === current.next_id);
            nextIndex !== -1 ? setIndex(nextIndex) : onNext();
        } catch (err) {
            const msg = parseAxiosError(err);
            console.log('Failed to sync cart:', msg, err);
            setError(msg);
        }
    };

    const getQuantity = (itemId: number) => cart.find((ci) => ci.id === itemId)?.quantity || 0;

    return (
        <>
            <h1>Menu Screen</h1>
            <h3>{current.name}</h3>

            <div className="space-y-4">
                {current.items.map((item) => {
                    const qty = getQuantity(item.id);
                    return (
                        <div key={item.id} className="flex items-center justify-between rounded border p-2">
                            <div>
                                {item.description} - ${item.price.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => dispatchCart({ type: CartActionType.DECREASE, payload: item })}
                                    className="rounded bg-gray-200 px-2 py-1"
                                >
                                    -
                                </button>
                                <span>{qty}</span>
                                <button
                                    onClick={() => dispatchCart({ type: CartActionType.INCREASE, payload: item })}
                                    className="rounded bg-gray-200 px-2 py-1"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center justify-evenly">
                <button onClick={onStartOver}>Start Over</button>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </>
    );
};

export default MenuScreen;
