/**
 * Typy dla danych w aplikacji FMedia Checkout.
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number | null;
  quantity: number;
  image: string;
}

export interface DeliveryOption {
  id: 'store-pickup' | 'paczkomat' | 'courier' | 'courier-cod';
  name: string;
  subtitle: string | null;
  price: number;
}

export interface PaymentOption {
  id: string;
  name: string;
  icon: string;
}

export interface ParcelLocker {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  distance: number;
  description: string | null;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  phone: string;
}

export interface InvoiceData extends Address {
  sameAsRecipient: boolean;
}

export interface DeliveryState {
  method: DeliveryOption | null;
  parcelLocker: ParcelLocker | null;
}

export interface CheckoutState {
  cart: Product[];
  recipient: Address;
  invoice: InvoiceData;
  delivery: DeliveryState;
  payment: PaymentOption | null;
}

export type CheckoutAction =
  | { type: 'SET_RECIPIENT'; payload: Partial<Address> }
  | { type: 'SET_INVOICE'; payload: Partial<InvoiceData> }
  | { type: 'SET_DELIVERY_METHOD'; payload: DeliveryOption }
  | { type: 'SET_PARCEL_LOCKER'; payload: ParcelLocker }
  | { type: 'SET_PAYMENT'; payload: PaymentOption }
  | { type: 'RESET' };
