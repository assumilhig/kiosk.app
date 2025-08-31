import { ScreenProps } from '@/types/kioks';
import { FC } from 'react';

const DiscountScreen: FC<ScreenProps> = ({ onNext, onStartOver, onBack }) => (
    <>
        <h1>Discount Screen</h1>
        <div className="mt-6 flex items-center justify-evenly">
            <button onClick={onStartOver}>Start Over</button>
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
        </div>
    </>
);

export default DiscountScreen;
