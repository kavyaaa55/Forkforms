"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
};

function FormBuilder({ fields }: { fields: Field[] }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("🛍️ Checkout successful!");
    console.log("💰 Checkout Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-4 border rounded-lg"
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              {...register(field.name, { required: field.required })}
            />
          ) : (
            <Input
              id={field.name}
              {...register(field.name, { required: field.required })}
              type={field.type}
            />
          )}
        </div>
      ))}
      <Button type="submit" className="w-full">Complete Checkout</Button>
    </form>
  );
}

export function CheckoutForm() {
  return (
    <FormBuilder
      fields={[
        { name: "shippingAddress", label: "Shipping Address", type: "textarea", required: true },
        { name: "billingAddress", label: "Billing Address", type: "textarea", required: true },
        { name: "paymentMethod", label: "Payment Method (e.g. UPI/Card)", type: "text", required: true },
      ]}
    />
  );
}

