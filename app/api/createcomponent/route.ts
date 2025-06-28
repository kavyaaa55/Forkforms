
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import { Buffer } from "buffer";
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

// GitHub API function to create/update file
async function pushToGitHub(fileName: string, content: string) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER; // Your GitHub username
  const GITHUB_REPO = process.env.GITHUB_REPO; // Your repository name
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"; // Default to main branch

  // Log environment variables (ensure they are loaded correctly)
  console.log("GitHub Config:");
  console.log(`  Owner: ${GITHUB_OWNER}`);
  console.log(`  Repo: ${GITHUB_REPO}`);
  console.log(`  Branch: ${GITHUB_BRANCH}`);
  // IMPORTANT: Do NOT log GITHUB_TOKEN directly in production due to security risks.
  // For debugging, you can check its presence:
  console.log(`  Token present: ${!!GITHUB_TOKEN}`);


  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error("GitHub credentials not configured. Please ensure GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO are set in your environment variables.");
  }

  const filePath = `generated-forms/${fileName}`; // Path where the file will be created/updated in your GitHub repo

  try {
    // Check if file already exists to get its SHA (required for updates)
    let sha: string | undefined;
    console.log(`Checking if file exists: ${filePath}`);
    try {
      const existingFileResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json();
        sha = existingFile.sha;
        console.log(`File exists. SHA: ${sha}`);
      } else {
        // Log the status and response text if file doesn't exist but the response wasn't 404
        const errorText = await existingFileResponse.text();
        console.log(`File check failed with status ${existingFileResponse.status}: ${errorText}`);
        if (existingFileResponse.status === 404) {
          console.log("File does not exist, proceeding with creation.");
        } else {
          console.error(`Unexpected response when checking for existing file: ${errorText}`);
        }
      }
    } catch (error) {
      console.log("File doesn't exist or an error occurred during check, proceeding to create new file. Error:", error);
    }

    const encodedContent = Buffer.from(content).toString("base64");
    const commitMessage = `Add generated form component: ${fileName}`;

    const putBody = {
      message: commitMessage,
      content: encodedContent,
      branch: GITHUB_BRANCH,
      ...(sha && { sha }), // Include SHA only if file exists (for updates)
    };

    console.log("Attempting to push to GitHub with body:", JSON.stringify(putBody, null, 2));


    // Create or update the file
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(putBody),
      }
    );

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json(); // Try to parse as JSON first
      } catch (e) {
        errorData = await response.text(); // Fallback to text if not JSON
      }
      console.error(`GitHub API error details (status: ${response.status}):`, errorData);
      throw new Error(`GitHub API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log("Successfully pushed to GitHub:", result);
    return {
      success: true,
      url: result.content.html_url,
      downloadUrl: result.content.download_url,
    };
  } catch (error) {
    console.error("Error pushing to GitHub:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
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
    const formattedFinalString = await prettier.format(finalstring, {
      parser: "typescript"
    });

    // Generate file name
    const timestamp = Date.now();
    const fileName = `${componentName}.tsx`;

    // Save locally
    const outputDir = path.join(process.cwd(), "generated-forms");
    const filePath = path.join(outputDir, fileName);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(filePath, formattedFinalString, "utf-8");

    console.log(`File saved locally: ${filePath}`);

    // Push to GitHub
    const githubResult = await pushToGitHub(fileName, formattedFinalString);

    return Response.json({
      message: "File created and pushed to GitHub successfully",
      fileName,
      localFilePath: filePath,
      github: {
        success: githubResult.success,
        url: githubResult.url,
        downloadUrl: githubResult.downloadUrl,
      },
      data,
    });

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
