import { useState, useEffect, useRef, useMemo } from "react";
import {APIProvider, Map, useMap, AdvancedMarker, Pin, useMapsLibrary,} from "@vis.gl/react-google-maps";
import { SearchBar } from "../components/SearchBar";
import { PlaceListWebComponent } from "../components/PlaceListWebComponent";
import { PlaceDetailsMarker } from "../components/PlaceDetailsMarker";
import { Circle } from "../components/Circle";
import "./App.css";

export type PlaceType =
  | "restaurant"
  | "cafe"
  | "bicycle_store"
  | "supermarket"
  | "drugstore"
  | "police"
  | "convenience_store"
  | "post_office"
  | "train_station"
  | "subway_station"
  | "transit_station"
  | "hospital"
  | "doctor"
  | "school"
  | null;

export type DetailsSize = "COMPACT" | "FULL";

function App() {
  const [places, setPlaces] = useState<google.maps.places.Place[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [placeType, setPlaceType] = useState<PlaceType>("supermarket");
  const [detailsSize, setDetailsSize] = useState<DetailsSize>("COMPACT");
  const [center, setCenter] = useState({ lat: 34.67510111, lng: 135.50037173 });
  const [radius, setRadius] = useState(0);

const MAP_CONFIG = {
  defaultZoom: 14,
  defaultCenter:{ lat: 34.67510111, lng: 135.50037173 },
  mapId: import.meta.env.VITE_MARKETS_MAP_ID,
  gestureHandling: 'greedy' as const,
  // clickableIcons: false,
    // disableDefaultUI: true,
};

  const placeMarkers = useMemo(() => {
    return places.map((place, index) => (
      <PlaceDetailsMarker
        detailsSize={detailsSize}
        key={place.id || index}
        selected={place.id === selectedPlaceId}
        place={place}
        onClick={() => setSelectedPlaceId(place.id)}
      />
    ));
  }, [places, selectedPlaceId, detailsSize]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY} version="alpha">

    <div className="places-ui-kit">
      <div className="map-container">
        <SearchBar
          placeType={placeType}
          setPlaceType={setPlaceType}
          setLocationId={setLocationId}
          onCenterChange={setCenter}
          detailsSize={detailsSize}
          onDetailSizeChange={setDetailsSize}
          setDetailsSize={setDetailsSize}
          radius={radius}
          onRadiusChange={setRadius}
        />
          <Map {...MAP_CONFIG} onClick={() => setSelectedPlaceId(null)}>
          {...placeMarkers}

          <AdvancedMarker position={center}>
            <Pin
              background={"Gold"}
              borderColor={"Black"}
              glyphColor={"Black"}
              scale={1.1}
            />
          </AdvancedMarker>
          <Circle
            center={center}
            strokeOpacity={0.3}
            fillColor={radius <= 5000 ? "Green" : "Red"}
            fillOpacity={0.2}
            radius={radius}
          />
        </Map>
      </div>
        <div className="place-list-wrapper">
          <PlaceListWebComponent
            placeType={placeType}
            locationId={locationId}
            setPlaces={setPlaces}
            onPlaceSelect={place => setSelectedPlaceId(place?.id ?? null)}
          />
        </div>
      </div>
    </APIProvider>
  );
}

export default App
