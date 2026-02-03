
import { NextResponse } from "next/server";
import { loadCSVOnce } from "./utils/csvread";





export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 50);

  const data = loadCSVOnce();

  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json({
    data: data.slice(start, end),
    total: data.length,
    page,
    limit,
  });
}
