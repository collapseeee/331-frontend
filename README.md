# SE331 Component-Based Software Development
## Lab 05: CSS Frameworks & Comprehensive Frontend Learning Journey (Labs 01–05)

**Student Name:** Krittameth Tansuwan  
**Student ID:** 672115002  
**Repository:** [331-Lab05-CSS-Library](https://github.com/collapseeee/331-Lab05-CSS-Library)

---

## 📖 Overview

This repository represents the culmination of Labs 01 through 05 in **SE331 Component-Based Software Development**. Over the course of these labs, the project evolved from fundamental Vue 3 reactivity principles to a full-featured, single-page application (SPA) built with **Vue 3 (Composition API)**, **TypeScript**, **Vue Router**, **Pinia**, **Axios**, and styled using **Tailwind CSS**.

---

## 🧠 What I've Learned (Labs 01 – 05)

### 🔹 Lab 01: Vue 3 Reactivity & Core Fundamentals
*Goal: Understand the core mechanics of Vue 3, reactivity systems, and declarative UI rendering.*

- **Composition API & Reactivity**:
  - Leveraged `createApp`, `setup()`, `ref()`, and `reactive()` to manage reactive application state.
  - Learned how Vue tracks dependencies and re-renders the DOM when reactive variables change.
  - Used `toRefs()` to destructure reactive objects without losing reactivity.
- **Directives & Template Syntax**:
  - **Data Binding**: Used `v-bind` (`:`) for dynamic HTML attribute and property binding.
  - **Conditional Rendering**: Implemented `v-if`, `v-else-if`, `v-else`, and `v-show` for conditional DOM element rendering.
  - **List Rendering**: Used `v-for` with unique `:key` attributes to efficiently render lists and arrays of objects.
  - **Event Handling**: Used `v-on` (`@`) with event modifiers (such as `.prevent`) to handle user interactions like clicks, inputs, and form submissions.
  - **Class & Style Binding**: Dynamically applied CSS classes and inline styles based on component state (e.g., active states, disabled buttons).
- **Computed Properties**:
  - Used `computed()` to derive state (e.g., calculating cart item counts and sub-totals) with automatic caching based on reactive dependencies.
- **Component Architecture & Inter-Component Communication**:
  - Modularized UI into reusable components (`ProductDisplay`, `ProductDetails`, `ReviewForm`, `ReviewList`).
  - Implemented **Props down** (`props`) to pass configuration and data to children.
  - Implemented **Events up** (`emit`) to communicate actions from child components back to parents.
- **Two-Way Binding & Forms**:
  - Used `v-model` for two-way form data binding, collecting user input and validating reviews before submission.

---

### 🔹 Lab 02: Vue Single-File Components (SFC), TypeScript, & Axios Integration
*Goal: Transition to professional tooling with Vite, Single-File Components, strict typing, and REST API integration.*

- **Tooling with Vite & Single-File Components (SFC)**:
  - Transitioned from CDN script tags to Vite build tooling and `.vue` Single-File Components (`<template>`, `<script setup lang="ts">`, `<style scoped>`).
  - Gained high development velocity via Vite's Hot Module Replacement (HMR).
- **TypeScript Integration**:
  - Defined explicit TypeScript interfaces and types (`types.ts`) for domain models (`EventItem`, `Student`, etc.).
  - Used `defineProps<{ event: EventItem }>()` to enforce compile-time type safety on component props.
- **REST API Integration with Axios**:
  - Established a dedicated service abstraction layer (`EventService.ts`, `StudentService.ts`).
  - Configured Axios clients with a centralized `baseURL` to interact with backend endpoints / mock JSON servers.
- **Asynchronous Lifecycle Hooks**:
  - Utilized `onMounted()` to asynchronously trigger HTTP requests and update reactive state upon component initialization.
- **Component Reusability**:
  - Created standardized card views (`EventCard.vue`, `EventAdditionalCard.vue`, `StudentCard.vue`) demonstrating reusable presentation patterns.

---

### 🔹 Lab 03: Vue Router & Dynamic Client-Side Routing
*Goal: Turn the application into a rich Single-Page Application (SPA) with dynamic routing, nested views, and error handling.*

- **Vue Router 4 Setup & Configuration**:
  - Configured client-side routing using `createRouter` and HTML5 history mode (`createWebHistory`).
  - Replaced standard hyperlinks with `<RouterLink>` and `<RouterView />` for seamless client-side page transitions without page reloads.
- **Named Routes & Dynamic Route Matching**:
  - Replaced hardcoded paths with named routes (`name: 'event-detail-view'`).
  - Defined path parameters (`/event/:id`) and decoupled route parameters from components using `props: true`.
- **Nested & Layout Routing**:
  - Structured nested route hierarchies with `children` routes under `/event/:id`.
  - Created persistent parent layouts (`LayoutView.vue`) hosting sub-tabs (`DetailView`, `RegisterView`, `EditView`) to share common resource headers without duplicate code.
- **Pagination & Query Parameters**:
  - Extracted query parameters (`route.query.page`, `route.query.perPage`) to support dynamic client-side pagination.
  - Calculated total pages dynamically using response headers (such as `x-total-count`).
- **Programmatic Navigation**:
  - Used `router.push()` to trigger programmatic redirects upon user actions (e.g., following mock registrations).
- **Graceful Error Handling**:
  - Implemented resource-level 404 redirects when entities are not found.
  - Created a catch-all 404 route (`/:catchAll(.*)`) via `NotFoundView.vue`.
  - Added dedicated network error handling via `NetworkErrorView.vue` with retry actions.

---

### 🔹 Lab 04: Centralized State Management with Pinia & Navigation Guards
*Goal: Implement scalable state management with Pinia, transient flash messaging, route navigation guards, and UX enhancements.*

- **Pinia State Management**:
  - Integrated Pinia as the centralized store architecture (`createPinia()`, `defineStore`).
  - Separated concerns into modular stores:
    - `event.ts`: Caches current event state across sub-views to prevent redundant network fetches.
    - `message.ts`: Manages global flash messages across route transitions.
    - `user.ts`: Handles user domain data across views.
  - Leveraged `storeToRefs()` to destructure store states while preserving reactivity.
- **Flash Message System**:
  - Designed a temporary notification system where actions (e.g., submitting updates in `EditView`) store a message in `messageStore` that renders across navigation before timing out.
- **In-Route Navigation Guards (`beforeEnter`)**:
  - Moved data pre-fetching from component `onMounted` directly into route configuration (`beforeEnter` guards in `router/index.ts`).
  - Populated Pinia stores before the target component mounts, redirecting to `404` or `NetworkError` immediately if the resource lookup fails.
- **UX Improvements**:
  - **Progress Bar Indicator**: Integrated `nprogress` with global navigation guards (`router.beforeEach` and `router.afterEach`) to display a visual loading bar during asynchronous page transitions.
  - **Scroll Behavior**: Configured `scrollBehavior` in Vue Router to smoothly scroll back to top or restore saved scroll positions upon back/forward navigation.
- **Domain Expansion**:
  - Replicated the architecture to support another full resource: `User` (`UserListView`, `UserCard`, `UserService`, `user` store, `LayoutView`, `ProfileView`, `PostView`, and `EditView`).

---

### 🔹 Lab 05: Modern Styling with Tailwind CSS
*Goal: Transform the UI design system by replacing manual CSS with a modern utility-first CSS framework.*

- **Tailwind CSS v4 Integration**:
  - Installed and configured Tailwind CSS v4 using the modern Vite plugin (`@tailwindcss/vite`) and `@import "tailwindcss";` in `style.css`.
- **Utility-First Architecture**:
  - Refactored component templates from custom scoped CSS rules to utility classes for layout, flexbox, alignment, and spacing (e.g., `flex`, `flex-col`, `items-center`, `mb-[18px]`, `py-6`).
- **Custom Design Tokens with `@theme`**:
  - Extended Tailwind's theme system using the `@theme` directive in CSS:
    - **Custom Shadow**: Defined custom box shadow `--shadow-sp: 0 3px 12px 0 rgba(0, 0, 0, 0.2);`.
    - **Custom Typography**: Overrode default font stack with `--font-sans: Avenir, Helvetica, Arial, sans-serif;`.
    - **Custom Animations**: Built a custom keyframe animation `--animate-fade: yellowFade 3s ease-in-out;` with `@keyframes yellowFade` to create a smooth fading highlight for flash messages.
- **Interactive State Styling**:
  - Used Tailwind modifier classes (`hover:scale-101`, `hover:shadow-sp`, `cursor-pointer`, `antialiased`) for clean interactive micro-interactions.
- **Active Navigation Styling**:
  - Leveraged Vue Router's `exact-active-class="text-green-500"` on `<RouterLink>` elements to dynamically style the active navigation link cleanly without writing bespoke selector rules.
- **CSS Abstraction via `@apply`**:
  - Applied reusable styles to base HTML tags (e.g., `h1 { @apply text-4xl mb-8; }`) while maintaining consistency across views.
- **Performance & Production Monitoring**:
  - Integrated `@vercel/speed-insights/vue` for real user performance monitoring and Core Web Vitals tracking.

---

## 🛠️ Technology Stack Summary

| Layer | Technologies / Libraries |
|---|---|
| **Core Framework** | [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vite.dev/) |
| **Routing** | [Vue Router 4](https://router.vuejs.org/) |
| **State Management**| [Pinia](https://pinia.vuejs.org/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **CSS Framework** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/forms` |
| **UX Enhancements** | [NProgress](https://ricostacruz.com/nprogress/) |
| **Analytics** | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version `^22.18.0` or `>=24.12.0`)
- npm

### 1. Installation
Clone the repository and install dependencies:
```sh
npm install
```

### 2. Development Server
Start the local Vite development server with Hot Module Replacement:
```sh
npm run dev
```
Open your browser at `http://localhost:5173` (or the port specified by Vite).

### 3. Type Checking & Production Build
To run type checking via `vue-tsc` and compile the optimized production bundle:
```sh
npm run build
```

To preview the built production bundle locally:
```sh
npm run preview
```

### 4. Linting & Formatting
To run linter checks with ESLint and Oxlint:
```sh
npm run lint
```

To automatically format the codebase with Prettier:
```sh
npm run format
```

---

## 📁 Project Structure

```text
331-Lab05-CSS-Library/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Global styles, Tailwind @theme definitions
│   │   ├── base.css
│   │   ├── main.css
│   │   └── style.css       # Tailwind entry point with custom theme & keyframes
│   ├── components/         # Reusable Vue components
│   │   ├── EventCard.vue           # Event card styled with Tailwind
│   │   ├── EventAdditionalCard.vue # Secondary event presentation card
│   │   ├── StudentCard.vue         # Student item card
│   │   ├── UserCard.vue            # User display card
│   │   └── ...
│   ├── router/             # Vue Router route configs & navigation guards
│   │   └── index.ts
│   ├── services/           # Axios service clients
│   │   ├── EventService.ts
│   │   ├── StudentService.ts
│   │   └── UserService.ts
│   ├── stores/             # Pinia state stores
│   │   ├── event.ts
│   │   ├── message.ts      # Flash message store
│   │   └── user.ts
│   ├── views/              # Page view components
│   │   ├── AboutView.vue
│   │   ├── EventListView.vue
│   │   ├── NetworkErrorView.vue
│   │   ├── NotFoundView.vue
│   │   ├── SettingView.vue
│   │   ├── StudentListView.vue
│   │   ├── UserListView.vue
│   │   ├── event/          # Nested event views (Layout, Detail, Edit, Register)
│   │   └── user/           # Nested user views (Layout, Profile, Post, Edit)
│   ├── App.vue             # Root component with navigation & flash message banner
│   ├── main.ts             # Application bootstrapping (Vue, Pinia, Router, Tailwind)
│   └── types.ts            # TypeScript interfaces & types
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
