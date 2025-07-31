# Botanepal – Plant E-commerce Website 🌿

## Overview

**Botanepal** is a **frontend-only plant e-commerce web application** built with **React**, **Tailwind CSS**, and **React Router**. It features a clean, responsive UI designed to showcase and shop for plant products, simulating real-world e-commerce functionality.

---

## 🔑 Key Features

- 🪴 **Product Collection**: Browse and filter plants by category and type.
- 🔍 **Search Functionality**: Search bar redirects to the collection page and filters products in real time.
- 🛒 **Shopping Cart**: Add to cart with size selection, update quantity, and remove items.
- 🧾 **Order Placement**: Place an order with shipping address and selected items.
- 📃 **My Orders Page**: View dynamically updated list of previously placed orders.
- 📱 **Responsive Design**: Mobile-friendly layout with adaptive sidebar menu.
- ⚙️ **Mock API with JSON Server**: Simulates backend API for product and order data.
- 🎨 **Tailwind CSS**: Rapid UI development and customization.
- 🧠 **State Management**: Uses **React Context API** for cart, search, and UI state.
- 🧩 **Reusable Components**: Navbar, ProductItem, Footer, SearchBar, etc.

---

## 🧰 Tech Stack

- **React** (v18+)
- **React Router DOM** (v6+)
- **Tailwind CSS**
- **React Context API**
- **JSON Server** (for mock API)
- **React Toastify**

---


## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**

git clone https://github.com/sjoshiii/Botanepal.git
cd Frontend

2. **Install dependencies**

Using npm:
npm install


3. **Start JSON Server (Mock API)**

json-server --watch db.json --port 5000

**Make sure you have JSON Server installed globally. If not, install it via:**
npm install -g json-server


4. **Start the development server**

npm run dev

This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

---

## Customization

- **Tailwind CSS**  
  Modify `tailwind.config.js` to customize colors, fonts, or extend utilities.

- **Assets**  
  Replace images and icons in the `src/assets` folder with your own.

- **Context State**  
  Extend or modify the `ShopContext` to add new features or state variables.

---

## Future Improvements

- Add user authentication and profile management.
- Integrate backend API for dynamic product data and order processing.
- Implement payment gateway and checkout flow.
- Add pagination and advanced product filtering.
- Enhance accessibility with ARIA roles and keyboard navigation.

---
