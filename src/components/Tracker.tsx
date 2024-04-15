import { Card, Tracker, type Color } from "@tremor/react";
import useSWR from "swr";
import React from "react";
import GenerateMockData from "@/app/status/DemoTrackerData";
import { toast } from "sonner";

// one day (data point) of a tracker data; a track normally have 30 days of data
export interface TrackerData {
  color: Color;
  tooltip: string;
}

// a service with its last 30days status and uptime
interface ServiceData {
  [key: string]: {
    uptime_percentage: number;
    status: string[];
  };
}

// Utility function to map status to color and tooltip
function statusToTracker(status: string[]): TrackerData[] {
  return status.map((s) => {
    switch (s) {
      case "Operational":
        return { color: "emerald", tooltip: "Operational" };
      case "Down":
        return { color: "rose", tooltip: "Downtime" };
      case "Degraded":
        return { color: "yellow", tooltip: "Degraded" };
      case "Maintenance":
        return { color: "gray", tooltip: "Maintenance" };
      default:
        return { color: "gray", tooltip: "Unknown status" };
    }
  });
}

export function BuildATracker(
  serviceName: string,
  uptime_percentage: number,
  status: string[],
): React.JSX.Element {
  const trackerData = statusToTracker(status);

  return (
    <Card className="mx-auto max-w-lg">
      <p className="text-tremor-default flex items-center justify-between">
        <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          {serviceName}
        </span>
        <span className="text-tremor-content dark:text-dark-tremor-content">
          uptime {uptime_percentage.toFixed(2)}%
        </span>
      </p>
      <Tracker data={trackerData} className="mt-2" />
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

// build multiple trackers from the data fetched from the server(trackerAPI)
export function TrackerBatchData() {
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
  let { data, error, isLoading } = useSWR(
    `${baseUrl}uptime/trackers/`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const demoData = GenerateMockData();
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    data = demoData;
    toast.warning(
      `An error occurred:Error fetching data: ${error.toString()}. Are you on demo? `,
      {},
    );
  }
  if (!data) return <p>No data available</p>;

  return (
    <>
      {Object.entries(data as ServiceData).map(
        ([serviceName, serviceDetails]) =>
          BuildATracker(
            serviceName,
            serviceDetails.uptime_percentage,
            serviceDetails.status,
          ),
      )}
    </>
  );
}
