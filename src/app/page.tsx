'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox";
// import {Services} from '@/components/service';
import React, {Suspense} from "react";
import {AlertTriangleIcon, CheckCircleIcon, MonitorIcon, PlusIcon} from "@/components/icons";

const Services = React.lazy(() => import('@/components/service').then(module => ({ default: module.Services })));


export default function Home() {

    return (
        <>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader className="grid gap-1">
                    <CardTitle>Uptime Bot</CardTitle>
                    <CardDescription>Monitoring the availability of various services</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-semibold">99.9%</div>
                        <div className="grid gap-1 text-center">
                            <div className="font-semibold">Uptime</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Calculated over the last 30 days
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full max-w-3xl mx-auto">
                <CardContent className="flex items-center justify-center p-6">
                    <div className="grid gap-1 text-center">
                        <div className="font-semibold">Add Service</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Start monitoring a new service</div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader className="flex flex-row items-center gap-2">
                    <MonitorIcon className="w-6 h-6"/>
                    <CardTitle>Monitors</CardTitle>
                    <Button className="ml-auto" size="sm" variant="outline">
                        Add
                        <span className="sr-only">New Monitor</span>
                        <PlusIcon className="w-4 h-4"/>
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead/>
                                <TableHead>Service</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Last Check</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell>API</TableCell>
                                <TableCell>GET</TableCell>
                                <TableCell>2m ago</TableCell>
                                <TableCell>
                                    <CheckCircleIcon className="w-4 h-4"/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell>PING</TableCell>
                                <TableCell>5m ago</TableCell>
                                <TableCell>
                                    <CheckCircleIcon className="w-4 h-4"/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell>Database</TableCell>
                                <TableCell>Docker</TableCell>
                                <TableCell>1m ago</TableCell>
                                <TableCell>
                                    <AlertTriangleIcon className="w-4 h-4"/>
                                </TableCell>
                            </TableRow>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Services />
                            </Suspense>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}


