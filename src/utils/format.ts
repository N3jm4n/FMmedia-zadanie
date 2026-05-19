/**
 * Narzędzia formatowania — ceny, adresy.
 */

/**
 * Formatuje cenę w PLN (polskim formacie).
 * Np. 1462 → "1 462,00 zł"
 */
export function formatPrice(value: number): string {
  return value
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + ' zł';
}

/**
 * Formatuje adres do jednolinijkowego wyświetlenia.
 * Np. "Łukasz Nowak, Jaktorowska 5 m. 3..."
 */
export function formatAddressShort(addr: {
  firstName: string;
  lastName: string;
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
}): string {
  const apt = addr.apartmentNumber ? ` m. ${addr.apartmentNumber}` : '';
  return `${addr.firstName} ${addr.lastName}, ${addr.street} ${addr.buildingNumber}${apt}`;
}

/**
 * Formatuje odległość do czytelnej formy.
 * < 1 km → "200 m", >= 1 km → "2,3 km"
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1).replace('.', ',')} km`;
}
