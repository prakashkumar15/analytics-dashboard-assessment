"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, VehicleData } from "@/components/columns";

export default function Home() {
  const [data, setData] = useState<VehicleData[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(50);

  const fetchData = (currentPage: number, currentLimit: number) => {
    fetch(`/api?page=${currentPage}&limit=${currentLimit}`)
      .then(async (res) => {
        console.log("API response status:", res.status);
        if (!res.ok) {
          throw new Error("API failed");
        }
        return res.json();
      })
      .then((response) => {
        setData(response.data);
        setTotal(response.total);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // reset to first page
  };

  console.log("Rendered Home with data:", data);

  return (
    <div className="container mx-auto">
      <h2>Electric Vehicles Over Years</h2>
      <div className="flex items-center py-4">
        <label htmlFor="limit-select" className="mr-2">
          Rows per page:
        </label>
        <select
          id="limit-select"
          value={limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <DataTable
        columns={columns}
        data={data}
        currentPage={page}
        totalPages={Math.ceil(total / limit)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
