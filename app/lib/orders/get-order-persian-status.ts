import { OrderStatus } from "@/types/order";

export const getOrderPersianStatus = (status: OrderStatus) => {
  const object: any = {
    [OrderStatus.PENDING]: "در حال بررسی",
    [OrderStatus.PROCESSING]: "در حال آماده سازی",
    [OrderStatus.CANCELED]: "لغو شده",
    [OrderStatus.DELIVERED]: "تحویل داده شده",
    [OrderStatus.ON_THE_WAY]: "در مسیر",
    [OrderStatus.PAID]: "پرداخت شده",
    [OrderStatus.REFUND]: "مرجوعی",
  };
  return object[status];
};
