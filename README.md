# 🚀 LocalConnect

LocalConnect is an Expo-powered React Native app for discovering local services and merchants.

It is built as a mobile-first experience that connects users to nearby service providers with category filtering, search, and booking flow.

---

## 📌 Current Implementation

This workspace currently includes:

- A **Home** tab with a featured merchant, category filter, and incremental service loading
- An **Explore** tab with search, sorting by nearby / top rating, and paginated service list
- A **Favorites** tab for favorited services
- A **Profile** tab with basic user state handling
- A **booking modal** on service cards for choosing a date and confirming or canceling a visit
- Zustand store for user / favorites state

---

## 🧪 What is implemented today

- Local service data rendering via `FlatList`
- Category selection and filtering in Home
- Search and sort controls in Explore
- Incremental loading of service cards
- Memoized item rendering for better list performance
- Booking modal UI with date selection and schedule/cancel actions
- Favorites toggle support for service cards

---

## 🧰 Tech Stack

- **React Native**
- **Expo** with **expo-router**
- **Zustand** for state management
- **expo-image** for image rendering
- **TypeScript**

---

## 🚀 Run the project

```bash
cd LocalConnect
npm install
npm run start
```

Then use the Expo CLI to run on a simulator or device:

```bash
npm run ios
npm run android
npm run web
```

---
