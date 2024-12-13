export enum DeliveryTimeDays {
  Saturday = 6,
  Sunday = 7,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
}

export enum PersianDeliveryTimeDays {
  "شنبه" = 6,
  "یکشنبه" = 7,
  "دوشنبه" = 1,
  "سه‌شنبه" = 2,
  "چهارشنبه" = 3,
  "پنجشنبه" = 4,
  "جمعه" = 5,
}

export type DeliveryTimeType = {
  capacity: number;
  createdAt: string;
  day: DeliveryTimeDays;
  end_time: number;
  id: string;
  price: number;
  start_time: number;
  updatedAt: string;
};
