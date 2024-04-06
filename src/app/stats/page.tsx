"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArrowRightIcon from "@/components/RightArrowIcon";
import Link from "next/link";
import { CurvedLineChart, UptimeRecord } from "@/components/CurveLineChart";
import {
  ApiResponse,
  ChartPoint,
  ChartData,
} from "@/components/CurveLineChart";

const demoChartData: ChartData = {
  id: "Uptime",
  data: [
    { x: "9:30", y: 99.9 },
    { x: "9:35", y: 99.8 },
    { x: "9:40", y: 99.7 },
    { x: "9:45", y: 99.6 },
    { x: "9:50", y: 99.5 },
  ],
};
export default function Page() {
  const [chartData, setChartData] = useState<ChartData>(demoChartData);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/uptime/chart/?service_id=17&time_range=720",
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const jsonResponse = await response.json();
        // parsing the response to summary and records(data points)
        const records: ApiResponse = jsonResponse;
        //  skipping the summary
        const parsedData: ChartPoint[] = records.data.map(
          (record: UptimeRecord) => {
            return {
              x: record.time_start, // Consider formatting this date
              y: record.uptime_percentage,
            };
          },
        );
        setChartData({ id: "uptime", data: parsedData });
      } catch (error) {
        setChartData(demoChartData);
        console.error("Failed to fetch  channels:", error);
        toast.warning(
          "An error occurred: Back-end not detected, you are on demo? ",
          {},
        );
      }
    };
    fetchChartData()
      .then((jsonResponse) => {})
      .catch((error) => {
        setChartData(demoChartData);
      });
  }, []);
  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="grid gap-1">
          <CardTitle className="text-sm">
            <div className="flex items-center gap-2">
              <ArrowRightIcon className="w-6 h-6 opacity-50" />
              <Link className="font-medium" href="/public">
                Back to Monitors
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <h1 className="font-semibold text-3xl">ollama API details</h1>
            <p className="text-gray-500 dark:text-gray-400">
              My ollama API server in my home lab server.
            </p>
          </div>
        </CardContent>

        <Card className="p-0 overflow-hidden">
          <CardContent className="grid gap-4 text-sm p-6">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-semibold">Service Name</div>
              <div>ollama API</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-semibold">Monitoring Method</div>
              <div>PING</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-semibold">Uptime</div>
              <div>99.9%</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-semibold">Response Time</div>
              <div>120ms</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-semibold">Errors</div>
              <div>0</div>
            </div>
          </CardContent>
        </Card>
        <Card className="p-0 overflow-hidden">
          <CardContent className="flex flex-col p-6">
            <h2 className="font-semibold text-lg">Uptime</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Uptime percentage over the last 30 minutes
            </p>
            <CurvedLineChart
              className="w-full aspect-[2/1]"
              chartData={chartData}
            />
          </CardContent>
        </Card>
      </Card>
    </>
  );
}
