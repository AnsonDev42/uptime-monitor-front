'use client'
import React, {useState} from 'react';
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

export function DrawerDialogDemo() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl min-w-screen-2xl">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <ProfileForm/>
            </DialogContent>
        </Dialog>
    )

    // return (
    //     <Drawer open={open} onOpenChange={setOpen}>
    //         <DrawerTrigger asChild>
    //             <Button variant="outline">Edit Profile</Button>
    //         </DrawerTrigger>
    //         <DrawerContent className="flex flex-row justify-center items-center max-w-screen-md">
    //             <DrawerHeader className="text-left">
    //                 <DrawerTitle>Edit profile</DrawerTitle>
    //                 <DrawerDescription>
    //                     Make changes to your profile here. Click save when you are done.
    //                 </DrawerDescription>
    //             </DrawerHeader>
    //             <ProfileForm className="px-4"/>
    //             <DrawerFooter className="pt-2">
    //                 <DrawerClose asChild>
    //                     <Button variant="outline">Cancel</Button>
    //                 </DrawerClose>
    //             </DrawerFooter>
    //         </DrawerContent>
    //     </Drawer>
    // )
}

function ProfileForm({className}: React.ComponentProps<"form">) {
    // // State variables for each input
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


export default function ServiceForm() {
    return (
        DrawerDialogDemo()
    );

}
