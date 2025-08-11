"use client";

import { loginAction } from "@/actions/user";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { LoginSchemaType, loginUserSchema } from "@/validation/user.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginUserSchema),
  });

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchemaType) => {
    setServerError("");
    const result = await loginAction(data);

    if (!result.success) {
      if (result.fieldErrors) {
        // Show Zod field errors from action
        for (const key in result.fieldErrors) {
          const fieldKey = key as keyof typeof result.fieldErrors;
          setError(key as keyof LoginSchemaType, {
            message: result.fieldErrors[fieldKey]?.[0] || "Invalid",
          });
        }
      } else if (result.message) {
        setServerError(result.message);
      }
    } else {
      // ✅ login success — redirect or update UI
      dispatch(userLoggedIn({ user: result?.user }));
      router.push("/");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {serverError}
        </p>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black"
          style={{ color: "black" }}
        >
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors?.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black`}
            placeholder="you@example.com"
            style={{ color: "black" }}
          />
        </div>
        {errors?.email && (
          <p className="mt-2 text-sm text-red-600">{errors?.email?.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
          style={{ color: "black" }}
        >
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`block w-full pl-10 pr-10 py-2 border ${
              errors?.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black`}
            placeholder="••••••••"
            style={{ color: "black" }}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {errors?.password && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            <span className="text-black!" style={{ color: "black" }}>
              Forgot your password?
            </span>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
