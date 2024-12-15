import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { _VARZ } from "../const/_varz";
import { UserType } from "@/types/user";

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

export function gramsAmount(amount: number | string, unit?: string) {
  return `${amount}${unit ? ` ${unit}` : ""}`;
}

export function purityAmount(amount: number | string, unit?: string) {
  return `${amount}${unit ? ` ${unit}` : ""}`;
}

export function getLinkWithLocale(path: string, locale?: string) {
  return `/${locale}${path}`;
}
