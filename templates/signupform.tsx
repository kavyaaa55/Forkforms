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
    alert("Signup submitted!");
    console.log("✅ Signup Data:", data);
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
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
  );
}

export function SignupForm() {
  return (
    <FormBuilder
      fields={[
        { name: "username", label: "Username", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "password", label: "Password", type: "password", required: true },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
      ]}
    />
  );
}

