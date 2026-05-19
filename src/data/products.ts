import type { Product, DeliveryOption, PaymentOption } from './types';

/**
 * Mockowane produkty w koszyku — zgodne z makietami FMedia.
 */
export const cartProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Blender kielichowy ZEEGMA Vitamine Go Plus Srebrny Bezprzewodowy',
    price: 362.0,
    oldPrice: null,
    quantity: 1,
    image: '/images/zeegma-blender.png',
  },
  {
    id: 'prod-2',
    name: 'Blender kielichowy KITCHENAID 5KSB1330EER',
    price: 1100.0,
    oldPrice: 1299.0,
    quantity: 1,
    image: '/images/kitchenaid-blender.png',
  },
];

/**
 * Opcje dostawy dostępne w checkoucie.
 */
export const deliveryOptions: DeliveryOption[] = [
  { id: 'store-pickup', name: 'Odbiór w sklepie', subtitle: null, price: 0.0 },
  { id: 'paczkomat', name: 'Odbiór w punkcie', subtitle: 'Paczkomaty InPost 24/7', price: 9.99 },
  { id: 'courier', name: 'Wysyłka kurierem', subtitle: null, price: 12.99 },
  { id: 'courier-cod', name: 'Kurier za pobraniem', subtitle: null, price: 19.99 },
];

/**
 * Opcje płatności (mockowane, bez prawdziwej integracji).
 */
export const paymentOptions: PaymentOption[] = [
  { id: 'blik', name: 'BLIK', icon: '📱' },
  { id: 'card', name: 'Karta płatnicza', icon: '💳' },
  { id: 'transfer', name: 'Przelew tradycyjny', icon: '🏦' },
  { id: 'online', name: 'Szybka płatność online', icon: '⚡' },
  { id: 'cod', name: 'Płatność za pobraniem', icon: '💵' },
];
