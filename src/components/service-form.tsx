"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import useNotificationChannels from "@/hooks/useNotificationChannels";
import { ServiceSettings } from "@/hooks/useExistingServiceSettings";

export function PopUpFormWrapper(props: {
  buttonTitle: string;
  buttonDescription: string;
  existingService?: any;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        {/*the button that pops up the form to add service */}
        <div className="grid gap-1 text-center">
          <div className="font-semibold">
            <Button variant="outline">{props.buttonTitle}</Button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {props.buttonDescription}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl min-w-screen-2xl"
        onInteractOutside={(e) => {
          const { originalEvent } = e.detail;
          if (
            originalEvent.target instanceof Element &&
            originalEvent.target.closest(".group.toast")
          ) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Add monitoring service</DialogTitle>
          <DialogDescription>
            Create a new monitoring service here. Click submit when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm
          setOpen={setOpen}
          existingService={props.existingService}
        />
      </DialogContent>
    </Dialog>
  );
}

// structure of channel includes url, name, details, and type
export type NotificationChannel = {
  id: number;
  name: string;
  details: any;
  type: string;
  url: string;
};

interface DropdownMenuCheckboxesProps {
  notificationChannels: NotificationChannel[];
}

function DropdownMenuCheckboxes({
  notificationChannels,
}: DropdownMenuCheckboxesProps) {
  const [checkedItems, setCheckedItems] = React.useState<
    Record<number, boolean>
  >({});

  // Initialize checkedItems state
  React.useEffect(() => {
    const initialCheckedState = notificationChannels.reduce(
      (acc, channel) => {
        acc[channel.id] = false; // or true, if you want it to be checked initially
        return acc;
      },
      {} as Record<number, boolean>,
    );
    setCheckedItems(initialCheckedState);
  }, [notificationChannels]);

  const handleCheckedChange = (channelId: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [channelId]: checked }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select notification channels</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Notification Channels</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationChannels.map((channel) => (
          <DropdownMenuCheckboxItem
            key={channel.id}
            checked={checkedItems[channel.id]}
            onCheckedChange={(checked) =>
              handleCheckedChange(channel.id, checked)
            }
          >
            {channel.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

async function sendFormData(formData: any, existingService: any) {
  try {
    console.log(formData);
    console.log(existingService);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";
    // Determine the URL based on whether we are creating or editing a service
    const url = existingService
      ? `${baseUrl}service/${existingService.id}/`
      : `${baseUrl}service/`;
    const method = existingService ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data); // Handle the response data as needed
    toast.success(
      `Service has been ${existingService ? "updated" : "created"}`,
    );
    return true;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    toast.error("An error occurred: service was not created", {
      description: new Date().toLocaleString(),
      action: {
        label: "Retry",
        onClick: () => sendFormData(formData, existingService),
      },
    });
    return false;
  }
}

interface ProfileFormProps extends React.ComponentProps<"form"> {
  setOpen: (open: boolean) => void; // Add setOpen prop
  existingService: ServiceSettings; // Prop for existing service data
}

export function ProfileForm({
  existingService,
  ...formProps
}: ProfileFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [monitoringEndpoint, setMonitoringEndpoint] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { notificationChannels, error } = useNotificationChannels(baseUrl);

  const [monitoringType, setMonitoringType] = useState("http");
  // States for periodic_task and its nested properties
  const [intervalEvery, setIntervalEvery] = useState(5);
  const [intervalPeriod, setIntervalPeriod] = useState("Minutes");

  // // Handler for the submit button
  useEffect(() => {
    if (existingService) {
      setName(existingService.name);
      setDescription(
        existingService.description ? existingService.description : "",
      );
      setMonitoringEndpoint(
        existingService.monitoring_endpoint
          ? existingService.monitoring_endpoint
          : "",
      );
      setIsActive(existingService.is_active ? existingService.is_active : true);
      setMonitoringType(
        existingService.monitoring_type
          ? existingService.monitoring_type
          : "tcp",
      );
      // Set other fields as needed
    }
  }, [existingService]); // Trigger when existingService changes

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default form submission
    const s = notificationChannels.map((channel) => channel.id);
    console.log(s);
    // Structure the form data according to the JSON payload
    const formData = {
      name: name,
      description: description,
      monitoring_endpoint: monitoringEndpoint,
      is_active: isActive,
      notification_channel: s,
      monitoring_type: monitoringType,
      periodic_task_data: {
        interval: {
          every: intervalEvery,
          period: intervalPeriod.toLowerCase(),
        },
        isActive,
      },
    };
    console.log(formData);

    const results = await sendFormData(formData, existingService);
    if (results) {
      formProps.setOpen(false);
    }
  };

  return (
    <form name="serviceForm" onSubmit={handleSubmit} className="space-y-4 py-4">
      {/* Name Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          defaultValue={existingService ? existingService.name : ""}
          placeholder="e.g. My blog website"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-3"
          required={true}
        />
      </div>

      {/* Description Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          defaultValue={existingService ? existingService.description : ""}
          placeholder="e.g. my self host blog in the archlinux machine"
          // value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-3"
        />
      </div>

      {/* Monitoring Endpoint Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="monitoringEndpoint" className="text-right">
          Monitoring Endpoint
        </Label>
        <Input
          id="monitoringEndpoint"
          defaultValue={
            existingService ? existingService.monitoring_endpoint : ""
          }
          placeholder="e.g. http://localhost:3000"
          value={monitoringEndpoint}
          onChange={(e) => setMonitoringEndpoint(e.target.value)}
          className="col-span-3"
          required={true}
        />
      </div>

      {/* IsActive Checkbox */}
      <div className="grid grid-cols-4 items-center gap-4">
        <span className="col-span-1 text-right">Is Active</span>
        <Switch
          id="isActive"
          defaultChecked={existingService ? existingService.is_active : true}
          checked={true}
          onCheckedChange={(checked: boolean) => setIsActive(checked)}
        />
      </div>

      {/* Notification Channel Select */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notificationChannels" className="text-right">
          Notification Channel
        </Label>
        <DropdownMenuCheckboxes notificationChannels={notificationChannels} />
      </div>

      {/* Monitoring Type Select */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="monitoringType" className="text-right">
          Monitoring Type
        </Label>
        <Select onValueChange={(monitorType) => setMonitoringType(monitorType)}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="HTTP" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="http">HTTP</SelectItem>
              <SelectItem value="tcp">TCP</SelectItem>
              <SelectItem value="ping">PING</SelectItem>
              <SelectItem value="docker">Docker</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Periodic Task Name Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Interval every " className="text-right">
          Interval every
        </Label>
        <Input
          id="IntervalEvery"
          defaultValue={
            existingService ? existingService.periodic_task.every : 10
          }
          placeholder="Enter the interval, e.g., 10 "
          value={intervalEvery}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10); // Convert the input value to an integer
            if (!isNaN(newValue)) {
              // Check if the conversion was successful
              setIntervalEvery(newValue); // Update the state with the new integer value
            }
          }}
          className="col-span-3"
          required={true}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="interval period" className="text-right">
          Interval Period
        </Label>

        <Select
          defaultValue={
            existingService ? existingService.periodic_task.period : "minutes"
          }
          onValueChange={(intervalPeriod) =>
            setIntervalPeriod(intervalPeriod.toLowerCase())
          }
        >
          <SelectTrigger className="w-72">
            <SelectValue
              placeholder={
                existingService
                  ? (existingService.periodic_task.period as string)
                  : "Select a period"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="seconds">Seconds</SelectItem>
              <SelectItem value="minutes">Minutes</SelectItem>
              <SelectItem value="days">Days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
