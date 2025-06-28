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

export default function TESTFORM4() {
  return (
    <div>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        TESTFORM4
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        may god bless this testing form
      </p>
      <div className="mb-4">
        <Label
          htmlFor="1751101924571"
          className="block text-sm font-medium mb-2"
        >
          Untitled Question
        </Label>
        <Input
          id="1751101924571"
          name="1751101924571"
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
              name="1751101925771"
              value="Option 1"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1" className="text-sm font-normal">
              Option 1
            </Label>
          </div>
          <div key="1751101927482" className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              id="1751101927482"
              name="1751101925771"
              value="Option 2"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1751101927482" className="text-sm font-normal">
              Option 2
            </Label>
          </div>
          <div key="1751101928751" className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              id="1751101928751"
              name="1751101925771"
              value="Option 3"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1751101928751" className="text-sm font-normal">
              Option 3
            </Label>
          </div>
          <div key="1751101929700" className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              id="1751101929700"
              name="1751101925771"
              value="Option 4"
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <Label htmlFor="1751101929700" className="text-sm font-normal">
              Option 4
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
