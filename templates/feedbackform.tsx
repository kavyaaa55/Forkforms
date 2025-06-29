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

function FormBuilder({ fields }: { fields: Field[] }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("Thanks for your feedback!");
    console.log("📝 Feedback received:", data);
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
      <Button type="submit" className="w-full">Submit Feedback</Button>
    </form>
  );
}

export function FeedbackForm() {
  return (
    <FormBuilder
      fields={[
        { name: "name", label: "Your Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email" },
        { name: "message", label: "Your Feedback", type: "textarea", required: true },
      ]}
    />
  );
}

