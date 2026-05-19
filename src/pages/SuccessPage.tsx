import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice, formatAddressShort } from '../utils/format';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { recipient, delivery, payment, cart, orderTotal, deliveryPrice, dispatch } = useCheckout();

  const handleNewOrder = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <div className="page">
      <div className="success-screen">
        {/* Success animation */}
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="success-title">Zamówienie złożone!</h1>
        <p className="success-subtitle">
          Twoje zamówienie zostało przyjęte do realizacji. Potwierdzenie wysłaliśmy na e-mail.
        </p>

        {/* Order summary */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <div className="confirm-section">
            <div className="confirm-section__label">Produkty</div>
            {cart.map((item) => (
              <div key={item.id} className="confirm-section__value">
                {item.name} — {formatPrice(item.price)}
              </div>
            ))}
          </div>

          <div className="confirm-section">
            <div className="confirm-section__label">Adres dostawy</div>
            <div className="confirm-section__value">
              {formatAddressShort(recipient)}<br />
              {recipient.postalCode} {recipient.city}
            </div>
          </div>

          <div className="confirm-section">
            <div className="confirm-section__label">Dostawa</div>
            <div className="confirm-section__value">
              {delivery.method?.name ?? '—'}
              {delivery.parcelLocker && (
                <>
                  <br />
                  <span className="confirm-section__value--highlight">
                    {delivery.parcelLocker.name}
                  </span>
                  <br />
                  {delivery.parcelLocker.street}, {delivery.parcelLocker.postalCode} {delivery.parcelLocker.city}
                </>
              )}
              <br />
              Koszt: {formatPrice(deliveryPrice)}
            </div>
          </div>

          <div className="confirm-section">
            <div className="confirm-section__label">Płatność</div>
            <div className="confirm-section__value">
              {payment?.icon} {payment?.name ?? '—'}
            </div>
          </div>

          <div className="confirm-section">
            <div className="confirm-section__label">Razem</div>
            <div className="confirm-section__value confirm-section__value--highlight" style={{ fontSize: '1.25rem' }}>
              {formatPrice(orderTotal)}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', marginTop: 'var(--space-2xl)' }}>
          <button className="btn btn--primary" onClick={handleNewOrder} id="new-order">
            Wróć do sklepu
          </button>
        </div>
      </div>
    </div>
  );
}
