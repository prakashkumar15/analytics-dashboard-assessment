import fs from "fs";
import path from "path";
import Papa from "papaparse";
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

export function loadCSVOnce(): Vehicle[] {
  if (VEHICLES) return VEHICLES;

  const filePath = path.join(
    process.cwd(),
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
