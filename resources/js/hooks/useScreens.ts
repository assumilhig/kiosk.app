import { clearScreenIndex, getScreenIndex, setScreenIndex } from '@/util/storage';
import { ReactNode, useEffect, useState } from 'react';

export const screens = ['main', 'menu', 'category', 'cart', 'discount', 'payment'] as const;
export type Screen = (typeof screens)[number];

export function useScreens<const T extends readonly string[]>(screens: T, screenMap: { [K in T[number]]: () => ReactNode }) {
    type Screen = T[number];

    const [current, setCurrent] = useState<Screen>(screens[getScreenIndex()] ?? screens[0]);

    useEffect(() => {
        const idx = screens.indexOf(current);
        if (idx >= 0) setScreenIndex(idx);
    }, [current, screens]);

    const goTo = (screen: Screen) => setCurrent(screen);

    const startOver = () => {
        setCurrent(screens[0]);
        clearScreenIndex();
    };

    const renderScreen = () => screenMap[current]();

    return { current, goTo, startOver, renderScreen };
}
