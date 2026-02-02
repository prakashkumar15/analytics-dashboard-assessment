"use client";

import { ColumnDef } from "@tanstack/react-table";

export type VehicleData = {
  "Model Year": string;
  "Electric Range": string;
  Make: string;
  Model: string;
  State: string;
};

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "Model Year",
    header: "Model Year",
  },
  {
    accessorKey: "Make",
    header: "Make",
  },
  {
    accessorKey: "Model",
    header: "Model",
  },
  {
    accessorKey: "Electric Range",
    header: "Electric Range",
    cell: ({ row }) => {
      const range = parseFloat(row.getValue("Electric Range") as string);
      return <div>{range} miles</div>;
    },
  },
  {
    accessorKey: "State",
    header: "State",
  },
];
