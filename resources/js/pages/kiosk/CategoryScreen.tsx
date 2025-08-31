import { ScreenProps } from '@/types/kioks';
import { FC } from 'react';

const CategoryScreen: FC<ScreenProps> = ({ onStartOver, onBack }) => (
    <>
        <h1>Category Screen</h1>
        <div className="mt-6 flex items-center justify-evenly">
            <button onClick={onStartOver}>Start Over</button>
            <button onClick={onBack}>Back to Cart</button>
        </div>
    </>
);

export default CategoryScreen;
