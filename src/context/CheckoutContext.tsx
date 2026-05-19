/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { cartProducts } from '../data/products';
import type { CheckoutState, CheckoutAction } from '../data/types';

/**
 * Globalny stan checkoutu — useContext + useReducer.
 *
 * useReducer zamiast wielu useState:
 * - Lepsze zarządzanie złożonym stanem z wieloma powiązanymi polami
 * - Jeden dispatch zamiast wielu setterów
 * - Stan zachowany przy nawigacji między krokami
 */

const initialState: CheckoutState = {
  cart: cartProducts,

  recipient: {
    firstName: 'Łukasz',
    lastName: 'Nowak',
    street: 'Jaktorowska',
    buildingNumber: '5',
    apartmentNumber: '3',
    postalCode: '01-202',
    city: 'Warszawa',
    phone: '+48 600 123 456',
  },

  invoice: {
    sameAsRecipient: true,
    firstName: '',
    lastName: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: '',
    postalCode: '',
    city: '',
    phone: '',
  },

  delivery: {
    method: null,
    parcelLocker: null,
  },

  payment: null,
};

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SET_RECIPIENT':
      return { ...state, recipient: { ...state.recipient, ...action.payload } };

    case 'SET_INVOICE':
      return { ...state, invoice: { ...state.invoice, ...action.payload } };

    case 'SET_DELIVERY_METHOD':
      return {
        ...state,
        delivery: {
          method: action.payload,
          // Resetuj paczkomat jeśli metoda nie jest "paczkomat"
          parcelLocker: action.payload.id === 'paczkomat' ? state.delivery.parcelLocker : null,
        },
      };

    case 'SET_PARCEL_LOCKER':
      return {
        ...state,
        delivery: { ...state.delivery, parcelLocker: action.payload },
      };

    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };

    case 'RESET':
      return { ...initialState, cart: cartProducts };

    default:
      return state;
  }
}

interface CheckoutContextValue extends CheckoutState {
  cartTotal: number;
  deliveryPrice: number;
  orderTotal: number;
  cartCount: number;
  dispatch: React.Dispatch<CheckoutAction>;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = state.delivery.method?.price ?? 0;
  const orderTotal = cartTotal + deliveryPrice;
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CheckoutContext.Provider value={{ ...state, cartTotal, deliveryPrice, orderTotal, cartCount, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}

