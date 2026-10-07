import type { Size } from "./catalog";

export type OrderStatus =
  "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled" | "returned";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface PaymentMethod {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

/** Add card / wallet gateways here later — checkout renders whatever is listed. */
export const paymentMethods: PaymentMethod[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives.",
    enabled: true,
  },
  { id: "card", label: "Card", description: "Coming soon.", enabled: false },
];

export const governorates = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Qalyubia",
  "Sharqia",
  "Dakahlia",
  "Gharbia",
  "Monufia",
  "Beheira",
  "Kafr El Sheikh",
  "Damietta",
  "Port Said",
  "Ismailia",
  "Suez",
  "Faiyum",
  "Beni Suef",
  "Minya",
  "Asyut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
  "Red Sea",
  "Matrouh",
  "North Sinai",
  "South Sinai",
  "New Valley",
];

export const SHIPPING_FLAT = 60;
export const shippingFor = (subtotal: number) => (subtotal === 0 ? 0 : SHIPPING_FLAT);

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  colorId: string;
  colorName: string;
  size: Size;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  governorate: string;
  city: string;
  address: string;
  building: string;
  apartment: string;
  notes: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
}

export const createOrderId = () => `TT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
