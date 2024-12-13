export let _VARZ = {
  sessionCookieName:
    process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "auth-token",
  tokenCookieKey:
    process.env.NEXT_PUBLIC_TOKEN_COOKIE_KEY ?? "token-cookie-key",
  nextAuthKey: process.env.NEXT_AUTH_KEY ?? "token-cookie-key",
  signOutApiPage: `/api/auth/sign-out`,
  assetsUrl: process.env.NEXT_PUBLIC_ASSETS_URL,
  mapCenterCoords: [51.3347, 35.7219],
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
};

export const _BUS = {
  changeAddress: "CHANGE_ADDRESS",
  showLogin: "SHOW_LOGIN",
  closeLogin: "CLOSE_LOGIN",
  logout: "LOGOUT",
  showCart: "SHOW_CART",
  closeCart: "CLOSE_CART",
};
