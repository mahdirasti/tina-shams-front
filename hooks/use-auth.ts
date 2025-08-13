// hooks/use-auth.ts
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logAuthState } from "@/redux/slices/auth-slice";

export const useAuth = () => {
  const { access_token, user, is_loading } = useAppSelector(
    (state) => state.authReducer
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = !!access_token && !!user;

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
      router.push(redirectTo || "/auth/sign-in");
    }
  };

  const requireGuest = (redirectTo?: string) => {
    if (isAuthenticated && !is_loading) {
      router.push(redirectTo || "/");
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
