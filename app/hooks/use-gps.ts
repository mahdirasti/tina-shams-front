import { useState, useCallback } from "react";
import useLoading from "./use-loading";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const useGeolocation = (options?: GeolocationOptions) => {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(
    (
      onSuccess?: (coords: Coordinates) => void,
      onError?: (err: any) => void
    ) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      startLoading();

      const success = (position: GeolocationPosition) => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoordinates(coords);
        setError(null); // Reset error state
        stopLoading();
        if (onSuccess) onSuccess(coords);
      };

      const error = (err: GeolocationPositionError) => {
        setError(err.message);
        stopLoading();
        if (onError) onError(err);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    [options]
  );

  return { coordinates, error, getLocation, isLoading };
};

export default useGeolocation;
