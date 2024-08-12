import { useEffect, useState } from "react";
import {
  ChartData,
  ChartPoint,
  ServiceSummary,
  UptimeRecord,
} from "@/components/CurveLineChart";
import { demoChartData, demoSummaryData } from "@/app/stats/DemoChartData";
import { toast } from "sonner";

export function useServiceData(serviceId: string) {
  const [chartData, setChartData] = useState<ChartData>(demoChartData);
  const [summaryData, setSummaryData] =
    useState<ServiceSummary>(demoSummaryData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/uptime/chart/?service_id=${serviceId}&time_range=1`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) console.error("Failed to fetch data");
        const jsonResponse = await response.json();
        let monitoringType = "N/A";

        // setSummaryData(jsonResponse.summary);
        // try {
        //   monitoringType = jsonResponse.summary.monitoring_type.toUpperCase();
        // } catch (e) {
        //   console.error(e);
        // }
        setSummaryData((summaryData) => ({
          ...summaryData,
          monitoring_type: summaryData.monitoring_type.toUpperCase(),
        }));
        const parsedData: ChartPoint[] = jsonResponse.data.map(
          (record: UptimeRecord) => ({
            x: record.time_start, // Consider formatting this date
            y: record.uptime_percentage,
          }),
        );
        setChartData({ id: "uptime", data: parsedData });
      } catch (e) {
        setError("An error occurred: Back-end not detected, you are on demo?");
        setChartData(demoChartData);
        setSummaryData(demoSummaryData);
        console.error("Failed to fetch data:", e);
        toast.warning(e as string, {});
      }
    }

    fetchChartData();
  }, [serviceId]);

  return { chartData, summaryData, error };
}
