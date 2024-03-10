import {TableCell, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {AlertTriangleIcon, CheckCircleIcon} from "@/components/icons";
import React from "react";

export function DemoTableData() {
    return (<>
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
    </>);
}
type NotificationChannel = {
    id: number; name: string; details: any; type: string; url: string;
};
export function DemoNotificationData(): NotificationChannel[] {
    return ([
        {
            "id": 1,
            "name": "SMS",
            "details": {
                "url": "http://localhost:8000/notify/1/"
            },
            "type": "bark",
            "url": "http://localhost:8000/notify/1/"
        },
        {
            "id": 2,
            "name": "Email",
            "details": {
                "url": "http://localhost:8000/notify/2/"
            },
            "type": "bark",
            "url": "http://localhost:8000/notify/2/"
        },
        {
            "id": 3,
            "name": "Slack",
            "details": {
                "url": "http://localhost:8000/notify/3/"
            },
            "type": "bark",
            "url": "http://localhost:8000/notify/3/"
        }
    ])
}