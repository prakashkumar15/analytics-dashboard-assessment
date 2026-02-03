"use client";

import { ColumnDef } from "@tanstack/react-table";

export type VehicleData = {
  serialNumber: number;
  "Model Year": string;
  "Electric Range": string;
  Make: string;
  Model: string;
  State: string;
};

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "serialNumber",
    header: "S.No",
  },
  {
    accessorKey: "Model Year",
    header: "Model Year",
  },
  {
    accessorKey: "Make",
    header: "Manufacturer",
  },
  {
    accessorKey: "Model",
    header: "Model",
  },
  {
    accessorKey: "Electric Range",
    header: "Electric Range(miles)",
    cell: ({ row }) => {
      const range = parseFloat(row.getValue("Electric Range") as string);
      return <div>{range} </div>;
    },
  },
  {
    accessorKey: "State",
    header: "State",
  },
];
