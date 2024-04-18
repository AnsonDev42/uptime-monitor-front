import { useState, useEffect } from "react";
import { toast } from "sonner";
import { DemoNotificationData } from "@/app/DemoData";
import { NotificationChannel } from "@/components/ServiceForm";

export default function useNotificationChannels(baseUrl: string) {
  const [notificationChannels, setNotificationChannels] = useState<
    NotificationChannel[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotificationChannels() {
      try {
        const response = await fetch(`${baseUrl}notify/`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data: NotificationChannel[] = await response.json();
        setNotificationChannels(data);
      } catch (error) {
        setError("An error occurred: Back-end not detected, you are on demo");
        setNotificationChannels(DemoNotificationData);
        console.error("Failed to fetch notification channels:", error);
        toast.warning(error as string, {});
      }
    }

    fetchNotificationChannels();
  }, [baseUrl]);

  return { notificationChannels, error };
}
