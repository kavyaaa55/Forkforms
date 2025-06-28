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

export default function TESTfrom102() {
  return (
    <div>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        TESTfrom102
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        this is a test form
      </p>
      <div className="mb-4">
        <Label
          htmlFor="1751017000522"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Input
          id="1751017000522"
          name="1751017000522"
          placeholder="Short answer"
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="1751017001872"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Textarea
          id="1751017001872"
          name="1751017001872"
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
              type="radio"
              id="1"
              name="1751017003230"
              value="Option 1"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1" className="text-sm font-normal">
              Option 1
            </Label>
          </div>
        </div>
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
              name="1751017004564"
              value="Option 1"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <Label htmlFor="1" className="text-sm font-normal">
              Option 1
            </Label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Label
          htmlFor="1751017005855"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <select
          id="1751017005855"
          name="1751017005855"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an option</option>
          <option value="Option 1">Option 1</option>
        </select>
      </div>
    </div>
  );
}
