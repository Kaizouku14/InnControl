"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InventoryFormSchema } from "../schema/form-schema";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";

const InventoryForm = () => {
  const inventoryMutation = api.inventory.addItem.useMutation();

  const form = useForm<z.infer<typeof InventoryFormSchema>>({
    resolver: zodResolver(InventoryFormSchema),
    defaultValues: {
      item_name: "",
      category: undefined,
      quantity: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof InventoryFormSchema>) => {
    toast.promise(
      inventoryMutation.mutateAsync({
        ...values,
        quantity: Number(values.quantity),
      }),
      {
        loading: "Adding item...",
        success: () => {
          form.reset();
          return "Item added successfully";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-4 border-b py-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="item_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Category</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="linen">Linen</SelectItem>
                    <SelectItem value="cleaning supplies">
                      Cleaning supplies
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton className="w-full md:w-56" mutation={inventoryMutation}>
            Add item
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default InventoryForm;
