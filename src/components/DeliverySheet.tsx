import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { deliveryOptions } from '../data/products';
import { formatPrice } from '../utils/format';

interface DeliverySheetProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Bottom sheet z opcjami dostawy — ★ jeden z 3 kluczowych ekranów.
 * Wierny z makiety "Wybierz dostawę.png".
 * 
 * Po wybraniu "Odbiór w punkcie" (Paczkomat) → nawiguje do ekranu wyboru paczkomatu.
 * Inne opcje zapisują wybór i zamykają sheet.
 */
export default function DeliverySheet({ open, onClose }: DeliverySheetProps) {
  const navigate = useNavigate();
  const { delivery, dispatch } = useCheckout();

  const handleSelect = (option: typeof deliveryOptions[number]) => {
    dispatch({ type: 'SET_DELIVERY_METHOD', payload: option });

    if (option.id === 'paczkomat') {
      // Zamknij sheet i nawiguj do listy paczkomatów
      onClose();
      navigate('/parcel-locker');
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`bottom-sheet-overlay ${open ? 'bottom-sheet-overlay--open' : ''}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div className={`bottom-sheet ${open ? 'bottom-sheet--open' : ''}`}>
        <div className="bottom-sheet__handle" />
        <div className="bottom-sheet__content">
          <h2 className="bottom-sheet__title">Wybierz dostawę</h2>

          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={`delivery-option ${delivery.method?.id === option.id ? 'delivery-option--selected' : ''}`}
              onClick={() => handleSelect(option)}
              id={`delivery-${option.id}`}
            >
              <div className="delivery-option__info">
                <div className="delivery-option__name">{option.name}</div>
                {option.subtitle && (
                  <div className="delivery-option__sub">{option.subtitle}</div>
                )}
                <div className="delivery-option__price">
                  {option.price === 0 ? '0,00 zł' : formatPrice(option.price)}
                </div>
              </div>
              <div className="delivery-option__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
