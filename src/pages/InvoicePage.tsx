import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import type { Address } from '../data/types';


export default function InvoicePage() {
  const navigate = useNavigate();
  const { invoice, dispatch } = useCheckout();
  const [sameAsRecipient, setSameAsRecipient] = useState(invoice.sameAsRecipient);
  const [form, setForm] = useState<Address>({
    firstName: invoice.firstName,
    lastName: invoice.lastName,
    street: invoice.street,
    buildingNumber: invoice.buildingNumber,
    apartmentNumber: invoice.apartmentNumber,
    postalCode: invoice.postalCode,
    city: invoice.city,
    phone: invoice.phone,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Address, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (sameAsRecipient) {
      dispatch({ type: 'SET_INVOICE', payload: { sameAsRecipient: true } });
      navigate('/checkout');
      return;
    }

    // Walidacja
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'Wymagane';
    if (!form.lastName.trim()) errs.lastName = 'Wymagane';
    if (!form.street.trim()) errs.street = 'Wymagane';
    if (!form.buildingNumber.trim()) errs.buildingNumber = 'Wymagane';
    if (!form.city.trim()) errs.city = 'Wymagane';
    if (!/^\d{2}-\d{3}$/.test(form.postalCode)) errs.postalCode = 'Format: XX-XXX';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    dispatch({
      type: 'SET_INVOICE',
      payload: { ...form, sameAsRecipient: false },
    });
    navigate('/checkout');
  };

  const fields: { key: keyof Address; label: string; placeholder: string; half?: boolean }[] = [
    { key: 'firstName', label: 'Imię', placeholder: 'np. Jan' },
    { key: 'lastName', label: 'Nazwisko', placeholder: 'np. Kowalski' },
    { key: 'street', label: 'Ulica', placeholder: 'np. Marszałkowska' },
    { key: 'buildingNumber', label: 'Nr budynku', placeholder: '10', half: true },
    { key: 'apartmentNumber', label: 'Nr mieszkania', placeholder: 'opcjonalnie', half: true },
    { key: 'postalCode', label: 'Kod pocztowy', placeholder: 'XX-XXX', half: true },
    { key: 'city', label: 'Miasto', placeholder: 'Warszawa', half: true },
  ];

  return (
    <div className="page">
      <div className="header">
        <button className="header__action" onClick={() => navigate('/checkout')} aria-label="Wstecz">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="header__title">Dane do faktury</span>
      </div>

      <div className="page__content" style={{ paddingTop: 'var(--space-lg)' }}>
        {/* Toggle */}
        <div
          className={`toggle ${sameAsRecipient ? 'toggle--active' : ''}`}
          onClick={() => setSameAsRecipient(!sameAsRecipient)}
          id="toggle-same-address"
        >
          <div className="toggle__track">
            <div className="toggle__thumb" />
          </div>
          <span className="toggle__label">Taki sam jak adres dostawy</span>
        </div>

        {/* Formularz — widoczny tylko gdy toggle wyłączony */}
        {!sameAsRecipient && (
          <div className="animate-slide-up" style={{ marginTop: 'var(--space-lg)' }}>
            {renderInvoiceFields(fields, form, errors, handleChange)}
          </div>
        )}
      </div>

      <div className="page__footer">
        <button className="btn btn--primary" onClick={handleSave} id="save-invoice">
          Zapisz
        </button>
      </div>
    </div>
  );
}

function renderInvoiceFields(
  fields: { key: keyof Address; label: string; placeholder: string; half?: boolean }[],
  form: Address,
  errors: Record<string, string>,
  onChange: (key: keyof Address, value: string) => void
) {
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < fields.length) {
    const field = fields[i];
    const next = fields[i + 1];

    if (field.half && next?.half) {
      elements.push(
        <div className="form-row" key={field.key}>
          <div className="form-group">
            <label className="form-label">{field.label}</label>
            <input
              className={`form-input ${errors[field.key] ? 'form-input--error' : ''}`}
              value={form[field.key]}
              placeholder={field.placeholder}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
            {errors[field.key] && <div className="form-error">{errors[field.key]}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">{next.label}</label>
            <input
              className={`form-input ${errors[next.key] ? 'form-input--error' : ''}`}
              value={form[next.key]}
              placeholder={next.placeholder}
              onChange={(e) => onChange(next.key, e.target.value)}
            />
            {errors[next.key] && <div className="form-error">{errors[next.key]}</div>}
          </div>
        </div>
      );
      i += 2;
    } else {
      elements.push(
        <div className="form-group" key={field.key}>
          <label className="form-label">{field.label}</label>
          <input
            className={`form-input ${errors[field.key] ? 'form-input--error' : ''}`}
            value={form[field.key]}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
          {errors[field.key] && <div className="form-error">{errors[field.key]}</div>}
        </div>
      );
      i += 1;
    }
  }
  return elements;
}
