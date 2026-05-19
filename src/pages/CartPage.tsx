import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice } from '../utils/format';

/**
 * Ekran koszyka — punkt wejścia do flow checkoutu.
 * Wyświetla listę produktów z cenami i przycisk "Do kasy".
 * Wierny z makiety Koszyk.png.
 */
export default function CartPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount } = useCheckout();

  return (
    <div className="page">
      <div className="page__content">
        <div style={{ paddingTop: 'var(--space-xl)' }}>
          <h1 className="section-title">Koszyk</h1>
          <p className="section-subtitle" style={{ color: 'var(--color-primary)' }}>
            {cartCount} {cartCount === 1 ? 'produkt' : 'produkty'}
          </p>
        </div>

        <div className="divider" style={{ marginTop: 'var(--space-xl)' }} />

        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item animate-slide-up">
              <div className="cart-item__image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item__info">
                <div className="cart-item__name">{item.name}</div>
                <div className="cart-item__price">
                  <span className={`cart-item__price-current ${item.oldPrice ? 'cart-item__price-current--sale' : ''}`}>
                    {formatPrice(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="cart-item__price-old">{formatPrice(item.oldPrice)}</span>
                  )}
                </div>
                <div className="cart-item__qty">{item.quantity} sztuka ▾</div>
              </div>
              <div className="cart-item__actions">
                <button className="cart-item__more" aria-label="Więcej opcji">⋯</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page__footer">
        <button
          className="btn btn--primary"
          onClick={() => navigate('/checkout')}
          id="go-to-checkout"
        >
          Do kasy • {formatPrice(cartTotal)}
        </button>
      </div>
    </div>
  );
}
