"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BugIcon } from "@/components/BugIcon";
import { HomeIcon } from "@/components/HomeIcon";
import { CalendarIcon } from "@/components/CalendarIcon";
import { TrackerUsageExample } from "@/components/Tracker";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="py-10">
        <div className="container flex items-center justify-center max-w-3xl gap-4 px-4 text-gray-500 md:px-6 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6" />
            <span className="font-semibold">Uptime Monitor Status Page</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button size="sm" variant="outline" className="cursor-not-allowed">
              Subscribe
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="bg-gray-100 border-t border-b border-gray-200 dark:border-gray-800 dark:bg-gray-950">
          <div className="container flex items-center justify-center gap-4 px-4 py-10 text-center md:px-6 md:py-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Operational
              </h1>
              <p className="text-sm font-medium tracking-wide/0.05em text-gray-500 dark:text-gray-400">
                All Systems Operational
              </p>
            </div>
          </div>
        </div>
        <div className=" ltr bg-gray-100 border-t border-b border-gray-200 dark:border-gray-800 dark:bg-gray-950">
          <div className=" mx-auto  grid-cols-1 max-w-3xl py-12 ">
            <div className=" col-span-1 gap-8 space-y-8">
              <div className=" ">
                <TrackerUsageExample />
              </div>
              <TrackerUsageExample />
            </div>
          </div>
        </div>
        {/*incident logs */}
        <div className="container flex items-center  space-y-8 mt-4 mb-2 ">
          <div className="mx-auto max-w-3xl space-y-8 justify-center">
            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="flex items-center gap-2">
                <BugIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <h3 className="text-sm font-medium tracking-tighter">
                  Incident: Major Outage
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Identified - The issue has been identified, and we are working
                on a fix.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <BugIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <h3 className="text-base font-medium tracking-tighter">
                  Incident: Major Outage
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Identified - The issue has been identified, and we are working
                on a fix.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex items-center justify-center gap-4 px-4 py-4 md:px-6">
          <nav className="flex items-center gap-4">
            <Link
              className="flex items-center gap-2 text-sm font-medium tracking-tighter"
              href="#"
            >
              Home
            </Link>
            <Link
              className="flex items-center gap-2 text-sm font-medium tracking-tighter"
              href="https://github.com/AnsonDev42/uptime-monitor"
            >
              Github
            </Link>
          </nav>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Uptime Monitor Demo Inc. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
