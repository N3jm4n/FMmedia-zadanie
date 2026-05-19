import { useCheckout } from '../context/CheckoutContext';
import { paymentOptions } from '../data/products';
import type { PaymentOption } from '../data/types';

interface PaymentSheetProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Bottom sheet z opcjami płatności.
 * Mockowane — kliknięcie wybiera metodę i zamyka sheet.
 */
export default function PaymentSheet({ open, onClose }: PaymentSheetProps) {
  const { payment, dispatch } = useCheckout();

  const handleSelect = (option: PaymentOption) => {
    dispatch({ type: 'SET_PAYMENT', payload: option });
    onClose();
  };

  return (
    <>
      <div
        className={`bottom-sheet-overlay ${open ? 'bottom-sheet-overlay--open' : ''}`}
        onClick={onClose}
      />

      <div className={`bottom-sheet ${open ? 'bottom-sheet--open' : ''}`}>
        <div className="bottom-sheet__handle" />
        <div className="bottom-sheet__content">
          <h2 className="bottom-sheet__title">Wybierz płatność</h2>

          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`payment-option ${payment?.id === option.id ? 'payment-option--selected' : ''}`}
              onClick={() => handleSelect(option)}
              id={`payment-${option.id}`}
            >
              <span className="payment-option__icon">{option.icon}</span>
              <span className="payment-option__name">{option.name}</span>
              {payment?.id === option.id && (
                <span className="payment-option__check">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
