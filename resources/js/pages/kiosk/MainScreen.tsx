import { ApiResponse, ScreenProps } from '@/types/kioks';
import { parseAxiosError } from '@/util/axios';
import { clearCart, setReferenceNo } from '@/util/storage';
import axios from 'axios';
import { FC, useState } from 'react';

interface ReferenceNoData {
    reference_no: string;
}

type ReferenceNoResponse = ApiResponse<ReferenceNoData>;

const MainScreen: FC<ScreenProps> = ({ onNext }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReferenceNo = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<ReferenceNoResponse>(route('api.reference_no'));
            if (!res.data.success) throw new Error(res.data.message || 'Failed to generate reference number');
            const json = await res.data;
            console.log('Fetched reference number:', json);
            setReferenceNo(json.data.reference_no);
        } catch (err: any) {
            const msg = parseAxiosError(err);
            console.log('Error fetching reference number:', msg, err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        await clearCart();
        await fetchReferenceNo();
        onNext?.();
    };

    if (loading) return <p>Loading reference number...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <h1>Main Screen</h1>
            <button onClick={handleNext}>Enter</button>
        </>
    );
};

export default MainScreen;
