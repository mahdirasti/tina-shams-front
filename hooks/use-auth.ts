// hooks/use-auth.ts
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logAuthState } from "@/redux/slices/auth-slice";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";

export const useAuth = () => {
  const { locale } = useLocale();

  const { access_token, user, is_loading } = useAppSelector(
    (state) => state.authReducer
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = !!user;

  // Debug: Log auth state on mount and changes to verify persistence
  useEffect(() => {
    console.log("Auth state changed:", {
      isAuthenticated,
      hasAccessToken: !!access_token,
      hasUser: !!user,
      isLoading: is_loading,
    });
  }, [isAuthenticated, access_token, user, is_loading]);

  const requireAuth = (redirectTo?: string) => {
    if (!isAuthenticated && !is_loading) {
      router.push(redirectTo || getLinkWithLocale("/auth/sign-in", locale));
    }
  };

  const requireGuest = (redirectTo?: string) => {
    if (isAuthenticated && !is_loading) {
      router.push(redirectTo || getLinkWithLocale("/profile", locale));
    }
  };

  const logCurrentAuthState = () => {
    dispatch(logAuthState());
  };

  return {
    isAuthenticated,
    user,
    access_token,
    is_loading,
    requireAuth,
    requireGuest,
    logCurrentAuthState, // Debug function
  };
};
