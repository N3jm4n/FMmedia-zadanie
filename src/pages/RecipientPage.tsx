import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import type { Address } from '../data/types';

function validateAddress(addr: Address): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!addr.firstName.trim()) errors.firstName = 'Imię jest wymagane';
  if (!addr.lastName.trim()) errors.lastName = 'Nazwisko jest wymagane';
  if (!addr.street.trim()) errors.street = 'Ulica jest wymagana';
  if (!addr.buildingNumber.trim()) errors.buildingNumber = 'Numer budynku jest wymagany';
  if (!addr.city.trim()) errors.city = 'Miasto jest wymagane';

  if (!addr.postalCode.trim()) {
    errors.postalCode = 'Kod pocztowy jest wymagany';
  } else if (!/^\d{2}-\d{3}$/.test(addr.postalCode)) {
    errors.postalCode = 'Nieprawidłowy format (XX-XXX)';
  }

  if (!addr.phone.trim()) {
    errors.phone = 'Numer telefonu jest wymagany';
  } else {
    const digits = addr.phone.replace(/[\s-+]/g, '');
    if (!/^\d+$/.test(digits)) {
      errors.phone = 'Numer telefonu może zawierać tylko cyfry, spacje, "+" i "-"';
    } else if (digits.length < 9 || digits.length > 15) {
      errors.phone = 'Numer telefonu musi mieć od 9 do 15 cyfr';
    }
  }

  return errors;
}

export default function RecipientPage() {
  const navigate = useNavigate();
  const { recipient, dispatch } = useCheckout();
  const [form, setForm] = useState<Address>({ ...recipient });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  const handleChange = (field: keyof Address, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched) {
      // Re-waliduj na bieżąco po pierwszym submit
      const newErrors = validateAddress({ ...form, [field]: value });
      setErrors(newErrors);
    }
  };

  const handleSave = () => {
    setTouched(true);
    const validationErrors = validateAddress(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch({ type: 'SET_RECIPIENT', payload: form });
      navigate('/checkout');
    }
  };

  const fields: { key: keyof Address; label: string; placeholder: string; half?: boolean }[] = [
    { key: 'firstName', label: 'Imię', placeholder: 'np. Jan' },
    { key: 'lastName', label: 'Nazwisko', placeholder: 'np. Kowalski' },
    { key: 'street', label: 'Ulica', placeholder: 'np. Marszałkowska' },
    { key: 'buildingNumber', label: 'Nr budynku', placeholder: 'np. 10', half: true },
    { key: 'apartmentNumber', label: 'Nr mieszkania', placeholder: 'np. 5 (opcjonalnie)', half: true },
    { key: 'postalCode', label: 'Kod pocztowy', placeholder: 'XX-XXX', half: true },
    { key: 'city', label: 'Miasto', placeholder: 'np. Warszawa', half: true },
    { key: 'phone', label: 'Numer telefonu', placeholder: '+48 600 000 000' },
  ];

  return (
    <div className="page">
      <div className="header">
        <button className="header__action" onClick={() => navigate('/checkout')} aria-label="Wstecz">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="header__title">Dane odbiorcy</span>
      </div>

      <div className="page__content" style={{ paddingTop: 'var(--space-lg)' }}>
        {renderFields(fields, form, errors, handleChange)}
      </div>

      <div className="page__footer">
        <button className="btn btn--primary" onClick={handleSave} id="save-recipient">
          Zapisz
        </button>
      </div>
    </div>
  );
}


function renderFields(
  fields: { key: keyof Address; label: string; placeholder: string; half?: boolean }[],
  form: Address,
  errors: Record<string, string>,
  onChange: (key: keyof Address, value: string) => void
) {
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < fields.length) {
    const field = fields[i];
    const nextField = fields[i + 1];

    if (field.half && nextField?.half) {
      // Render pair in a row
      elements.push(
        <div className="form-row" key={field.key}>
          {renderField(field, form, errors, onChange)}
          {renderField(nextField, form, errors, onChange)}
        </div>
      );
      i += 2;
    } else {
      elements.push(renderField(field, form, errors, onChange));
      i += 1;
    }
  }

  return elements;
}

function renderField(
  field: { key: keyof Address; label: string; placeholder: string },
  form: Address,
  errors: Record<string, string>,
  onChange: (key: keyof Address, value: string) => void
) {
  return (
    <div className="form-group" key={field.key}>
      <label className="form-label" htmlFor={`field-${field.key}`}>
        {field.label}
      </label>
      <input
        id={`field-${field.key}`}
        className={`form-input ${errors[field.key] ? 'form-input--error' : ''}`}
        type="text"
        value={form[field.key]}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.key, e.target.value)}
      />
      {errors[field.key] && <div className="form-error">{errors[field.key]}</div>}
    </div>
  );
}
