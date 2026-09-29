export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
}

export interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  total: number;
  customerName: string;
  estimatedDelivery: string;
}
