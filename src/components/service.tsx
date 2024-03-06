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
import ServiceForm from "@/components/service-form";
import {ScrollArea} from "@/components/ui/scroll-area";

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
    let {data, error, isLoading} = useSWR(`${baseUrl}service/`, fetcher)

    if (isLoading) return <>Loading...</>
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
        <TableCell>Error fetching: {error}</TableCell>
        <TableCell>
            <AlertTriangleIcon className="w-4 h-4"/>
        </TableCell>
    </TableRow></>)

    return (
        <>
            {data.map((service: ServiceData) => (
                <TableRow key={service.id + 3}>
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

            {/*<DialogContent className="sm:max-w-[425px]">*/}
            <DialogContent className="w-max h-max">
            <ScrollArea className="h-auto w-auto rounded-md border">

                <DialogHeader>
                    <DialogTitle>Add new monitoring service</DialogTitle>
                    <DialogDescription>

                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                    < ServiceForm />

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
                </ScrollArea>

            </DialogContent>

        </Dialog>
    )
}
//
//
// export const ServiceForm = () => {
//     // Assuming getPeriodicTaskChoices() fetches options for periodic_task_id dynamically
//     const [periodicTaskOptions, setPeriodicTaskOptions] = useState<PeriodicTaskOption[]>([]);
//
//     // Form state
//     const [formValues, setFormValues] = useState<ServiceFormValues>({
//         name: '',
//         description: '',
//         monitoring_endpoint: '',
//         is_active: false,
//         notification_channel: [],
//         monitoring_type: '',
//         periodic_task_id: undefined,
//         periodic_task: undefined,
//     });
//
//     // Handle input change
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };
//
//     // Handle form submit
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Validation logic here
//         // API submission logic here
//     };
//
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="outline">Add/Edit Service</Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Add/Edit Service</DialogTitle>
//                     <DialogDescription>Fill in the details for the service.</DialogDescription>
//                 </DialogHeader>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <Label htmlFor="name">Name</Label>
//                         <Input id="name" name="name" value={formValues.name} onChange={handleChange} />
//                     </div>
//                     {/* Repeat for other fields */}
//                     <div>
//                         <Label htmlFor="periodic_task_id">Periodic Task</Label>
//                         <select
//                             id="periodic_task_id"
//                             name="periodic_task_id"
//                             value ={formValues.periodic_task_id}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select a periodic task</option>
//                             {periodicTaskOptions.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <DialogFooter>
//                         <Button type="submit">Save Service</Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };
