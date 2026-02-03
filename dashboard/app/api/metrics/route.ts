import { NextResponse } from "next/server";
import { loadCSVOnce } from "../utils/csvread";

export async function GET() {
  const data = loadCSVOnce();

  const totalVehicles = data.length;

  // Count manufacturers
  const makeCount: { [key: string]: number } = {};
  const modelCount: { [key: string]: number } = {};
  const evTypeCount: { [key: string]: number } = {};
  data.forEach((vehicle) => {
    const make = vehicle.Make;
    const model = vehicle.Model;
    const evType = vehicle["Electric Vehicle Type"];
    if (make) {
      makeCount[make] = (makeCount[make] || 0) + 1;
    }
    if (model) {
      modelCount[model] = (modelCount[model] || 0) + 1;
    }
    if (evType) {
      evTypeCount[evType] = (evTypeCount[evType] || 0) + 1;
    }
  });

  // Get top 10 manufacturers
  const topManufacturers = Object.entries(makeCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([make, count]) => ({ make, count }));

  const totalManufacturers = Object.keys(makeCount).length;
  const totalModels = Object.keys(modelCount).length;
  const totalEVTypes = Object.keys(evTypeCount).length;

  return NextResponse.json({
    totalVehicles,
    totalManufacturers,
    totalModels,
    totalEVTypes,
    topManufacturers,
  });
}
