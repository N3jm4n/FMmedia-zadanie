import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice, formatAddressShort } from '../utils/format';
import DeliverySheet from '../components/DeliverySheet';
import PaymentSheet from '../components/PaymentSheet';


export default function CheckoutPage() {
  const navigate = useNavigate();
  const { recipient, invoice, delivery, payment, orderTotal, cartCount } = useCheckout();
  const [showDelivery, setShowDelivery] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const invoiceAddr = invoice.sameAsRecipient ? recipient : invoice;

  // Walidacja — czy można złożyć zamówienie
  const canSubmit = delivery.method !== null && payment !== null
    && (delivery.method.id !== 'paczkomat' || delivery.parcelLocker !== null);

  const handleSubmit = () => {
    if (!canSubmit) return;
    navigate('/success');
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <button className="header__action" onClick={() => navigate('/')} aria-label="Zamknij">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="page__content">
        <h1 className="section-title">Twoje zamówienie</h1>
        <p className="section-subtitle">Liczba produktów: {cartCount}</p>

        <div className="divider" style={{ marginTop: 'var(--space-xl)' }} />

        {/* Dane odbiorcy */}
        <div className="checkout-row" onClick={() => navigate('/recipient')} id="row-recipient">
          <div className="checkout-row__info">
            <div className="checkout-row__label">Dane odbiorcy</div>
            <div className="checkout-row__value">{formatAddressShort(recipient)}</div>
          </div>
          <div className="checkout-row__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Dane do faktury */}
        <div className="checkout-row" onClick={() => navigate('/invoice')} id="row-invoice">
          <div className="checkout-row__info">
            <div className="checkout-row__label">Dane do faktury</div>
            <div className="checkout-row__value">{formatAddressShort(invoiceAddr)}</div>
          </div>
          <div className="checkout-row__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        <div className="divider" />

        {/* Dostawa */}
        <div className="checkout-row" id="row-delivery">
          <div className="checkout-row__info">
            <span style={{ fontWeight: 600, fontSize: '1rem' }}>Dostawa</span>
            {delivery.method && (
              <div className="checkout-row__value" style={{ marginTop: 4, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                {delivery.method.name}
                {delivery.parcelLocker && ` — ${delivery.parcelLocker.name}`}
              </div>
            )}
          </div>
          <button
            className="btn btn--outline btn--sm"
            onClick={() => setShowDelivery(true)}
          >
            {delivery.method ? 'Zmień' : 'Wybierz dostawę'}
          </button>
        </div>

        {/* Płatność */}
        <div className="checkout-row" id="row-payment">
          <div className="checkout-row__info">
            <span style={{ fontWeight: 600, fontSize: '1rem' }}>Płatność</span>
            {payment && (
              <div className="checkout-row__value" style={{ marginTop: 4, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                {payment.icon} {payment.name}
              </div>
            )}
          </div>
          <button
            className="btn btn--outline btn--sm"
            onClick={() => setShowPayment(true)}
          >
            {payment ? 'Zmień' : 'Wybierz płatność'}
          </button>
        </div>

        <div className="divider" />

        {/* Suma */}
        <div className="checkout-row" style={{ cursor: 'default' }} id="row-total">
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>Suma</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatPrice(orderTotal)}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="page__footer">
        <div className="legal-text" style={{ padding: 0, paddingBottom: 'var(--space-lg)' }}>
          Składając zamówienie akceptujesz{' '}
          <a href="#regulamin">regulamin sklepu</a> i{' '}
          <a href="#polityka">politykę ochrony prywatności</a>.
        </div>
        <button
          className="btn btn--primary"
          disabled={!canSubmit}
          onClick={handleSubmit}
          id="submit-order"
        >
          Złóż zamówienie • {formatPrice(orderTotal)}
        </button>
      </div>

      {/* Bottom Sheets */}
      <DeliverySheet
        open={showDelivery}
        onClose={() => setShowDelivery(false)}
      />
      <PaymentSheet
        open={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </div>
  );
}
