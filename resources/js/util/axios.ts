import { getCSRFToken } from '@/util/storage';
import axios from 'axios';

// Create axios instance with defaults
export const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCSRFToken() || '',
    },
    withCredentials: true, // in case Laravel session/cookies are used
});

export const parseAxiosError = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        if (err.response) {
            return err.response.data?.message || `Error ${err.response.status}`;
        }
        if (err.request) {
            return 'No response from server. Please try again later.';
        }
    }
    return (err as Error)?.message || 'Unexpected error occurred.';
};
