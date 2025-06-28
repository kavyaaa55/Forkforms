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

export default function Kfasjdljkquiowefjkaknckjkl() {
  return (
    <div>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        kfasjdl jkquiowefjkaknckjkl
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}></p>
      <div className="mb-4">
        <Label
          htmlFor="1751020218791"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Textarea
          id="1751020218791"
          name="1751020218791"
          placeholder="Long answer"
          className="w-full min-h-[60px]"
        />
      </div>
      <div className="mb-4">
        <Label className="block text-sm font-medium mb-3">
          Untitled Question
        </Label>
        <div className="space-y-2">
          <div key="1" className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id="1"
              name="1751020220331"
              value="Option 1"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <Label htmlFor="1" className="text-sm font-normal">
              Option 1
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
