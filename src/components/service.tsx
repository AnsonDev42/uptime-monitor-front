'use client'

import {TableCell, TableRow} from "@/components/ui/table";
import useSWR from "swr";
import {Checkbox} from "@/components/ui/checkbox";
import React from 'react';
import {formatDistance} from 'date-fns';
import {AlertTriangleIcon, CheckCircleIcon} from "@/components/icons";

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
    if (!data) return <p>No fetched data</p>
    if (error) return <p>Error fetching: {error}</p>

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

