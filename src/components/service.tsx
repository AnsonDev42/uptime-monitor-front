"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import useSWR from "swr";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { formatDistance } from "date-fns";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopUpFormWrapper } from "@/components/service-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ServiceData {
  id: number;
  name: string;
  description?: string; // Optional since blank=True in Django
  updated_at: string; // ISO string format
  is_active: boolean; // Assuming this maps to is_active
  monitoring_type: string; // Maps to monitoring_type, could make this an enum or union type if you have defined choices
}

interface ServiceFormValues {
  name: string;
  description: string;
  monitoring_endpoint: string;
  is_active: boolean;
  notification_channel: string[];
  monitoring_type: string;
  periodic_task_id?: string | null;
  periodic_task?: any; // Adjust based on your actual periodic task data structure
}

interface PeriodicTaskOption {
  label: string;
  value: string;
}

export function Services() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";
  let { data, error, isLoading } = useSWR(`${baseUrl}service/`, fetcher);
  if (isLoading) return <>Loading...</>;
  if (!data)
    return (
      <>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Link
              href={{
                pathname: "https://github.com/AnsonDev42/uptime-monitor",
              }}
            >
              This is a demo, set your own uptime-bot in HERE
            </Link>
          </TableCell>
          <TableCell>
            <AlertTriangleIcon className="w-4 h-4" />
          </TableCell>
        </TableRow>
      </>
    );
  if (error)
    return (
      <>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Error fetching: {error}</TableCell>
          <TableCell>
            <AlertTriangleIcon className="w-4 h-4" />
          </TableCell>
        </TableRow>
      </>
    );

  return (
    <>
      {data.map((service: ServiceData) => (
        <TableRow key={service.id + 3}>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>{service.name}</TableCell>
          <TableCell>{service.monitoring_type}</TableCell>
          <TableCell>
            {formatDistance(service.updated_at, new Date(), {
              addSuffix: true,
            })}
          </TableCell>
          <TableCell>
            {service.is_active ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <AlertTriangleIcon className="w-4 h-4" />
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export function CreateServiceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm" variant="outline">
          New Monitor
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      {/*<DialogContent className="sm:max-w-[425px]">*/}
      <DialogContent className="w-max h-max">
        <ScrollArea className="h-auto w-auto rounded-md border">
          <DialogHeader>
            <DialogTitle>Add new monitoring service</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <PopUpFormWrapper />

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
