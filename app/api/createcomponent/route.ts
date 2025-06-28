
import dbConnect from "@/lib/dbConnect"
import Files from "@/models/files"

import { NextRequest } from "next/server";
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

function generateRandomString() {
  return Math.random().toString(36).substring(2, 9);
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const questions = data.questions || [];
    //let componentName = (data.title || "FormComponent").replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
    //componentName = componentName + `_${generateRandomString()}`;

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
      maincontent += `<div style={{ height: "1.5rem" }}></div>\n`;
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
    const formattedFinalString = await prettier.format(finalstring, {
      parser: "typescript"
    });

    try {
      const slog = componentName
      const script = formattedFinalString;
      await dbConnect()
      const old = await Files.findOne({ slog })
      if (old) {
        await Files.updateOne({ slog }, { slog, script })
      }
      else {
        await Files.create({ slog, script })
      }

      return Response.json({
        message: "File created ",
        componentName,
      });

    }
    catch (err) {
      return Response.json({ success: false }, { status: 400 })
    }

  } catch (error) {
    console.error("Error in POST handler:", error);

    return Response.json(
      {
        error: "Failed to create and push file",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: "Method not allowed" }, { status: 405 });
}
