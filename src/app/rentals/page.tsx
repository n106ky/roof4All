/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";

type Props = {};
type Payment = {
  id: string;
  propertyTitle: string;
  rentDate: string;
  rentDue: string;
  spaceRented: string;
  allocated: string;
  price_per_space: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "propertyTitle",
    header: "Property Title",
  },
  {
    accessorKey: "rentDate",
    header: "Rent Date",
  },
  {
    accessorKey: "rentDue",
    header: "Rent Due",
  },
  {
    accessorKey: "spaceRented",
    header: "Space Rented",
  },
  {
    accessorKey: "allocated",
    header: "Allocated",
  },
  {
    accessorKey: "price_per_space",
    header: "Price per space",
  },
];

const data: Payment[] = [
  {
    id: "00012",
    propertyTitle: "Spacious near stop room",
    rentDate: "3/4/2024",
    rentDue: "3/3/2025",
    spaceRented: "2",
    allocated: "0/2",
    price_per_space: "$ 650",
  },
  {
    id: "00013",
    propertyTitle: "Cozy downtown flat",
    rentDate: "5/6/2024",
    rentDue: "5/5/2025",
    spaceRented: "1",
    allocated: "1/1",
    price_per_space: "$ 1200",
  },
  {
    id: "00014",
    propertyTitle: "Modern loft",
    rentDate: "7/2/2024",
    rentDue: "7/1/2025",
    spaceRented: "3",
    allocated: "1/3",
    price_per_space: "$ 800",
  },
  {
    id: "00015",
    propertyTitle: "Lakeview house",
    rentDate: "8/15/2024",
    rentDue: "8/14/2025",
    spaceRented: "2",
    allocated: "2/2",
    price_per_space: "$ 950",
  },
  {
    id: "00016",
    propertyTitle: "Suburban bungalow",
    rentDate: "9/10/2024",
    rentDue: "9/9/2025",
    spaceRented: "4",
    allocated: "2/4",
    price_per_space: "$ 700",
  },
  {
    id: "00017",
    propertyTitle: "Studio apartment central",
    rentDate: "11/1/2024",
    rentDue: "10/31/2025",
    spaceRented: "1",
    allocated: "0/1",
    price_per_space: "$ 1000",
  },
  {
    id: "00018",
    propertyTitle: "Vintage charm flat",
    rentDate: "1/5/2024",
    rentDue: "1/4/2025",
    spaceRented: "2",
    allocated: "1/2",
    price_per_space: "$ 750",
  },
  {
    id: "00019",
    propertyTitle: "City high-rise suite",
    rentDate: "2/20/2024",
    rentDue: "2/19/2025",
    spaceRented: "2",
    allocated: "2/2",
    price_per_space: "$ 1100",
  },
];

export default function listingsPage({}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="My Rentals" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
