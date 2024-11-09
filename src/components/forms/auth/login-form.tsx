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

const LoginForm = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = api.auth.login.useMutation();
  function onSubmit(values: z.infer<typeof loginSchema>) {

    loginMutation.mutateAsync(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80 ">

        <div>
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-sm" >Login to start your booking journey.</p>
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
           <SubmitButton mutation={loginMutation}>Login</SubmitButton>
           <p className="text-sm text-center">Don&apos;t have an account?
            <Link
                className="text-sky-600 underline-offset-4 hover:underline ml-1" 
                href="/register"
               >Sign up</Link>
           </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
