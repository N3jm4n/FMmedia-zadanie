# FMedia Checkout — Prototyp MVP

## Opis

Webowa aplikacja prototypowa (mobile-first) procesu checkoutu sklepu FMedia, zbudowana w **React + TypeScript + Vite**.

Obejmuje kompletny flow:
- 🛒 **Koszyk** — lista produktów z cenami
- 📋 **Podsumowanie zamówienia** — centralny hub z danymi odbiorcy, faktury, dostawą i płatnością
- 🚚 **Wybór metody dostawy** — bottom sheet z 4 opcjami
- 📦 **Wybór Paczkomatu InPost** — lista z wyszukiwarką i odległościami
- 💳 **Wybór płatności** — bottom sheet z 5 opcjami
- 📝 **Dane odbiorcy / faktury** — formularze z walidacją (kod pocztowy XX-XXX, telefon)
- ✅ **Potwierdzenie zamówienia** — podsumowanie + animacja sukcesu

## Uzasadnienie wyboru technologii

**React + TypeScript + Vite (web, mobile-first)**, ponieważ:

1. **Doświadczenie** — React to framework, w którym napisałem najwięcej projektów
2. **Szybkość prototypowania** — Vite zapewnia instant HMR i zero-config start
3. **TypeScript** — bezpieczeństwo typów, lepsze IDE support, łatwiejsze refactoring
4. **Mobile-first CSS** — viewport 430px z centrowaniem symuluje natywną aplikację
5. **Brak potrzeby natywnych API** — dane mockowane, nie potrzeba kamery/GPS

## Instrukcja uruchomienia

### Wymagania
- Node.js 18+ 
- npm 9+

### Kroki

```bash
# 1. Przejdź do folderu projektu
cd "solution(put your solution here)"

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev
```

Aplikacja otworzy się na `http://localhost:5173/`

### Build produkcyjny (opcjonalnie)

```bash
npm run build
npm run preview
```


