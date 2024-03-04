'use client'
import React, {useState} from 'react';

import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Select} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {DropdownMenu} from "@/components/ui/dropdown-menu";
export default function ServiceForm() {
    // State variables for each input
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [monitoringEndpoint, setMonitoringEndpoint] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [notificationChannel, setNotificationChannel] = useState('');
    const [monitoringType, setMonitoringType] = useState('');
    // You can continue for other inputs as needed

    // Click handler for the Save button
    const handleSaveClick = () => {
        const formData = {
            name,
            description,
            monitoringEndpoint,
            isActive,
            notificationChannel,
            monitoringType,
            // Add other fields as needed
        };
        console.log(formData); // For now, just logging. Replace this with your API call or other logic.
    };

    return (
        // <Dialog className="w-full max-w-3xl">
        //     <DialogContent className="sm:max-w-[425px]">
        //         <ScrollArea className="h-72 w-auto rounded-md border">
        //             <DialogHeader>
        //                 <DialogTitle>Add New Service</DialogTitle>
        //                 <DialogDescription>
        //                     Configure your service details below. Click save when you are done.
        //                 </DialogDescription>
        //             </DialogHeader>

                    <form className="space-y-4 py-4">
                        {/* Name Input */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3"/>
                        </div>

                        {/* Description Input */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input id="description" placeholder="Enter the description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3"/>
                        </div>

                        {/* Monitoring Endpoint Input */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="monitoringEndpoint" className="text-right">
                                Monitoring Endpoint
                            </Label>
                            <Input id="monitoringEndpoint" placeholder="Enter the monitoring endpoint" value={monitoringEndpoint} onChange={(e) => setMonitoringEndpoint(e.target.value)} className="col-span-3"/>
                        </div>

                        {/* IsActive Checkbox */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="col-span-1 text-right">Is Active</span>
                            <Checkbox id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="col-span-3"/>
                        </div>

                        {/* Notification Channel Select */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notificationChannel" className="text-right">
                                Notification Channel
                            </Label>
                            <Select id="notificationChannel" value={notificationChannel} onChange={(e) => setNotificationChannel(e.target.value)} className="col-span-3">
                                <DropdownMenu/>
                                <option value="">Select a notification channel</option>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="slack">Slack</option>
                            </Select>
                        </div>

                        {/* Monitoring Type Select */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="monitoringType" className="text-right">
                                Monitoring Type
                            </Label>
                            <Select id="monitoringType" value={monitoringType} onChange={(e) => setMonitoringType(e.target.value)} className="col-span-3">
                                <option value="">Select a monitoring type</option>
                                <option value="http">HTTP</option>
                                <option value="tcp">TCP</option>
                                <option value="ping">Ping</option>
                            </Select>
                        </div>
                    </form>
);
}
