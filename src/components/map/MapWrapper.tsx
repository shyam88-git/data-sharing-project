import { MapContainer, TileLayer } from "react-leaflet";
import { GauradahaCenter } from "../../config/mapConfig";
import { LatLngExpression } from "leaflet";

interface PropsI {
  children?: React.ReactNode;
  centerPos?: LatLngExpression | null;
}

const MapWrapper = ({ children, centerPos = null }: PropsI) => {
  return (
    <MapContainer center={centerPos || GauradahaCenter} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default MapWrapper;
