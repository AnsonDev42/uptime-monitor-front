'use client'
import React, {FormEventHandler, useEffect, useState} from 'react';
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
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";

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
                <ProfileForm setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    )
}

// structure of channel includes url, name, details, and type
type NotificationChannel = {
    id: number;
    name: string;
    details: any;
    type: string;
    url: string;
};


interface DropdownMenuCheckboxesProps {
    notificationChannels: NotificationChannel[]
}

function DropdownMenuCheckboxes({ notificationChannels }: DropdownMenuCheckboxesProps) {
    const [checkedItems, setCheckedItems] = React.useState<Record<number, boolean>>({});

    // Initialize checkedItems state
    React.useEffect(() => {
        const initialCheckedState = notificationChannels.reduce((acc, channel) => {
            acc[channel.id] = false; // or true, if you want it to be checked initially
            return acc;
        }, {} as Record<number, boolean>);
        setCheckedItems(initialCheckedState);
    }, [notificationChannels]);

    const handleCheckedChange = (channelId: number, checked: boolean) => {
        setCheckedItems(prev => ({ ...prev, [channelId]: checked }));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Notification Channels</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificationChannels.map(channel => (
                    <DropdownMenuCheckboxItem
                        key={channel.id}
                        checked={checkedItems[channel.id]}
                        onCheckedChange={(checked) => handleCheckedChange(channel.id, checked)}
                    >
                        {channel.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
interface ProfileFormProps extends React.ComponentProps<"form"> {
    setOpen: (open: boolean) => void; // Add setOpen prop
}
function ProfileForm({setOpen,className,...formProps}: ProfileFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [monitoringEndpoint, setMonitoringEndpoint] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [notificationChannel, setNotificationChannel] = useState([] );
    const [monitoringType, setMonitoringType] = useState("http");
    // States for periodic_task and its nested properties
    const [taskName, setTaskName] = useState('');
    const [task, setTask] = useState('');
    const [intervalEvery, setIntervalEvery] = useState(0);
    const [intervalPeriod, setIntervalPeriod] = useState('');
    const [enabled, setEnabled] = useState(false);

    // Fetch Notification Channels from backend
    useEffect(() => {
        const fetchNotificationChannels = async () => {
            try {
                const response = await fetch('http://localhost:8000/notify/');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setNotificationChannel(data); // Assuming the backend returns an array of channels
            } catch (error) {
                console.error('Failed to fetch notification channels:', error);
            }
        };

        fetchNotificationChannels();
    }, []); // Empty dependency array ensures this runs once on mount
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handler for the submit button
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission
        const s = notificationChannel.map((channel: NotificationChannel) => channel.id);
        console.log(s)
        // Structure the form data according to the JSON payload
        const formData = {
            name: name,
            description: description,
            monitoring_endpoint: monitoringEndpoint,
            is_active: isActive,
            notification_channel:s,
            monitoring_type: monitoringType,
            periodic_task: {
                name: taskName,
                task,
                interval: {
                    every: intervalEvery,
                    period: intervalPeriod
                },
                enabled
            }
        };

        // Fetch API to send the form data
        try {
            console.log(formData);
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
            setIsSubmitted(true); // Update state to indicate submission success
            setOpen(false); // Close the dialog
            toast("A service has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };


    return (
        <form  onSubmit={handleSubmit} className="space-y-4 py-4" >
            {/* Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input id="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)}
                       className="col-span-3" />
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
                <Switch id="isActive" onCheckedChange={(checked: boolean) => setIsActive(checked)}/>

            </div>

            {/* Notification Channel Select */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notificationChannel" className="text-right">
                    Notification Channel
                </Label>
                <DropdownMenuCheckboxes notificationChannels={notificationChannel} />
            </div>

            {/* Monitoring Type Select */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monitoringType" className="text-right">
                    Monitoring Type
                </Label>
                <Select onValueChange={(monitorType)=> setMonitoringType(monitorType)}>
                    <SelectTrigger className="w-72" >
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
            {/* Periodic Task Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Interval every " className="text-right">
                    Interval every
                </Label>
                <Input id="IntervalEvery" placeholder="Enter the interval, e.g., 10 " value={intervalEvery}
                       onChange={(e) => {
                           const newValue = parseInt(e.target.value, 10); // Convert the input value to an integer
                           if (!isNaN(newValue)) { // Check if the conversion was successful
                               setIntervalEvery(newValue); // Update the state with the new integer value
                           }
                       }} className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interval period" className="text-right">
                    Interval Period
                </Label>
                <Select onValueChange={(intervalPeriod)=>setIntervalPeriod(intervalPeriod)}>
                    <SelectTrigger className="w-72">
                        <SelectValue placeholder="Select a interval period"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="seconds">Second</SelectItem>
                            <SelectItem value="minutes">Minute</SelectItem>
                            <SelectItem value="days">Day</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit">Submit</Button>
        </form>
    );
}
