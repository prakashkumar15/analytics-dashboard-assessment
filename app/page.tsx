"use client";

import { useEffect, useState, useCallback } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, VehicleData } from "@/components/columns";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [data, setData] = useState<VehicleData[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(50);
  const [metrics, setMetrics] = useState<{
    totalVehicles: number;
    totalManufacturers: number;
    totalModels: number;
    totalEVTypes: number;
    topManufacturers: { make: string; count: number }[];
  } | null>(null);
  const [yearlyData, setYearlyData] = useState<
    { year: string; [key: string]: string | number }[]
  >([]);
  const [yearlyTopModels, setYearlyTopModels] = useState<
    { year: string; topModels: { model: string; count: number }[] }[]
  >([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const fetchData = useCallback((currentPage: number, currentLimit: number) => {
    fetch(`/api?page=${currentPage}&limit=${currentLimit}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("API failed");
        }
        return res.json();
      })
      .then((response) => {
        const dataWithSerial = response.data.map(
          (item: VehicleData, index: number) => ({
            ...item,
            serialNumber: (currentPage - 1) * currentLimit + index + 1,
          }),
        );
        setData(dataWithSerial);
        setTotal(response.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit, fetchData]);

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Failed to fetch metrics:", err));
  }, []);

  useEffect(() => {
    fetch("/api/yearly")
      .then((res) => res.json())
      .then((data) => {
        setYearlyData(data.yearlyData);
        setYearlyTopModels(data.yearlyTopModels);
        if (data.yearlyData && data.yearlyData.length > 0) {
          setSelectedYear(data.yearlyData[0].year); // Set to latest year
        }
      })
      .catch((err) => console.error("Failed to fetch yearly data:", err));
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // reset to first page
  };


  return (
    <div className="bg-gray-50">
      <div className="flex justify-between p-4">
        <div className="text-2xl font-bold">Dashboard</div>
      </div>
      <div className="p-4">
        {metrics && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Vehicles</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {metrics.totalVehicles.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  Total Manufacturers
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {metrics.totalManufacturers.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Models</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {metrics.totalModels.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  Electric Vehicle Types
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {metrics.totalEVTypes.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Top 10 Manufacturers
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.topManufacturers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="make" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {yearlyData && yearlyTopModels && (
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Electric Vehicle Types by Year
                  </h3>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearlyData.map((yearData) => (
                        <SelectItem key={yearData.year} value={yearData.year}>
                          {yearData.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={(() => {
                          const selectedYearData = yearlyData.find(
                            (d) => d.year === selectedYear,
                          );
                          if (!selectedYearData) return [];
                          return Object.entries(selectedYearData)
                            .filter(([key]) => key !== "year")
                            .map(([type, value]) => ({
                              name: type,
                              value,
                            }));
                        })()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {(() => {
                          const selectedYearData = yearlyData.find(
                            (d) => d.year === selectedYear,
                          );
                          if (!selectedYearData) return [];
                          return Object.entries(selectedYearData)
                            .filter(([key]) => key !== "year")
                            .map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  [
                                    "#0088FE",
                                    "#00C49F",
                                    "#FFBB28",
                                    "#FF8042",
                                    "#8884D8",
                                  ][index % 5]
                                }
                              />
                            ));
                        })()}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Top 10 Models for {selectedYear}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto hide-scrollbar">
                  {(() => {
                    const selectedYearModels = yearlyTopModels.find(
                      (d) => d.year === selectedYear,
                    );
                    if (!selectedYearModels) return null;
                    return selectedYearModels.topModels.map(
                      (modelData, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <span className="font-medium">
                              {modelData.model}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {modelData.count} vehicles
                          </span>
                        </div>
                      ),
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
        <DataTable
          columns={columns}
          data={data}
          currentPage={page}
          totalPages={Math.ceil(total / limit)}
          onPageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          limit={limit}
        />
      </div>
    </div>
  );
}
