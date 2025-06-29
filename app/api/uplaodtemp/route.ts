
import { promises as fs } from "fs";
import path from "path";
import dbConnect from "@/lib/dbConnect"
import Files from "@/models/files"

export async function POST() {
  try {
    await dbConnect();

    const templateDir = path.join(process.cwd(), "templates");
    const files = await fs.readdir(templateDir);
    const tsxFiles = files.filter(f => f.endsWith(".tsx"));

    for (const file of tsxFiles) {
      const fullPath = path.join(templateDir, file);
      const content = await fs.readFile(fullPath, "utf-8");

      const slog = file;

      const existing = await Files.findOne({ slog });

      if (existing) {
        await Files.updateOne({ slog }, { script: content });
      } else {
        await Files.create({ slog, script: content });
      }
    }

    return Response.json({ message: "All templates uploaded!" });
  } catch (err) {
    console.error(err);
    return Response.json({ err }, { status: 500 });
  }
}
