'use client'

import {TableCell, TableRow} from "@/components/ui/table";
import useSWR from "swr";
import {Checkbox} from "@/components/ui/checkbox";
import React from 'react';
import {formatDistance} from 'date-fns';
import {AlertTriangleIcon, CheckCircleIcon, PlusIcon} from "@/components/icons";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ServiceData {
    id: number;
    name: string;
    description?: string; // Optional since blank=True in Django
    updated_at: string; // ISO string format
    is_active: boolean; // Assuming this maps to is_active
    monitoring_type: string; // Maps to monitoring_type, could make this an enum or union type if you have defined choices
}

export function Services() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";
    let {data, error, isLoading} = useSWR(`${baseUrl}service/`, fetcher)

    if (isLoading) return <p>Loading...</p>
    if (!data) return (<><TableRow>
        <TableCell>
        </TableCell>
        <TableCell>
        </TableCell>
        <TableCell>No data loaded from {baseUrl}, please add a service! </TableCell>
        <TableCell>
            <AlertTriangleIcon className="w-4 h-4"/>
        </TableCell>
    </TableRow></>)
    if (error) return (<><TableRow>
        <TableCell>
        </TableCell>
        <TableCell>
        </TableCell>
        <TableCell><p>Error fetching: {error}</p> </TableCell>
        <TableCell>
            <AlertTriangleIcon className="w-4 h-4"/>
        </TableCell>
    </TableRow></>)

    return (
        <>
            {data.map((service: ServiceData) => (
                <TableRow key={service.id}>
                    <TableCell>
                        <Checkbox/>
                    </TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.monitoring_type}</TableCell>
                    <TableCell>{formatDistance(service.updated_at, new Date(), {addSuffix: true})}</TableCell>
                    <TableCell>
                        {service.is_active ? <CheckCircleIcon className="w-4 h-4"/> :
                            <AlertTriangleIcon className="w-4 h-4"/>}
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
                    <PlusIcon className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new monitoring service</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}