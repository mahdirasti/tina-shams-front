import useSWR, { SWRResponse } from "swr"
import type { SWRConfiguration } from "swr"
import axiosInstance from "../lib/axios"

const useApi = <T = any, K = any>(
  url: string,
  key?: string,
  config: SWRConfiguration = { shouldRetryOnError: false }
): SWRResponse<T, K> => {
  return useSWR(
    key ? key : url,
    async () => {
      const res = await axiosInstance.get(url)
      return res.data
    },
    { ...config }
  )
}
export default useApi
