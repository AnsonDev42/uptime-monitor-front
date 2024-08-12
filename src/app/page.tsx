"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { MonitorIcon } from "@/components/icons";
import { PopUpFormWrapper } from "@/components/ServiceForm";
import { DemoData } from "@/app/DemoData";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { TrackerUsageExample } from "@/app/status/DemoTrackerData";
import { buttonVariants } from "@/components/ui/button";

// const Services = dynamic(
//   () =>
//     import("@/components/Service").then((module) => ({
//       default: module.Services,
//     })),
//   { ssr: false },
// );
//
export default function Home() {
  const Services = dynamic(
    () =>
      import("@/components/Service").then((module) => ({
        default: module.Services,
      })),
    { ssr: false },
  );
  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="grid gap-1">
          <CardTitle>Uptime Monitor</CardTitle>

          <CardDescription>
            Monitoring the availability of various services
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <TrackerUsageExample />

          <div className="grid gap-1 text-center">
            <div className="grid gap-1 text-center">
              <div className="font-semibold">
                <Link
                  href="/status"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Status Page
                </Link>
                <div className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                  Publish your service status page
                </div>
              </div>
            </div>
            {/*<div className="font-semibold">Add Service</div>*/}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row justify-between items-center">
          <span className="flex flex-row gap-2">
            <MonitorIcon className="w-6 h-6" />
            <CardTitle>Monitors</CardTitle>
          </span>
          <div className="mr-3">
            <PopUpFormWrapper
              buttonTitle={"Add Service"}
              buttonDescription={"Start monitoring a new service"}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Service</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Last Check</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <DemoData />
              <Suspense fallback={<>Loading...</>}>
                <Services />
              </Suspense>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/*add some vertical distance between */}
      <div className="h-6" />
      <div className="justify-center items-center content-center text-center self-center">
        <Separator className="flex-auto max-w-sm mx-auto  mb-4" />
        <div className=" justify-center flex h-4 items-center space-x-4 text-center content-center  text-sm">
          <Link href="https://github.com/AnsonDev42/uptime-monitor">
            Self Host
          </Link>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <Link href="https://github.com/AnsonDev42/uptime-monitor-front">
            GitHub
          </Link>
        </div>
      </div>
    </>
  );
}
