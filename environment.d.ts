declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_MAPBOX_TOKEN: string
      NEXT_PUBLIC_NESHAN_API_TOKEN: string
      NEXT_PUBLIC_TOKEN_COOKIE_KEY: string
      NEXT_RUNNING_PORT: string
      NEXT_AUTH_KEY: string
      NEXT_PUBLIC_ASSETS_URL: string
    }
  }
}

export {}
