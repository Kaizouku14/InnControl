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
import { registerSchema } from "../schema/schema";
import PasswordInput from "@/components/forms/password-input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const RegisterForm = () => {
  const navigate = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = api.auth.register.useMutation();
  function onSubmit(values: z.infer<typeof registerSchema>) {
    toast.promise(registerMutation.mutateAsync(values), {
      loading: "Registering...",
      success: () => {
        navigate.push(PageRoutes.LOGIN);
        return "Registered successfully.";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[26rem]"
      >
        <div>
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-sm">Login to start your booking journey.</p>
        </div>

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>First Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Last Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

        <div>
          <SubmitButton mutation={registerMutation}>Sign up</SubmitButton>
          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link
              className="text-sky-600 underline-offset-4 hover:underline ml-1"
              href="/"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
