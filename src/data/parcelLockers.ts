import type { ParcelLocker } from './types';

/**
 * Mockowane dane paczkomatów InPost.
 * 10 lokalizacji z unikalnymi ID, adresami i odległością od użytkownika.
 * Posortowane domyślnie po odległości (rosnąco).
 */
export const parcelLockers: ParcelLocker[] = [
  {
    id: 'WAW012',
    name: 'Paczkomat WAW012',
    street: 'ul. Biblioteczna 10',
    city: 'Warszawa',
    postalCode: '00-123',
    distance: 0.2,
    description: null,
  },
  {
    id: 'WAW045',
    name: 'Paczkomat WAW045',
    street: 'Al. Jana Pawła II 82',
    city: 'Warszawa',
    postalCode: '00-175',
    distance: 0.6,
    description: 'Przy stacji BP',
  },
  {
    id: 'WAW078',
    name: 'Paczkomat WAW078',
    street: 'ul. Marszałkowska 34',
    city: 'Warszawa',
    postalCode: '00-576',
    distance: 1.0,
    description: null,
  },
  {
    id: 'WAW091',
    name: 'Paczkomat WAW091',
    street: 'ul. Targowa 15',
    city: 'Warszawa',
    postalCode: '03-728',
    distance: 2.3,
    description: 'Przy Biedronce',
  },
  {
    id: 'WAW134',
    name: 'Paczkomat WAW134',
    street: 'ul. Puławska 112',
    city: 'Warszawa',
    postalCode: '02-620',
    distance: 4.5,
    description: null,
  },
  {
    id: 'WAW167',
    name: 'Paczkomat WAW167',
    street: 'ul. Grochowska 207',
    city: 'Warszawa',
    postalCode: '04-077',
    distance: 5.1,
    description: 'Obok Żabki',
  },
  {
    id: 'WAW189',
    name: 'Paczkomat WAW189',
    street: 'ul. Wołoska 3',
    city: 'Warszawa',
    postalCode: '02-675',
    distance: 6.8,
    description: 'Galeria Mokotów',
  },
  {
    id: 'WAW201',
    name: 'Paczkomat WAW201',
    street: 'Al. KEN 36',
    city: 'Warszawa',
    postalCode: '02-797',
    distance: 8.2,
    description: null,
  },
  {
    id: 'WAW234',
    name: 'Paczkomat WAW234',
    street: 'ul. Conrada 7',
    city: 'Warszawa',
    postalCode: '01-922',
    distance: 10.0,
    description: 'Przy Lidlu',
  },
  {
    id: 'PIA002',
    name: 'Paczkomat PIA002',
    street: 'ul. Piaseczyńska 44',
    city: 'Piaseczno',
    postalCode: '05-500',
    distance: 15.3,
    description: 'Centrum handlowe',
  },
];
