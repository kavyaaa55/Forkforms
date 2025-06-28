"use server"
import { NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect"
import Files from "@/models/files"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');
  const slog = file;

  await dbConnect()
  const data = await Files.findOne({ slog })
  if (!data) {
    return new NextResponse('file not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/x-shellscript',
      },
    })
  }

  try {
    return new Response(data.script, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  catch (err) {
    return new NextResponse('#!/bin/bash\n echo "Script not found"', {
      status: 404,
      headers: {
        'Content-Type': 'text/x-shellscript',
      },
    })
  }
}


