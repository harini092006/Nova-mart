# TECH ODYSSEY 2026 — TECH EMERGENCY ROOM
## ROUND 2 WEBSITE #1: NOVA MART (E-COMMERCE DEBUGGING CHALLENGE)
### ORGANIZER BUG MAP (CONFIDENTIAL — DO NOT PUBLISH TO PARTICIPANTS)

---

### BUG-01
**Feature:** Product Search  
**Expected:** Typing a search term (e.g., "watch", "headphones") in the search input and pressing the Search button or submitting the search form should filter products containing the search query in their name, category, or description.  
**Actual:** The search input updates text locally, but clicking the Search button or submitting the form does not filter products.  
**Likely root cause:** In `src/components/Header.tsx`, the `handleSearchSubmit` function receives `searchInput` state but fails to invoke `setSearchQuery(searchInput)` to update the global `searchQuery` state in `ShopContext`.  
**How to verify:** Type "watch" into the search bar and click the search magnifying glass icon button. Observe that the product list does not filter.  
**Expected fix:** In `src/components/Header.tsx`, update `handleSearchSubmit`:
```tsx
const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSearchQuery(searchInput);
};
```

---

### BUG-02
**Feature:** Add to Cart from Product Cards  
**Expected:** Clicking the "Add" / "Add to Cart" button on a product card in the product grid should immediately add 1 unit of that product to the shopping cart.  
**Actual:** Clicking "Add" on any product card in the grid triggers the button effect but does not add the item to the cart.  
**Likely root cause:** In `src/components/ProductCard.tsx`, the `handleAddToCartCard` click handler does not call `addToCart(product)`.  
**How to verify:** Click the "Add" button directly on any product card in the home page grid. Open the cart drawer and observe the cart is empty or item count did not increase.  
**Expected fix:** In `src/components/ProductCard.tsx`, update `handleAddToCartCard`:
```tsx
const handleAddToCartCard = (e: React.MouseEvent) => {
  e.stopPropagation();
  addToCart(product);
};
```

---

### BUG-03
**Feature:** Cart Item Quantity Controls (+ / −)  
**Expected:** In the cart drawer, clicking `+` increases quantity by 1 and clicking `−` decreases quantity by 1 (with minimum quantity = 1).  
**Actual:** Clicking `+` or `−` in the cart drawer calls the handler, but the displayed quantity and item state do not change.  
**Likely root cause:** In `src/context/ShopContext.tsx`, `updateQuantity` maps over `cart` items but returns `{ ...item, quantity: item.quantity }` instead of `{ ...item, quantity: newQuantity }`.  
**How to verify:** Add a product to the cart (via product detail modal), open the cart drawer, and click `+` or `−`. Observe that the quantity number remains static.  
**Expected fix:** In `src/context/ShopContext.tsx`, fix `updateQuantity`:
```tsx
const updateQuantity = (productId: string, newQuantity: number) => {
  if (newQuantity < 1) return;
  setCart(prevCart =>
    prevCart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
};
```

---

### BUG-04
**Feature:** Cart Subtotal & Total Dynamic Recalculation  
**Expected:** When items are added, removed, or quantities change in the cart, the cart subtotal, delivery fee, discount, and total amount must recalculate immediately.  
**Actual:** The cart total and subtotal remain frozen at the initial computed value (e.g. $0.00 or initial amount) when cart state changes.  
**Likely root cause:** In `src/context/ShopContext.tsx`, `subtotal` is memoized with `useMemo(..., [])` using an empty dependency array `[]`, preventing recalculation when `cart` changes.  
**How to verify:** Add multiple products to cart or change items. Observe that the subtotal and total shown at the bottom of the cart drawer do not update dynamically.  
**Expected fix:** In `src/context/ShopContext.tsx`, add `[cart]` to `useMemo`:
```tsx
const subtotal = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}, [cart]);
```

---

### BUG-05
**Feature:** Cart Item Removal  
**Expected:** Clicking the trash / Remove icon button on a cart item removes exactly that specific product from the cart.  
**Actual:** Clicking Remove on a product in the cart removes a different (wrong) product from the cart.  
**Likely root cause:** In `src/context/ShopContext.tsx`, `removeFromCart` finds `targetIndex` but filters out `(targetIndex + 1) % prevCart.length` instead of `targetIndex`.  
**How to verify:** Add Product A and Product B to the cart. Click the Remove trash icon next to Product A. Observe that Product B is removed instead.  
**Expected fix:** In `src/context/ShopContext.tsx`, update `removeFromCart`:
```tsx
const removeFromCart = (productId: string) => {
  setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
};
```

---

### BUG-06
**Feature:** Checkout Form Validation  
**Expected:** The checkout form must validate required fields (Full Name, Email, Phone, Address, City, Pincode) and block submission if any required field is empty.  
**Actual:** Submitting the checkout form with empty fields bypasses validation and successfully places the order.  
**Likely root cause:** In `src/components/CheckoutModal.tsx`, `validateForm()` checks errors and populates `newErrors`, but explicitly `return true;` unconditionally at the end instead of returning `Object.keys(newErrors).length === 0`.  
**How to verify:** Click "Proceed to Checkout" in the cart drawer. Leave all form fields blank and click "Place Order". Observe that the order confirmation modal opens successfully despite missing fields.  
**Expected fix:** In `src/components/CheckoutModal.tsx`, update `validateForm`:
```tsx
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};
  if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
  if (!formData.email.trim()) newErrors.email = 'Email address is required';
  if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
  if (!formData.address.trim()) newErrors.address = 'Street address is required';
  if (!formData.city.trim()) newErrors.city = 'City is required';
  if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

### BUG-07
**Feature:** Mobile Responsive Product Grid Layout  
**Expected:** On mobile viewports (<640px), product cards should display cleanly in a 2-column layout without overlapping or colliding.  
**Actual:** Product cards collide and overlap vertically over one another on mobile viewports while desktop and tablet layouts remain visually correct.  
**Likely root cause:** In `src/components/ProductGrid.tsx`, the grid container includes `-space-y-16 sm:space-y-0` which applies negative vertical spacing on mobile screens.  
**How to verify:** Resize the browser window to mobile width (<640px) or view on a mobile device emulator. Observe that product cards in lower rows overlap onto upper rows.  
**Expected fix:** In `src/components/ProductGrid.tsx`, remove `-space-y-16`:
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
```
