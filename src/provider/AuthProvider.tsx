// providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";
import { UserType } from "@/types/user";

export default function AuthProvider({
  user,
  children,
}: {
  user: UserType;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(userLoggedIn({ user }));
    } else {
      dispatch(userLoggedOut());
    }
  }, [user, dispatch]);

  return <>{children}</>;
}
