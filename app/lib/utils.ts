import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { _VARZ } from "../const/_varz";
import { UserType } from "@/types/user";
import { CartType } from "@/types/cart";
import { ProductType } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const querystring = require("querystring");
const getQueryParams = (obj: object) => querystring.stringify(obj);

export function urlWithQueryParams(url: string, object: any) {
  if (typeof object !== "object") return "";

  if (!url) return "";

  const params = getQueryParams(object);

  return `${url}?${params}`;
}
type Item = {
  id: string | number;
  [key: string]: any; // Other properties
};

export function uniqueById(items: Item[], field: string = "id"): Item[] {
  const uniqueItems = items.reduce((acc, item) => {
    acc.set(item?.[field], item);
    return acc;
  }, new Map<string | number, Item>());

  return Array.from(uniqueItems.values());
}

export const limitChar = (inputString: string, maxLength: number) => {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + "...";
  }
  return inputString;
};

export const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const timeStringToMoment = (time: string) => {
  const timesArray = time.split(":");

  const hour = timesArray[0];
  const minutues = timesArray[1];

  const momentDate = moment();

  momentDate.set({
    hours: +hour,
    minutes: +minutues,
  });

  return momentDate;
};

export const thunkResHandler = <T = any>(
  thunkRes: Promise<any>,
  thunkKey: string,
  onSuccess: (res: { payload: T }) => void,
  onError: (res: any) => void
): void => {
  thunkRes.then((res) => {
    if (res.type === `${thunkKey}/fulfilled`) {
      onSuccess(res);
    } else if (res.type === `${thunkKey}/rejected`) {
      onError(res);
    }
  });
};

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) {
    throw new Error("Zero error ...");
  }
  return (part / total) * 100;
}

export function getFullAssets(source: string) {
  return `${_VARZ.assetsUrl}/${source}`;
}

export function getFullName(item: UserType) {
  let output = item?.name ?? "";

  if (item?.surename) output += ` ${item.surename}`;

  return output.trim();
}

export const generateSeoData = ({
  title,
  description,
  keyword,
}: {
  title: string;
  description?: string;
  keyword?: string;
}) => {
  const metadata: Record<string, any> = {
    title,
    description: description ?? "",
  };

  if (keyword) metadata["keyword"] = keyword;

  return metadata;
};

export const meetMinimumCartPrice = (min: number, cart?: CartType) => {
  if (!cart)
    return {
      isCartPriceMeetMinimum: false,
      leftOver: 0,
      leftOverPercentage: 0,
    };

  const cartTotalPrice = cart ? cart.total_price : 0;

  const cartMinimumPrice = min;

  const isCartPriceMeetMinimum = cartMinimumPrice <= cartTotalPrice;

  const leftOver = Math.round(cartMinimumPrice - cartTotalPrice);
  const leftOverPercentage =
    cartMinimumPrice === 0
      ? 100
      : calculatePercentage(cartTotalPrice, cartMinimumPrice);

  return {
    isCartPriceMeetMinimum,
    leftOver,
    leftOverPercentage,
  };
};

export function productPriceFinal(product: ProductType) {
  let productPrice = product?.price;

  if (product?.discountAmount) {
    productPrice = productPrice - product?.discountAmount;
  } else if (product?.discountPercentage) {
    productPrice =
      product.price - (product.price * product.discountPercentage) / 100;
  }

  return productPrice;
}

export function productDiscountFinal(product: ProductType) {
  if (product?.discountAmount) return product.discountAmount;

  if (product?.discountPercentage) {
    return (product.price * product.discountPercentage) / 100;
  }

  return 0;
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

export function isWithinRadius(
  centerLat: number,
  centerLng: number,
  targetLat: number,
  targetLng: number,
  radius: number
): boolean {
  const distance = haversineDistance(
    centerLat,
    centerLng,
    targetLat,
    targetLng
  );
  return distance <= radius;
}
