import { screens } from '@/hooks/useScreens';
import { FC } from 'react';

type Screen = (typeof screens)[number];
type CartNavScreens = Extract<Screen, 'category' | 'discount' | 'payment'>;

type CartScreenProps = {
    goTo: (screen: CartNavScreens) => void;
    onStartOver: () => void;
};

const CartScreen: FC<CartScreenProps> = ({ goTo, onStartOver }) => (
    <>
        <h1>Cart Screen</h1>
        <div className="mt-6 flex items-center justify-evenly">
            <button onClick={onStartOver}>Start Over</button>
            <button onClick={() => goTo('category')}>Back to Category</button>
            <button
                onClick={() => {
                    const hasDiscount = window.confirm('Has discount?');
                    goTo(hasDiscount ? 'discount' : 'payment');
                }}
            >
                Next
            </button>
        </div>
    </>
);

export default CartScreen;
