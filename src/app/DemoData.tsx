import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangleIcon, CheckCircleIcon } from "@/components/icons";
import React from "react";
import Link from "next/link";
import { NotificationChannel } from "@/components/ServiceForm";

export function DemoData() {
  return (
    <>
      {/*each row should be clickable to jump to another url*/}
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>

        <TableCell>
          {" "}
          <Link
            href={{
              pathname: "/stats",
              query: { id: "17" },
            }}
          >
            ollama API{" "}
          </Link>
        </TableCell>
        <TableCell>GET</TableCell>
        <TableCell>2m ago</TableCell>
        <TableCell>
          <CheckCircleIcon className="w-4 h-4" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>
          {" "}
          <Link
            href={{
              pathname: "/stats",
              query: { id: "17" },
            }}
          >
            My blog server{" "}
          </Link>
        </TableCell>
        <TableCell>PING</TableCell>
        <TableCell>5m ago</TableCell>
        <TableCell>
          <CheckCircleIcon className="w-4 h-4" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>
          {" "}
          <Link
            href={{
              pathname: "/stats",
              query: { id: "17" },
            }}
          >
            Postgres container{" "}
          </Link>
        </TableCell>
        <TableCell>Docker</TableCell>
        <TableCell>1m ago</TableCell>
        <TableCell>
          <AlertTriangleIcon className="w-4 h-4" />
        </TableCell>
      </TableRow>
    </>
  );
}

export function DemoNotificationData(): NotificationChannel[] {
  return [
    {
      id: 1,
      name: "SMS",
      details: {
        url: "http://localhost:8000/notify/1/",
      },
      type: "bark",
      url: "http://localhost:8000/notify/1/",
    },
    {
      id: 2,
      name: "Email",
      details: {
        url: "http://localhost:8000/notify/2/",
      },
      type: "bark",
      url: "http://localhost:8000/notify/2/",
    },
    {
      id: 3,
      name: "Slack",
      details: {
        url: "http://localhost:8000/notify/3/",
      },
      type: "bark",
      url: "http://localhost:8000/notify/3/",
    },
  ];
}
