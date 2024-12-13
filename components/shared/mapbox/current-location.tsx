import { OrgIconButton } from "@/components/shared-ui";
import { Loader, Locate, Pin } from "lucide-react";
import React from "react";
import { useMapbox } from ".";
import { useLoading } from "@/app/hooks";
import useGeolocation from "@/app/hooks/use-gps";

export default function CurrentLocation() {
  const { handleSelectLocation } = useMapbox();

  const { getLocation, isLoading } = useGeolocation();

  const handleGetLocation = () => {
    getLocation(
      (coords) => {
        handleSelectLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      (err) => {}
    );
  };

  return (
    <OrgIconButton size={"lg"} onClick={handleGetLocation}>
      {isLoading ? <Loader className='animate-spin' /> : <Locate />}
    </OrgIconButton>
  );
}
