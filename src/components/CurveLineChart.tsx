"use client";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

export interface ServiceSummary {
  service_name: string;
  monitoring_method: string;
  average_response_time: number;
  uptime_percentage: number;
  errors: number;
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
          },
        ]}
        enablePointLabel
        enableTouchCrosshair
        margin={{ top: 25, right: 20, bottom: 40, left: 60 }}
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
          legend: "Time",
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
          legend: "Uptime Percentage (%)",
          legendOffset: -40,
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
              color: "red",
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
