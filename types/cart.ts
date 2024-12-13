import { AddressType } from "./address";
import { DeliveryTimeType } from "./delivery-time";
import { DiscountType } from "./discount";
import { ProductType } from "./product";

export enum CartStatus {
  "Active" = 1,
  "Completed" = 2,
  "Canceled" = 1,
}

export type CartItemType = {
  id: string;
  product: ProductType;
  quantity: number;
};

export type CartType = {
  createdAt: string;
  address?: AddressType;
  discount?: DiscountType;
  delivery_time?: DeliveryTimeType;
  id: string;
  items: CartItemType[];
  status: CartStatus;
  total_price: number;
  total_quantity: number;
  updatedAt: string;
  userId: string;
};
