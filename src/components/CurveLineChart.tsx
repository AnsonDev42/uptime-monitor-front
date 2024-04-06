"use client";
import { ResponsiveLine, Serie } from "@nivo/line";
import React, { useEffect, useState } from "react";

export interface ApiResponse {
  summary: UptimeSummary; // Adjust this based on the actual structure of your summary
  data: UptimeRecord[];
}

export interface UptimeSummary {
  uptime_percentage: number;
}

export interface UptimeRecord {
  uptime_percentage: number;
  average_response_time: number;
  time_start: string;
}

export interface ChartPoint {
  x: string;
  y: number;
}

export interface ChartData {
  id: string;
  data: ChartPoint[];
}

export function CurvedLineChart({
  className,
  chartData,
}: {
  className: string;
  chartData: ChartData;
}) {
  return (
    <div className={className}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: chartData.data,
            //     [
            //   { x: "09:40", y: 0 },
            //   { x: "09:45", y: 20 },
            //   { x: "09:50", y: 30 },
            //   { x: "09:55", y: 25 },
            //   { x: "10:00", y: 20 },
            //   { x: "10:05", y: 30 },
            //   { x: "10:10", y: 0 },
            // ],
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
