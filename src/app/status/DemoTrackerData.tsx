import { Card, Tracker } from "@tremor/react";
import React from "react";
import { BuildATracker, TrackerData } from "@/components/Tracker";

export default function GenerateMockData() {
  const services = [
    { name: "Service A", uptime: 99.9, statuses: [] },
    { name: "Service B", uptime: 95.2, statuses: [] },
    { name: "Service C", uptime: 97.5, statuses: [] },
  ];

  // Helper function to generate status array based on probabilities
  function generateStatuses() {
    const statuses = [];
    const totalStatuses = 30;
    for (let i = 0; i < totalStatuses; i++) {
      const rand = Math.random() * 100;
      if (rand < 75) {
        statuses.push("Operational");
      } else if (rand < 90) {
        // 70-90
        statuses.push("Degraded");
      } else {
        // 90-100
        statuses.push("Maintenance");
      }
    }
    return statuses;
  }

  // Convert to the required format for TrackerBatchData
  const formattedData = {};
  services.forEach((service) => {
    // @ts-ignore
    service.statuses = generateStatuses();
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
  const demoData = GenerateMockData();

  return BuildATracker(
    "Service A",
    // @ts-ignore
    demoData["Service A"].uptime_percentage,
    // @ts-ignore
    demoData["Service A"].status,
  );
}
