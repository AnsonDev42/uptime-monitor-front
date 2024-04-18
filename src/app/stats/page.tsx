"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArrowRightIcon from "@/components/RightArrowIcon";
import Link from "next/link";
import { CurvedLineChart, ServiceSummary } from "@/components/CurveLineChart";
import { demoSummaryData } from "@/app/stats/DemoChartData";
import { ServiceOverViewCard } from "@/components/ServiceOverViewCard";
import { PopUpFormWrapper } from "@/components/service-form";
import { useSearchParams } from "next/navigation";
import { useServiceData } from "@/hooks/useServiceData";
import { useExistingServiceSettings } from "@/hooks/useExistingServiceSettings";

export default function Page() {
  useState<ServiceSummary>(demoSummaryData);
  const searchParams = useSearchParams();
  const serviceId: string = searchParams.get("service_id") as string;
  const { existingService } = useExistingServiceSettings(serviceId);
  const { chartData, summaryData, error } = useServiceData(serviceId);

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
          <CardContent className="flex flex-col  p-6">
            {/* First row with Uptime and Edit Service */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Uptime</h2>
              <div>
                <PopUpFormWrapper
                  buttonTitle="Edit Service"
                  buttonDescription=""
                  existingService={existingService}
                />
              </div>
            </div>
            {/* Second row with description */}
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
