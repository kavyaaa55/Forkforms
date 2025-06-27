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

export default function Testform1() {
  return (
    <div>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        testform1
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}></p>
      <div className="mb-4">
        <Label
          htmlFor="1751007418555"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Input
          id="1751007418555"
          name="1751007418555"
          placeholder="Short answer"
          className="w-full"
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
              name="1751007420691"
              value="Option 1"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1" className="text-sm font-normal">
              Option 1
            </Label>
          </div>
          <div key="1751007422726" className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              id="1751007422726"
              name="1751007420691"
              value="Option 2"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1751007422726" className="text-sm font-normal">
              Option 2
            </Label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Label
          htmlFor="1751007423995"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <select
          id="1751007423995"
          name="1751007423995"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an option</option>
          <option value="Option 1">Option 1</option>
        </select>
      </div>
    </div>
  );
}
