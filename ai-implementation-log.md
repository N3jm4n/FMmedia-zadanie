# AI Implementation Log — FMedia Checkout Prototype

## Narzędzie
**Antigravity (Google DeepMind)** — agentic AI coding assistant, używany do generowania kodu, designu i iteracyjnych poprawek w ramach IDE.

---

## Przykład 1: Walidacja formularza adresowego (kod pocztowy + telefon)

### Kontekst
Pisanie walidacji formularza danych odbiorcy — w szczególności format kodu pocztowego (XX-XXX) i numeru telefonu.

### Co wygenerowało AI
AI wygenerowało pełną funkcję `validateAddress()` z regexami:
```typescript
if (!/^\d{2}-\d{3}$/.test(addr.postalCode)) {
  errors.postalCode = 'Nieprawidłowy format (XX-XXX)';
}
// ...
const digits = addr.phone.replace(/[\s\-\+]/g, '');
if (digits.length < 9) {
  errors.phone = 'Numer telefonu musi mieć min. 9 cyfr';
}
```

### Moja decyzja
- ✅ **Zaakceptowałem** regex `^\d{2}-\d{3}$` — poprawnie waliduje polski format kodu pocztowego
- ✅ **Zaakceptowałem** podejście do telefonu (strip znaków specjalnych, sprawdzenie min. 9 cyfr) — obsługuje formaty z `+48`, spacjami i myślnikami
- 🔄 **Zmodyfikowałem** komunikaty błędów — AI generowało techniczne komunikaty ("Invalid postal code format"), zmieniłem na przyjazne polskie wersje ("Nieprawidłowy format (XX-XXX)")

### Uzasadnienie
Regexy były prawidłowe technicznie, ale UX wymaga komunikatów w języku polskim i zrozumiałych dla końcowego użytkownika — nie developera.

---

## Przykład 2: Architektura stanu — useReducer vs useState

### Kontekst
Projektowanie zarządzania stanem checkoutu (koszyk, adres, dostawa, płatność) z zachowaniem danych między krokami nawigacji.

### Co wygenerowało AI
AI zaproponowało `useContext` + `useReducer` z pełnym reducerem obsługującym akcje: `SET_RECIPIENT`, `SET_INVOICE`, `SET_DELIVERY_METHOD`, `SET_PARCEL_LOCKER`, `SET_PAYMENT`, `RESET`.

Inicjalnie zasugerowało również prostszą wersję z wieloma `useState` w komponencie głównym.

### Moja decyzja
- ✅ **Zaakceptowałem** podejście useReducer — lepsze dla złożonego stanu z wieloma powiązanymi polami
- 🔄 **Zmodyfikowałem** logikę `SET_DELIVERY_METHOD` — dodałem automatyczne resetowanie wybranego paczkomatu gdy użytkownik zmienia metodę dostawy z "Paczkomat" na inną. AI nie uwzględniło tego edge case'a:
```typescript
case 'SET_DELIVERY_METHOD':
  return {
    ...state,
    delivery: {
      method: action.payload,
      // Resetuj paczkomat jeśli metoda ≠ paczkomat
      parcelLocker: action.payload.id === 'paczkomat' ? state.delivery.parcelLocker : null,
    },
  };
```
- ✅ **Zaakceptowałem** computed values (`cartTotal`, `orderTotal`) w providerze zamiast w komponentach — jedno źródło prawdy

### Uzasadnienie
Bez resetowania paczkomatu przy zmianie metody dostawy, użytkownik mógłby zobaczyć "Paczkomat WAW012" w podsumowaniu przy dostawie kurierskiej — niespójność danych. To klasyczny edge case, który AI pominęło, a analityk powinien wyłapać.

---

## Przykład 3: Design system — odwzorowanie makiet

### Kontekst
Budowanie CSS design systemu na podstawie 5 dostarczonych makiet PNG (Koszyk, Checkout, Wybierz dostawę, Paczkomat lista, Lista produktów).

### Co wygenerowało AI
AI przeanalizowało makiety wizualnie i wygenerowało pełny design system z CSS custom properties:
- Kolory (primary orange, success green, text grays)
- Spacing scale (4px → 32px)
- Border radius (8px → 20px)
- Typografia (Inter, wagi 400-700)
- Komponenty CSS (`.delivery-option`, `.radio-card`, `.bottom-sheet`, etc.)

