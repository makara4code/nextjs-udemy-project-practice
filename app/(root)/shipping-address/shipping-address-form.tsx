"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form"; // Removed ControllerRenderProps as it's not needed in imports
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
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { shippingAddressDefaultValues } from "@/lib/constants";

interface ShippingAddressFormProps {
  address?: ShippingAddress; // Made address optional
}

const ShippingAddressForm = ({ address }: ShippingAddressFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address ?? shippingAddressDefaultValues, // Use nullish coalescing operator
  });

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = (
    values
  ) => {
    startTransition(async () => {
      try {
        const res = await updateUserAddress(values);

        if (!res.success) {
          toast.error(res.message || "Failed to update address");
          return;
        }

        toast.success("Address updated successfully");
        router.push("/payment-method");
      } catch (error) {
        toast.error("An error occurred while updating the address");
        console.error("Address update error:", error);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="h2-bold mt-4">Shipping Address</h1>
      <p className="text-sm text-muted-foreground">
        Please enter an address to ship to
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter full name"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter street address"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter postal code"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter country"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto"
          >
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <ArrowRight className="w-4 h-4 mr-2" />
            )}
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
