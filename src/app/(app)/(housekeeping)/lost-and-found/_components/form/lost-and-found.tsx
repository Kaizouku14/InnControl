"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LostAndFoundSchema } from "../schema/schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import SubmitButton from "@/components/forms/submit-button";

const LostAndFound = () => {
  const form = useForm<z.infer<typeof LostAndFoundSchema>>({
    resolver: zodResolver(LostAndFoundSchema),
    defaultValues: {
      item_lost: "",
      item_color: "",
    },
  });

  function onSubmit(values: z.infer<typeof LostAndFoundSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mr-8 md:mr-12">

        <div className="grid md:grid-cols-2 items-center gap-4">
          <FormField
            control={form.control}
            name="item_lost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lost Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Lost item..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="item_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lost Item Color</FormLabel>
                <FormControl>
                  <Input placeholder="Lost item..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default LostAndFound;
