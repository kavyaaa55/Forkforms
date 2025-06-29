"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
};

type FormBuilderProps = {
  fields: Field[];
};

function FormBuilder({ fields }: FormBuilderProps) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("Form submitted!");
    console.log("Form submitted successfully:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-4 border rounded-lg"
    >
      {fields.map((field: Field) => (
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
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export function ContactForm() {
  return (
    <FormBuilder
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "message", label: "Message", type: "textarea" },
      ]}
    />
  );
}

