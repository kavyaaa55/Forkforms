import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prettier from "prettier";

import Checkboxtemp from "@/components/checkboxtemp";
import Dropdowntemp from "@/components/dropdowntemp";
import Multiplechoicetemp from "@/components/multiplechoicetemp";
import Paragraphtemp from "@/components/paragraphtemp";
import Shortanswertemp from "@/components/shortanswertemp";

function formatString(str: string) {
  if (!str) return "";
  const noSpaces = str.replace(/\s+/g, "");
  return noSpaces.charAt(0).toUpperCase() + noSpaces.slice(1);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const questions = data.questions || [];
  const componentName = formatString(data.title || "FormComponent");

  let maincontent = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    if (question.type === "paragraph") {
      maincontent += Paragraphtemp(question);
    } else if (question.type === "short-answer") {
      maincontent += Shortanswertemp(question);
    } else if (question.type === "multiple-choice") {
      maincontent += Multiplechoicetemp(question);
    } else if (question.type === "checkboxes") {
      maincontent += Checkboxtemp(question);
    } else if (question.type === "dropdown") {
      maincontent += Dropdowntemp(question);
    }
  }

  const startcontent = `"use client";

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

export default function ${componentName}() {
  return (
    <div>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>${data.title || ""}</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>${data.description || ""}</p>
`;

  const endcontent = `
    </div>
  )
}
`;

  const finalstring = startcontent + maincontent + endcontent;

  // Format using Prettier for TSX
  const formattedFinalString = await prettier.format(finalstring, { parser: "typescript" });

  // Always use .tsx extension
  const timestamp = Date.now();
  const fileName = `${componentName}_${timestamp}.tsx`;
  const outputDir = path.join(process.cwd(), "generated-forms");
  const filePath = path.join(outputDir, fileName);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(filePath, formattedFinalString, "utf-8");

  return Response.json({
    message: "File created",
    fileName,
    filePath,
    data,
  });
}

export async function GET() {
  return Response.json({ message: "method not allowed" }, { status: 405 });
}
