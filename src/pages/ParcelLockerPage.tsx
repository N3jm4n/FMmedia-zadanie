import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { parcelLockers } from '../data/parcelLockers';
import { formatDistance } from '../utils/format';

/**
 * Ekran wyboru Paczkomatu — ★ jeden z 3 kluczowych ekranów.
 * Wierny z makiety "Checkout. Dostawa. Paczkomat. Lista zwinięta.png".
 *
 * Decyzja UX: Lista posortowana po odległości z wyszukiwarką na górze.
 * - Lista jest lepsza od mapy na mobile, bo nie wymaga integracji z mapami
 *   i jest szybsza w obsłudze (skan wzrokiem).
 * - Wyszukiwarka pozwala szybko filtrować po mieście lub ulicy.
 * - Odległość wyświetlona po prawej pomaga w szybkiej decyzji.
 */
export default function ParcelLockerPage() {
  const navigate = useNavigate();
  const { delivery, dispatch } = useCheckout();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return parcelLockers;
    const q = searchQuery.toLowerCase();
    return parcelLockers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.street.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.postalCode.includes(q)
    );
  }, [searchQuery]);

  const handleSelect = (locker: typeof parcelLockers[number]) => {
    dispatch({ type: 'SET_PARCEL_LOCKER', payload: locker });
    navigate('/checkout');
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <button className="header__action" onClick={() => navigate('/checkout')} aria-label="Wstecz">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="header__title">Wybierz paczkomat</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--color-primary)', margin: '0 var(--space-lg)' }} />

      <div className="page__content" style={{ paddingTop: 'var(--space-lg)' }}>
        {/* Search */}
        <div className="search-input">
          <div className="search-input__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Szukaj po mieście lub ulicy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="search-paczkomat"
          />
        </div>

        {/* Parcel locker list */}
        <div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--color-text-tertiary)' }}>
              Nie znaleziono paczkomatów dla „{searchQuery}"
            </div>
          )}

          {filtered.map((locker, index) => (
            <div
              key={locker.id}
              className={`radio-card ${delivery.parcelLocker?.id === locker.id ? 'radio-card--selected' : ''}`}
              onClick={() => handleSelect(locker)}
              id={`locker-${locker.id}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Radio circle */}
              <div className="radio-card__radio">
                <div className="radio-card__radio-dot" />
              </div>

              {/* Content */}
              <div className="radio-card__content">
                <div className="radio-card__title">{locker.name}</div>
                <div className="radio-card__subtitle">{locker.street}</div>
                <div className="radio-card__description">
                  {locker.postalCode} {locker.city}
                </div>
                {locker.description && (
                  <div className="radio-card__description">{locker.description}</div>
                )}
              </div>

              {/* Distance */}
              <div className="radio-card__meta">
                <span className="radio-card__distance">{formatDistance(locker.distance)}</span>
                <span className="radio-card__arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
