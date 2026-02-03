import { NextResponse } from "next/server";
import { loadCSVOnce } from "../utils/csvread";

export async function GET() {
  const data = loadCSVOnce();

  // Group by year and electric vehicle type
  const yearlyData: { [year: string]: { [type: string]: number } } = {};
  const yearlyModels: { [year: string]: { [model: string]: number } } = {};

  data.forEach((vehicle) => {
    const year = vehicle["Model Year"];
    const type = vehicle["Electric Vehicle Type"];
    const model = vehicle.Model;
    const make = vehicle.Make;

    if (year && type) {
      if (!yearlyData[year]) {
        yearlyData[year] = {};
      }
      yearlyData[year][type] = (yearlyData[year][type] || 0) + 1;
    }

    if (year && model && make) {
      if (!yearlyModels[year]) {
        yearlyModels[year] = {};
      }
      const modelKey = `${model}-${make}`;
      yearlyModels[year][modelKey] = (yearlyModels[year][modelKey] || 0) + 1;
    }
  });

  // Convert to array format for easier charting
  const yearlyChartData = Object.entries(yearlyData)
    .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort by year descending
    .map(([year, types]) => ({
      year,
      ...types,
    }));

  // Get top 10 models for each year
  const yearlyTopModels = Object.entries(yearlyModels)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .map(([year, models]) => ({
      year,
      topModels: Object.entries(models)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([model, count]) => ({ model, count })),
    }));

  return NextResponse.json({
    yearlyData: yearlyChartData,
    yearlyTopModels,
  });
}
