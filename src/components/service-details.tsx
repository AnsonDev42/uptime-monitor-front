"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import {timeFormatDefaultLocale} from "d3-time-format";

export default function ServiceDetails() {
    return (
        <div key="1" className="flex flex-col w-full min-h-screen">

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
                <div className="max-w-6xl w-full mx-auto grid gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                        <ArrowRightIcon className="w-6 h-6 opacity-50" />
                        <Link className="font-medium" href="#">
                            Back to Deployments
                        </Link>
                    </div>
                    <div className="grid gap-2">
                        <h1 className="font-semibold text-3xl">Uptime</h1>
                        <p className="text-gray-500 dark:text-gray-400">Service monitoring and uptime statistics.</p>
                    </div>
                    <Card className="p-0 overflow-hidden">
                        <CardContent className="grid gap-4 text-sm p-6">
                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="font-semibold">Service Name</div>
                                <div>Acme Inc</div>
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
                                <div>200ms</div>
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">Uptime percentage over the last 24 hours</p>
                            <CurvedlineChart className="w-full aspect-[2/1]" />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

function ArrowRightIcon(props:any) {
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
    )
}


function CurvedlineChart(props:any) {
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
    )
}
