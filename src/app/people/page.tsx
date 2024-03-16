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
  name: string;
  employeeRole: string;
  branch: string;
  status: string;
  assigned_on: string;
  img_url: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10 rounded-full" // You can add 'rounded-full' for round images
            src={row.original.img_url} // Access img_url directly from the row's original data
            alt={`${row.original.name}'s avatar`}
          />
          <p>{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "employeeRole",
    header: "Role",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assigned_on",
    header: "Assigned on",
  },
];

const data: Payment[] = [
  {
    name: "Naomi Ran",
    employeeRole: "Clerical",
    branch: "Yonge",
    status: "Unallocated",
    assigned_on: "3/5/2024",
    img_url:
      "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ethan Stowe",
    employeeRole: "Manager",
    branch: "Dundas",
    status: "Allocated",
    assigned_on: "6/12/2024",
    img_url:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Olivia Smith",
    employeeRole: "Sales",
    branch: "Bloor",
    status: "Pending",
    assigned_on: "5/22/2024",
    img_url:
      "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amelia Earhart",
    employeeRole: "Pilot",
    branch: "Airport",
    status: "Allocated",
    assigned_on: "7/30/2024",
    img_url:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function listingsPage({}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="My People" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
