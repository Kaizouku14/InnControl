"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/app/_trpc/client";
import { loginSchema } from "../schema/schema";
import PasswordInput from "@/components/forms/password-input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const LoginForm = () => {
  const navigate = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = api.auth.login.useMutation();
  function onSubmit(values: z.infer<typeof loginSchema>) {
    toast.promise(loginMutation.mutateAsync(values), {
      loading: "Logging...",
      success: () => {
        navigate.push(PageRoutes.DASHBOARD);
        return "Logged in successfully";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80 ">
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm">Login to start your booking journey.</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>Email Address</span>
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Password</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-end">
            <Link
              className="text-xs text-sky-600 underline-offset-4 hover:underline text-end"
              href={PageRoutes.FORGOT_PASSWORD}
            >
              Forgot Password
            </Link>
          </div>
        </div>

          <SubmitButton mutation={loginMutation}>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
