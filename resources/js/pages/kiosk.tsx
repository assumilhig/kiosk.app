import { screens, useScreens } from '@/hooks/useScreens';
import { CartScreen, CategoryScreen, DiscountScreen, MainScreen, MenuScreen, PaymentScreen } from './kiosk/index';

export default function Kiosk() {
    const { renderScreen, goTo, startOver } = useScreens(screens, {
        main: () => <MainScreen onNext={() => goTo('menu')} onStartOver={startOver} />,
        menu: () => <MenuScreen onNext={() => goTo('cart')} onStartOver={startOver} onBack={() => goTo('main')} />,
        category: () => <CategoryScreen onNext={() => goTo('cart')} onStartOver={startOver} onBack={() => goTo('cart')} />,
        cart: () => <CartScreen goTo={goTo} onStartOver={startOver} />,
        discount: () => <DiscountScreen onNext={() => goTo('payment')} onStartOver={startOver} onBack={() => goTo('cart')} />,
        payment: () => <PaymentScreen onBack={() => goTo('cart')} onStartOver={startOver} />,
    });

    return <main className="container mx-auto max-w-4xl">{renderScreen()}</main>;
}
