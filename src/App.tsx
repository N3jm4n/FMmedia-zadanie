import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CheckoutProvider } from './context/CheckoutContext';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RecipientPage from './pages/RecipientPage';
import InvoicePage from './pages/InvoicePage';
import ParcelLockerPage from './pages/ParcelLockerPage';
import SuccessPage from './pages/SuccessPage';

/**
 * Główny komponent aplikacji.
 * Mobile-frame opakowuje wszystkie strony w ramkę 430px (symulacja telefonu).
 * CheckoutProvider zapewnia globalny stan checkoutu.
 */
export default function App() {
  return (
    <BrowserRouter>
      <CheckoutProvider>
        <div className="mobile-frame">
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/recipient" element={<RecipientPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/parcel-locker" element={<ParcelLockerPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
      </CheckoutProvider>
    </BrowserRouter>
  );
}
