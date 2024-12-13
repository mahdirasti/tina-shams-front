"use client";

import mapboxgl, {
  LayerSpecification,
  Marker,
  SourceSpecification,
} from "mapbox-gl";
import { _VARZ } from "@/app/const/_varz";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRef } from "react";
import { cn } from "@/app/lib/utils";
import { Map } from "mapbox-gl";
import SelectLocation from "./select-location";

mapboxgl.accessToken = _VARZ.mapboxToken ?? "";

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js",
  null,
  true
);

export type MapboxMapProps = {
  center?: [number, number];
  zoom: number;
  className?: string;
  onSelect?: (data: any) => void; //data should change from any to safe type
  onSelectTextButton?: string;
  isPreview?: boolean;
  hasInteraction?: boolean;
  markers?: { lat: number; lng: number; source?: string }[];
  sources?: { sourceId: string; details: SourceSpecification }[];
  layers?: LayerSpecification[];
};

const MapboxContext = createContext<{
  onSelect?: () => void;
  onSelectTextButton: string;
  handleSelectLocation: (data: { lat: number; lng: number }) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}>({
  onSelect: undefined,
  onSelectTextButton: "انتخاب",
  handleSelectLocation: (data) => {},
  handleZoomIn: () => {},
  handleZoomOut: () => {},
});

export const useMapbox = () => useContext(MapboxContext);

const MapboxMap: React.FC<MapboxMapProps> = ({
  center = _VARZ.mapCenterCoords,
  zoom,
  className,
  onSelect,
  onSelectTextButton = "Select",
  isPreview = false,
  markers,
  sources,
  layers,
  hasInteraction = true,
}) => {
  const [localCenter, setLocalCenter] = useState(center);

  const mapRef = useRef<Map>();
  const markerRef = useRef<Marker>();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (center !== undefined) setLocalCenter(center);

    const lng = center?.[0] ?? _VARZ.mapCenterCoords[0];
    const lat = center?.[1] ?? _VARZ.mapCenterCoords[1];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mahdirasti/cm4l73gyc00cz01r08b5s2g1s",
      center: [lng, lat],
      zoom,
      interactive: hasInteraction,
    });

    if (!isPreview) {
      // Add navigation controls to the map
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
    }

    // Add a marker to the map
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    if (markers && markers.length > 0)
      for (let m of markers) {
        const el = document.createElement("div");
        if (m.source) {
          el.style.backgroundImage = `url(${m.source})`;
          el.className = "w-[40px] h-[40px] bg-contain";

          new mapboxgl.Marker(el)
            .setLngLat({ lat: m.lat, lng: m.lng })
            .addTo(map);
        } else {
          new mapboxgl.Marker()
            .setLngLat({ lat: m.lat, lng: m.lng })
            .addTo(map);
        }
      }

    map.on("click", (e) => {
      if (isPreview) return;

      const { lng, lat } = e.lngLat;
      const newCoords: [number, number] = [lng, lat];
      // Update the marker's position on map click
      setLocalCenter(newCoords);
      if (marker) {
        marker.setLngLat(newCoords);
      } else {
        // Create a new marker if none exists
        const newMarker = new mapboxgl.Marker().setLngLat(newCoords).addTo(map);
        markerRef.current = newMarker;
      }
      // Optionally, fly to the clicked location
      map.flyTo({ center: newCoords });

      // If you have an `onSelect` prop or callback, call it with the new position
      // if (onSelect) {
      //   onSelect(newCoords)
      // }
    });

    map.on("load", () => {
      if (sources && sources.length > 0) {
        for (let source of sources) {
          map.addSource(source.sourceId, source.details);
        }
      }

      if (layers && layers.length > 0) {
        for (let layer of layers) {
          map.addLayer(layer);
        }
      }
    });

    mapRef.current = map;
    markerRef.current = marker;

    // Clean up on component unmount
    return () => {
      marker.remove();
      map.remove();
    };
  }, [center, zoom, isPreview, markers, sources, layers]);

  const handleSelectLocation = ({ lat, lng }: { lat: number; lng: number }) => {
    if (!mapRef.current) return;
    if (!markerRef.current) return;
    mapRef.current.flyTo({ center: [lng, lat], zoom: 20 });
    markerRef.current.setLngLat([lng, lat]);
    setLocalCenter([lng, lat]);
  };

  const handleZoomIn = () => {
    if (!mapRef.current) return;
    mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (!mapRef.current) return;
    mapRef.current.zoomOut();
  };

  const handleOnSelect = useCallback(() => {
    if (onSelect) onSelect(localCenter);
  }, [localCenter, onSelect]);

  return (
    <MapboxContext.Provider
      value={{
        onSelect: handleOnSelect,
        onSelectTextButton,
        handleSelectLocation,
        handleZoomIn,
        handleZoomOut,
      }}
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <div
          className={cn(
            "relative w-full flex md:h-full overflow-hidden",
            "[&_.map-container]:w-full [&_.map-container]:h-full [&_.map-container]:min-h-[474px] [&_.map-container]:overflow-hidden",
            "[&_.map-container_.mapboxgl-canvas]:max-w-full [&_.map-container_.mapboxgl-canvas]:object-cover [&_.mapboxgl-control-container]:hidden",
            className
          )}
        >
          <div className='map-container' ref={mapContainerRef} />
        </div>
        {!isPreview && (
          <div className='desktop-on-select hidden md:flex'>
            <SelectLocation />
          </div>
        )}
      </div>
    </MapboxContext.Provider>
  );
};

export default MapboxMap;
