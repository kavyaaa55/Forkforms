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

export default function Untitledformkavya111() {
  return (
    <div>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        Untitled formkavya111
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}></p>
      <div className="mb-4">
        <Label
          htmlFor="1751017411476"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Textarea
          id="1751017411476"
          name="1751017411476"
          placeholder="Long answer"
          className="w-full min-h-[60px]"
        />
      </div>
    </div>
  );
}
