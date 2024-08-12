import { ChartData, ServiceSummary } from "@/components/CurveLineChart";

export const demoChartData: ChartData = {
  id: "Uptime",
  data: [
    { x: "9:30", y: 99.9 },
    { x: "9:35", y: 99.8 },
    { x: "9:40", y: 99.7 },
    { x: "9:45", y: 88.6 },
    { x: "9:50", y: 99.5 },
  ],
};

export const demoSummaryData: ServiceSummary = {
  service_name: "ollama API",
  monitoring_type: "PING",
  average_response_time: 120,
  uptime_percentage: 99.9,
  errors: 1,
};
