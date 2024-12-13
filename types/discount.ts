import { UserType } from "./user";

export enum DiscountTypeType {
  PERCENTAGE = 1,
  FIXED_AMOUNT = 2,
}

export enum DiscountStatus {
  ACTIVE = 1,
  DISABLED = 2,
}

export type DiscountType = {
  code: string;
  createdAt: string;
  id: string;
  min_purchase_amount: number;
  status: DiscountStatus;
  type: DiscountTypeType;
  updatedAt: string;
  value: number;
};
