# mystore 🛍️

A small e-commerce storefront built to practice real-world frontend patterns — API integration, state management, routing, and a persistent cart.

**[Live demo →](https://mystore-nu-one.vercel.app/)**

## What it does

- Browse a live product catalog from [FakeStoreAPI](https://fakestoreapi.com)
- Search products and filter by category
- View product detail pages with descriptions and pricing
- Add to cart, adjust quantities, remove items — from a slide-in cart drawer
- Cart persists across page refreshes (localStorage)
- Full checkout flow with an order summary (demo only, no real payment)
- Toast notifications for cart actions

## Why I built it this way

- **State management** — cart logic lives in a `useReducer` + Context setup, so add/remove/quantity updates all flow through one predictable reducer.
- **Persistence** — the cart survives a refresh via localStorage.
- **Real API, real loading states** — data comes from a live network call, so the UI handles loading and error states, not just the happy path.
- **Routing** — React Router drives product detail pages and checkout as real routes.

## Tech stack

React · Vite · React Router · Context API + `useReducer` · Tailwind CSS · react-hot-toast · lucide-react

## Running it locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/   Navbar, ProductCard, CartDrawer
  context/      CartContext (reducer + localStorage sync)
  lib/          api.js — FakeStoreAPI calls
  pages/        Home, ProductDetail, Checkout
```