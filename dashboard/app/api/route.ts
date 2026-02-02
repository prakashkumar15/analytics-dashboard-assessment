import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { NextResponse } from "next/server";

export interface Vehicle {
  "VIN (1-10)": string;
  County: string;
  City: string;
  State: string;
  "Postal Code": string;
  "Model Year": string;
  Make: string;
  Model: string;
  "Electric Vehicle Type": string;
  "Clean Alternative Fuel Vehicle (CAFV) Eligibility": string;
  "Electric Range": string;
  "Base MSRP": string;
  "Legislative District": string;
  "DOL Vehicle ID": string;
  "Vehicle Location": string;
  "Electric Utility": string;
  "2020 Census Tract": string;
}

let VEHICLES: Vehicle[] | null = null;

function loadCSVOnce(): Vehicle[] {
  if (VEHICLES) return VEHICLES;

  const filePath = path.join(
    process.cwd(),
    "..",
    "data-to-visualize",
    "Electric_Vehicle_Population_Data.csv",
  );

  const file = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse<Vehicle>(file, {
    header: true,
    skipEmptyLines: true,
  });

  VEHICLES = parsed.data;

  return VEHICLES;
}

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
