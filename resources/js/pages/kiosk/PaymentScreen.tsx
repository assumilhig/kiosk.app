import { ScreenProps } from '@/types/kioks';
import { FC } from 'react';

const PaymentScreen: FC<ScreenProps> = ({ onNext, onStartOver, onBack }) => (
    <>
        <h1>Payment Screen</h1>
        <div className="mt-6 flex items-center justify-evenly">
            <button onClick={onStartOver}>Start Over</button>
            <button onClick={onBack}>Back</button>
        </div>
    </>
);

export default PaymentScreen;
