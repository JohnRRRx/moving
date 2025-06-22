import React, { memo, useMemo } from "react";
import { AutocompleteWebComponent } from "./AutocompleteWebComponent";
import type { PlaceType, DetailsSize } from "../src/App";
import ControlPanel from "../components/ControlPanel";
import GetRadius from "./GetRadius";

interface Props {
  setLocationId: (placeId: string | null) => void;
  placeType: PlaceType;
  setPlaceType: (placeType: PlaceType) => void;
  onCenterChange: (center: { lat:number; lng: number }) => void;
  detailsSize: DetailsSize;
  setDetailsSize: (detailsSize: DetailsSize) => void;
  onDetailSizeChange: (detailsSize: DetailsSize) => void;
  radius: number;
  onRadiusChange:(value: number)=> void;
}

interface PlaceTypeOption {
  value: PlaceType;
  label: string;
}

export const SearchBar = memo(function SearchBar({
  placeType,
  setPlaceType,
  setLocationId,
  onCenterChange,
  detailsSize,
  setDetailsSize,
  radius,
  onRadiusChange,
}: Props) {
  const placeTypeOptions: PlaceTypeOption[] = useMemo(
    () => [
      { value: "supermarket", label: "スーパー" },
      { value: "convenience_store", label: "コンビニ" },
      { value: "restaurant", label: "レストラン" },
      { value: "cafe", label: "カフェ" },
      { value: "bicycle_store", label: "自転車屋" },
      { value: "drugstore", label: "ドラッグストア" },
      { value: "police", label: "警察署" },
      { value: "hospital", label: "病院" },
      { value: "doctor", label: "クリニック" },
      { value: "school", label: "学校" },
      { value: "post_office", label: "郵便局" },
      { value: "train_station", label: "鉄道駅" },
      { value: "subway_station", label: "地下鉄" },
      { value: "transit_station", label: "乗換駅" },
    ],
    []
  );

  const handlePlaceTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPlaceType(event.target.value as PlaceType);
  };

  return (
    <div
      className="autocomplete-wrapper"
      role="search"
      aria-label="Location search"
    >
      <AutocompleteWebComponent
        onPlaceSelect={(place) => {
          setLocationId(place?.id ?? null);
          if (place?.location) {
            onCenterChange({
              lat: place.location.lat(),
              lng: place.location.lng(),
            });
          }
        }}/>
      <span className="near">付近の</span>
      <select
        id="place-type-select"
        value={placeType ?? ""}
        onChange={handlePlaceTypeChange}
      >
        {placeTypeOptions.map((option) => (
          <option key={option.value} value={option.value || ""}>
            {option.label}
          </option>
        ))}
      </select>

      <ControlPanel
        detailsSize={detailsSize}
        onDetailSizeChange={setDetailsSize}
      />
      <GetRadius value={radius} onChange={onRadiusChange}/>
    </div>
  );
});
