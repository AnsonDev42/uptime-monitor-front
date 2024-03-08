'use client'
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";

export function PopUpFormWrapper() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl min-w-screen-2xl">
                <DialogHeader>
                    <DialogTitle>Add monitoring service</DialogTitle>
                    <DialogDescription>
                        Create a new monitoring service here. Click submit when you are done.
                    </DialogDescription>
                </DialogHeader>
                <ProfileForm/>
            </DialogContent>
        </Dialog>
    )

}
// structure of channel includes url, name, details, and type
type NotificationChannel = {
    id: number;
    name: string;
    details: string;
    type: string;
    url: string;
};

function ProfileForm({className}: React.ComponentProps<"form">) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [monitoringEndpoint, setMonitoringEndpoint] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [notificationChannel, setNotificationChannel] = useState([]);
    const [monitoringType, setMonitoringType] = useState('');
    // States for periodic_task and its nested properties
    const [taskName, setTaskName] = useState('');
    const [task, setTask] = useState('');
    const [kwargs, setKwargs] = useState('');
    const [intervalEvery, setIntervalEvery] = useState(0);
    const [intervalPeriod, setIntervalPeriod] = useState('');
    const [enabled, setEnabled] = useState(false);

    // Fetch Notification Channels from backend
    useEffect(() => {
        const fetchNotificationChannels = async () => {
            try {
                const response = await fetch('http://localhost:8000/notify');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setNotificationChannel(data); // Assuming the backend returns an array of channels
            } catch (error) {
                console.error('Failed to fetch notification channels:', error);
            }
        };

        fetchNotificationChannels();
    }, []); // Empty dependency array ensures this runs once on mount

    // Handler for the submit button
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission

        // Structure the form data according to the JSON payload
        const formData = {
            name,
            description,
            monitoring_endpoint: monitoringEndpoint,
            is_active: isActive,
            notification_channel: notificationChannel,
            monitoring_type: monitoringType,
            periodic_task: {
                name: taskName,
                task,
                kwargs,
                interval: {
                    every: intervalEvery,
                    period: intervalPeriod
                },
                enabled
            }
        };

        // Fetch API to send the form data
        try {
            const response = await fetch('http://localhost:8000/service/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data); // Handle the response data as needed
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };


    return (
        <form className="space-y-4 py-4" action="http://localhost:8000/notify/" method="post" >
            {/* Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input id="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)}
                       className="col-span-3"/>
            </div>

            {/* Description Input */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                    Description
                </Label>
                <Input id="description" placeholder="Enter the description" value={description}
                       onChange={(e) => setDescription(e.target.value)} className="col-span-3"/>
            </div>

            {/* Monitoring Endpoint Input */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monitoringEndpoint" className="text-right">
                    Monitoring Endpoint
                </Label>
                <Input id="monitoringEndpoint" placeholder="Enter the monitoring endpoint" value={monitoringEndpoint}
                       onChange={(e) => setMonitoringEndpoint(e.target.value)} className="col-span-3"/>
            </div>

            {/* IsActive Checkbox */}
            <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-right">Is Active</span>
                <Switch id="isActive" />
            </div>

            {/* Notification Channel Select */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notificationChannel" className="text-right">
                    Notification Channel
                </Label>
                <Select>
                    <SelectTrigger className="w-72">
                        <SelectValue placeholder="Select a notification channel" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="slack">Slack</SelectItem>
                            {notificationChannel.map((channel:NotificationChannel) => (
                                <SelectItem key={channel.name} value={String(channel.name)}>
                                    {channel.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Monitoring Type Select */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monitoringType" className="text-right">
                    Monitoring Type
                </Label>
                <Select>
                    <SelectTrigger className="w-72">
                        <SelectValue placeholder="Select a monitoring type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="http">HTTP</SelectItem>
                            <SelectItem value="tcp">TCP</SelectItem>
                            <SelectItem value="ping">Ping</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit">Submit</Button>
        </form>
    );
}