### Moja decyzja
- ✅ **Zaakceptowałem** system tokenów — dobrze odwzorowany z makiet
- ✅ **Zaakceptowałem** komponent `.bottom-sheet` z animacją slide-up — zgodny z mobilnym UX patternem
- ❌ **Odrzuciłem** początkową propozycję użycia Tailwind CSS — zadanie jest na tyle małe, że vanilla CSS z custom properties jest czytelniejszy i daje pełną kontrolę bez dodatkowej zależności. Tailwind dodałby niepotrzebny narzut konfiguracyjny dla prototypu.

### Uzasadnienie
Vanilla CSS z custom properties to najlepszy wybór dla małego prototypu MVP — zero dodatkowych zależności, pełna kontrola nad stylami, a design tokeny zapewniają spójność. Przy większym projekcie rozważyłbym CSS Modules lub styled-components.

---

## Przykład 4: Zaawansowana walidacja (edge cases numeru telefonu)

### Kontekst
Udoskonalenie logiki walidacji numeru telefonu w formularzu danych odbiorcy, po zauważeniu przez analityka luki w systemie pozwalającej na wpisywanie liter.

### Co wygenerowało AI
Po wskazaniu braku limitu długości, AI początkowo wygenerowało poprawkę sprawdzającą jedynie, czy liczba znaków po usunięciu spacji, plusów i myślników wynosi od 9 do 15:
```typescript
const digits = addr.phone.replace(/[\s\-\+]/g, '');
if (digits.length < 9 || digits.length > 15) { ... }
```

### Moja decyzja
- ❌ **Odrzuciłem** tę propozycję i zwróciłem uwagę, że system nadal pozwala na wpisywanie liter (ciąg "abcdefghi" po usunięciu znaków wciąż przechodził test na długość = 9).
- ✅ **Zaakceptowałem** drugą, poprawioną iterację, w której AI najpierw waliduje ciąg za pomocą wyrażenia regularnego pod kątem obecności *wyłącznie* cyfr, a dopiero potem weryfikuje długość:
```typescript
const digits = addr.phone.replace(/[\s-+]/g, '');
if (!/^\d+$/.test(digits)) {
  errors.phone = 'Numer telefonu może zawierać tylko cyfry, spacje, "+" i "-"';
} else if (digits.length < 9 || digits.length > 15) { ... }
```

### Uzasadnienie
AI czasami generuje poprawki bardzo dosłownie (dodało limit długości znaków, tak jak padło w prompcie), zapominając o szerszym kontekście działania walidacji (litery zamiast cyfr). Rolą analityka jest przetestowanie "edge case'ów" aplikacji i naprowadzenie narzędzia na kompleksowe, kuloodporne rozwiązanie.
## Przykład 4: Zaawansowana walidacja (edge cases numeru telefonu)

### Kontekst
Udoskonalenie logiki walidacji numeru telefonu w formularzu danych odbiorcy, po zauważeniu przez analityka luki w systemie pozwalającej na wpisywanie liter.

### Co wygenerowało AI
Po wskazaniu braku limitu długości, AI początkowo wygenerowało poprawkę sprawdzającą jedynie, czy liczba znaków po usunięciu spacji, plusów i myślników wynosi od 9 do 15

### Moja decyzja
- ❌ **Odrzuciłem** tę propozycję i zwróciłem uwagę, że system nadal pozwala na wpisywanie liter (ciąg "abcdefghi" po usunięciu znaków wciąż przechodził test na długość = 9).
- ✅ **Zaakceptowałem** drugą, poprawioną iterację, w której AI najpierw waliduje ciąg za pomocą wyrażenia regularnego pod kątem obecności *wyłącznie* cyfr, a dopiero potem weryfikuje długość:

### Uzasadnienie
AI czasami generuje poprawki bardzo dosłownie (dodało limit długości znaków, tak jak padło w prompcie), zapominając o szerszym kontekście działania walidacji (litery zamiast cyfr). Rolą analityka jest przetestowanie "edge case'ów" aplikacji i naprowadzenie narzędzia na kompleksowe, kuloodporne rozwiązanie.
