import L from "leaflet";

export const customIcon = new L.Icon({
  iconUrl: "/location-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
export var myIcon = L.divIcon({ className: "custom-div-icon-size-small" });

export const highlightIcon = new L.Icon({
  iconUrl: "/location-icon-red.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const dataSizeIconSelector = (
  count: number,
  highlight?: boolean
): L.DivIcon => {
  if (highlight)
    return L.divIcon({ className: `custom-div-icon-size-highlight` });

  const IconSize = count > 1 ? (count > 3 ? "medium" : "large") : "small";
  return L.divIcon({ className: `custom-div-icon-size-${IconSize}` });
};
