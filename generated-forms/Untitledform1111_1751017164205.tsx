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

export default function Untitledform1111() {
  return (
    <div>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        Untitled form1111
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>11zqz</p>
      <div className="mb-4">
        <Label
          htmlFor="1751017158390"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Textarea
          id="1751017158390"
          name="1751017158390"
          placeholder="Long answer"
          className="w-full min-h-[60px]"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="1751017161965"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Input
          id="1751017161965"
          name="1751017161965"
          placeholder="Short answer"
          className="w-full"
        />
      </div>
    </div>
  );
}
