"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import useSWR from "swr";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { formatDistance } from "date-fns";
import { AlertTriangleIcon, CheckCircleIcon } from "@/components/icons";

import Link from "next/link";

interface ServiceData {
  id: number;
  name: string;
  description?: string; // Optional since blank=True in Django
  updated_at: string; // ISO string format
  is_active: boolean; // Assuming this maps to is_active
  monitoring_type: string; // Maps to monitoring_type, could make this an enum or union type if you have defined choices
}

interface ServiceFormValues {
  name: string;
  description: string;
  monitoring_endpoint: string;
  is_active: boolean;
  notification_channel: string[];
  monitoring_type: string;
  periodic_task_id?: string | null;
  periodic_task?: any; // Adjust based on your actual periodic task data structure
}

interface PeriodicTaskOption {
  label: string;
  value: string;
}

export function Services() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";
  const fetcher = (baseUrl: string | URL | Request) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 10 seconds timeout

    return fetch(baseUrl, { signal: controller.signal })
      .then((res) => {
        clearTimeout(timeoutId);
        return res.json();
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          throw new Error("Response timed out");
        }
        throw error;
      });
  };
  let { data, error, isLoading } = useSWR(`${baseUrl}service/`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (isLoading) return <>Loading...</>;
  if (!data)
    return (
      <>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Link
              href={{
                pathname: "https://github.com/AnsonDev42/uptime-monitor",
              }}
            >
              This is a demo, set your own uptime-bot in HERE
            </Link>
          </TableCell>
          <TableCell>
            <AlertTriangleIcon className="w-4 h-4" />
          </TableCell>
        </TableRow>
      </>
    );
  if (error)
    return (
      <>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Error fetching: {error}</TableCell>
          <TableCell>
            <AlertTriangleIcon className="w-4 h-4" />
          </TableCell>
        </TableRow>
      </>
    );

  return (
    <>
      {data.map((service: ServiceData) => (
        <TableRow key={service.id + 3}>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>{service.name}</TableCell>
          <TableCell>{service.monitoring_type}</TableCell>
          <TableCell>
            {formatDistance(new Date(service.updated_at), new Date(), {
              addSuffix: true,
            })}
          </TableCell>
          <TableCell>
            {service.is_active ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <AlertTriangleIcon className="w-4 h-4" />
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
