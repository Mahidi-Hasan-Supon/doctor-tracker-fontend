"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, LockKeyhole, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormValues, loginSchema } from "@/validation";
import { useLogin } from "@/hooks";

const LoginForm = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-900/5 sm:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-700">
          ♥
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in to your Doctor Tracker account
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-green-600 hover:text-green-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loginMutation.isPending ? (
            "Signing in..."
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Secure access for administrators
      </p>

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          Back to Home
        </Link>
      </div>
       {/* Login Link */}
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
