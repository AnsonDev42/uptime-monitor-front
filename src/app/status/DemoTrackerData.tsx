import { Card, Tracker } from "@tremor/react";
import React from "react";
import { TrackerData } from "@/components/Tracker";

export default function GenerateMockData(): {} {
  const services = [
    {
      name: "Service A",
      uptime: 99.9,
      statuses: [
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
      ],
    },
    {
      name: "Service B",
      uptime: 95.2,
      statuses: [
        "Down",
        "Down",
        "Maintenance",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
      ],
    },
    {
      name: "Service C",
      uptime: 97.5,
      statuses: [
        "Degraded",
        "Operational",
        "Maintenance",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
        "Operational",
      ],
    },
  ];

  // Convert to the required format for TrackerBatchData
  const formattedData = {};
  services.forEach((service) => {
    // @ts-ignore
    formattedData[service.name] = {
      uptime_percentage: service.uptime,
      status: service.statuses,
    };
  });

  return formattedData;
}

const data: TrackerData[] = [
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "rose", tooltip: "Downtime" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "gray", tooltip: "Maintenance" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "yellow", tooltip: "Degraded" },
  { color: "emerald", tooltip: "Operational" },
];

export function TrackerUsageExample() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";

  return (
    <Card className="mx-auto max-w-lg">
      <p className="text-tremor-default flex items-center justify-between">
        <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          {baseUrl}
        </span>
        <span className="text-tremor-content dark:text-dark-tremor-content">
          uptime 99.1%
        </span>
      </p>
      <Tracker data={data} className="mt-2" />
      <p className="text-tremor-default flex items-center justify-between">
        <span className="text-tremor-content-strong dark:text-dark-tremor-content font-medium">
          30 days ago
        </span>
        <span className="text-tremor-content dark:text-dark-tremor-content">
          Today
        </span>
      </p>
    </Card>
  );
}
