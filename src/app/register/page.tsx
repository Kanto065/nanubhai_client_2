import React from "react";
import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";
import SocialLogin from "@/components/login/SocialLogin";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div
        className="sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn"
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        <h2
          className="mt-2 text-center text-3xl font-extrabold text-black"
          style={{ color: "black" }}
        >
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            <span className="text-black!" style={{ color: "black" }}>
              Sign in
            </span>
          </Link>
        </p>
      </div>

      <div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slideUp"
        style={{ animation: "slideUp 0.6s ease-out 0.2s both" }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
