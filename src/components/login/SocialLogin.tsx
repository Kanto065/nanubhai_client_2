"use client";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function SocialLogin() {
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    setServerError("");

    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    });

    const result = await res.json();

    if (!result.success) {
      setServerError(result.message);
    } else {
      dispatch(userLoggedIn({ user: result.user }));
      router.push("/");
    }
  };
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      {serverError && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {serverError}
        </p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google login failed")}
          width="100%"
        />
        <button
          type="button"
          className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          <Image
            src="/images/social/facebook.svg"
            alt="Facebook"
            width={20}
            height={20}
            className="w-5 h-5 mr-2"
          />
          <span className="text-black" style={{ color: "black" }}>
            Facebook
          </span>
        </button>
      </div>
    </div>
  );
}
