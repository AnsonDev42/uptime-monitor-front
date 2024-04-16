"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArrowRightIcon from "@/components/RightArrowIcon";
import Link from "next/link";
import {
  ApiResponse,
  ChartData,
  ChartPoint,
  CurvedLineChart,
  ServiceSummary,
  UptimeRecord,
} from "@/components/CurveLineChart";
import { demoChartData, demoSummaryData } from "@/app/stats/DemoChartData";
import { ServiceOverViewCard } from "@/components/ServiceOverViewCard";

export default function Page() {
  const [chartData, setChartData] = useState<ChartData>(demoChartData);
  const [summaryData, setSummaryData] =
    useState<ServiceSummary>(demoSummaryData);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/uptime/chart/?service_id=17&time_range=1",
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonResponse = await response.json();
        // parsing the response to summary and records(data points)
        const records: ApiResponse = jsonResponse;
        //  skipping the summary
        setSummaryData(records.summary);
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
        setSummaryData(demoSummaryData);
        console.error("Failed to fetch  channels:", error);
        toast.warning(
          "An error occurred: Back-end not detected, you are on demo? ",
          {},
        );
      }
    };
    fetchChartData()
      .then((jsonResponse) => {
        // setChartData({ id: "uptime", data: parsedData });
      })
      .catch((error) => {
        setChartData(demoChartData);
        setSummaryData(demoSummaryData);
      });
  }, []);
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
        <ServiceOverViewCard data={summaryData} />
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
