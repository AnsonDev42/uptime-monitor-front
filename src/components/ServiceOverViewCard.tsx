import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { ServiceSummary } from "@/components/CurveLineChart";

export function ServiceOverViewCard({ data }: { data: ServiceSummary }) {
  return (
    <>
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
            <div>{data.service_name}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-semibold">Monitoring Method</div>
            <div>{data.monitoring_method}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-semibold">Uptime</div>
            <div>{data.uptime_percentage}%</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-semibold">Response Time</div>
            <div>{data.average_response_time}ms</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-semibold">Errors</div>
            <div>{data.errors}</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
