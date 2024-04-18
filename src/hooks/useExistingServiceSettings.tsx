import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface ServiceSettings {
  name: string;
  description: string;
  monitoring_method: string;
  monitoring_endpoint: string;
  is_active: boolean;
  monitoring_type: string;
  periodic_task: { id: string; name: string; every: number; period: string };
}

export function useExistingServiceSettings(serviceId: string) {
  const [existingService, setExistingService] =
    useState<ServiceSettings | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServiceSettings() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/service/${serviceId}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const serviceSettings: ServiceSettings = await response.json();
        setExistingService(serviceSettings);
      } catch (error) {
        console.error("Failed to fetch service settings:", error);
        setError("An error occurred: Back-end not detected, you are on demo?");
        toast.warning(error as string, {});
      }
    }

    if (serviceId) {
      fetchServiceSettings();
    }
  }, [serviceId]);

  return { existingService, error };
}
