"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import React, { useEffect, useState } from "react";
import { DemoNotificationData } from "@/app/demo-data";
import { toast } from "sonner";

export default function ServiceDetails() {
  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="grid gap-1">
          <CardTitle className="text-sm">
            <div className="flex items-center gap-2">
              <ArrowRightIcon className="w-6 h-6 opacity-50" />
              <Link className="font-medium" href="/">
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
            <CurvedlineChart className="w-full aspect-[2/1]" />
          </CardContent>
        </Card>
      </Card>
    </>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface ApiResponse {
  summary: UptimeSummary; // Adjust this based on the actual structure of your summary
  data: UptimeRecord[];
}

interface UptimeSummary {
  uptime_percentage: number;
}

interface UptimeRecord {
  uptime_percentage: number;
  average_response_time: number;
  time_start: string;

  // Add any other properties you might need from your data
}

interface ChartPoint {
  x: string;
  y: number;
}

const demoChartData: ChartPoint[] = [
  { x: "09:45", y: 20 },
  { x: "09:50", y: 30 },
  { x: "09:55", y: 25 },
  { x: "10:00", y: 20 },
  { x: "10:05", y: 30 },
  { x: "10:10", y: 0 },
];

function CurvedlineChart(props: any) {
  const [chartData, setChartData] = useState<
    { id: string; data: ChartPoint[] }[]
  >([
    {
      id: "",
      data: [],
    },
  ]);
  useEffect(() => {
    let parsedData: ChartPoint[] = demoChartData;
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/uptime/chart/?service_id=17&time_range=720",
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const jsonResponse = await response.json();
        // parsing the response to summary and records(data points)
        const records = jsonResponse;
        //  skipping the summary
        const parsedData = records.data.map((record: UptimeRecord) => {
          return {
            x: record.time_start, // Consider formatting this date
            y: record.uptime_percentage,
          };
        });
        setChartData([
          {
            id: "Uptime",
            data: parsedData,
          },
        ]);
      } catch (error) {
        setChartData([{ id: "Uptime", data: demoChartData }]);
        console.error("Failed to fetch  channels:", error);
        toast.warning(
          "An error occurred: Back-end not detected, you are on demo ",
          {},
        );
      }
    };
    fetchChartData()
      .then((jsonResponse) => {})
      .catch((error) => {
        setChartData([{ id: "Uptime", data: demoChartData }]);
      });
  }, []);

  return (
    <div {...props}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function CurvedlineChartDemo(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              // {x:current-time-10min, y: 0},
              { x: "09:40", y: 0 },
              { x: "09:45", y: 20 },
              { x: "09:50", y: 30 },
              { x: "09:55", y: 25 },
              { x: "10:00", y: 20 },
              { x: "10:05", y: 30 },
              { x: "10:10", y: 0 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
