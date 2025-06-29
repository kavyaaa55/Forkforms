"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
};

function FormBuilder({ fields }: { fields: Field[] }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("📦 Address submitted!");
    console.log("📍 Address Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-4 border rounded-lg"
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            {...register(field.name, { required: field.required })}
            type={field.type}
          />
        </div>
      ))}
      <Button type="submit" className="w-full">Submit Address</Button>
    </form>
  );
}

export function AddressForm() {
  return (
    <FormBuilder
      fields={[
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "address", label: "Address", type: "text", required: true },
        { name: "pincode", label: "Pincode", type: "text", required: true },
        { name: "country", label: "Country", type: "text", required: true },
      ]}
    />
  );
}

