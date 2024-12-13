export { default as encodeWithSecret } from "./encodeWithSecret"
export { default as decodeWithSecret } from "./decodeWithSecret"
export { default as useQueryParams } from "./useQueryParams"
export { default as getDate } from "./getDate"
export { default as getRelativeTime } from "./getRelativeTime"
export { default as limitChar } from "./limitChar"
export const getPriceFormat = (price: string, unit?: string) =>
  `${parseFloat(price).toLocaleString()}${unit !== undefined ? ` ${unit}` : ""}`

export const normalizeDigits = (input: string) => {
  return input.replace(/[۰-۹]/g, (digit: any) =>
    String.fromCharCode(digit.charCodeAt(0) - 1728)
  )
}

export function convertPersianToEnglishNumbers(input: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  return input.replace(/[۰-۹]/g, (match) => {
    const index = persianNumbers.indexOf(match)
    return englishNumbers[index]
  })
}
