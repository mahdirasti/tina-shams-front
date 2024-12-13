import { CartType } from "./cart";
import { DiscountType } from "./discount";
import { UserType } from "./user";

export enum OrderStatus {
  PENDING = 1,
  PAID = 2,
  PROCESSING = 3,
  ON_THE_WAY = 4,
  DELIVERED = 5,
  CANCELED = 6,
  REFUND = 7,
}

export enum OrderPaymentMethod {
  IPG = 1,
  CASH_ON_DELIVERY = 3,
  CREDIT = 4,
}

export enum OrderPaymentStatus {
  PENDING = 1,
  COMPLETED = 2,
  FAILED = 3,
}

export type OrderType = {
  cart: CartType;
  createdAt: string;
  discount: DiscountType;
  discount_amount: number;
  estimated_delivery: string;
  final_amount: number;
  id: string;
  order_number: number;
  payment_status: OrderPaymentStatus;
  status: OrderStatus;
  total_amount: number;
  updatedAt: string;
  user: UserType;
  driver?: UserType;
};
