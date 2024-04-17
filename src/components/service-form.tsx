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
import { DemoNotificationData } from "@/app/demo-data";

export function PopUpFormWrapper() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        {/*the button that pops up the form to add service */}
        <div className="grid gap-1 text-center">
          <div className="font-semibold">
            <Button variant="outline">Add Service</Button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Start monitoring a new service
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
        <ProfileForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
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

async function sendFormData(formData: any) {
  try {
    console.log(formData);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";
    const response = await fetch(`${baseUrl}service/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data); // Handle the response data as needed
    toast.success("A service has been created", {
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
    return true;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    toast.error("An error occurred: service was not created", {
      description: new Date().toLocaleString(),
      action: {
        label: "Retry",
        onClick: () => sendFormData(formData),
      },
    });
    return false;
  }
}

interface ProfileFormProps extends React.ComponentProps<"form"> {
  setOpen: (open: boolean) => void; // Add setOpen prop
}

export function ProfileForm({
  setOpen,
  className,
  ...formProps
}: ProfileFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [monitoringEndpoint, setMonitoringEndpoint] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [notificationChannel, setNotificationChannel] = useState([]);
  const [monitoringType, setMonitoringType] = useState("http");
  // States for periodic_task and its nested properties
  const [taskName, setTaskName] = useState("");
  const [task, setTask] = useState("");
  const [intervalEvery, setIntervalEvery] = useState(5);
  const [intervalPeriod, setIntervalPeriod] = useState("Minutes");
  const [enabled, setEnabled] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/";

  // Fetch Notification Channels from backend
  useEffect(() => {
    const fetchNotificationChannels = async () => {
      try {
        const response = await fetch(`${baseUrl}notify/`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setNotificationChannel(data); // Assuming the backend returns an array of channels
      } catch (error) {
        // @ts-ignore
        setNotificationChannel(DemoNotificationData);
        console.error("Failed to fetch notification channels:", error);
        toast.warning(
          "An error occurred: Back-end not detected, you are on demo ",
          {},
        );
      }
    };

    fetchNotificationChannels();
  }, []); // Empty dependency array ensures this runs once on mount
  // Handler for the submit button
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default form submission
    const s = notificationChannel.map(
      (channel: NotificationChannel) => channel.id,
    );
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
        name: taskName,
        task: "",
        interval: {
          every: intervalEvery,
          period: intervalPeriod,
        },
        enabled,
      },
    };
    const results = await sendFormData(formData);
    if (results) {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      {/* Name Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
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
          placeholder="e.g. my self host blog in the archlinux machine"
          value={description}
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
          defaultChecked={true}
          onCheckedChange={(checked: boolean) => setIsActive(checked)}
        />
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
          onValueChange={(intervalPeriod) => setIntervalPeriod(intervalPeriod)}
        >
          <SelectTrigger className="w-72">
            <SelectValue placeholder="select a time" />
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
