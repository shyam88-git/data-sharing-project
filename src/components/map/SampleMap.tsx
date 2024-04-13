import MarkerClusterGroup from "react-leaflet-cluster";
import MapWrapper from "./MapWrapper";
import { Marker } from "react-leaflet";
import InfoTooltip from "./InfoTooltip";
import { LatLngExpression } from "leaflet";
import { GeoJsonPropertiesI } from "../../utils/interfaces/geoJson";

const SampleProperty: GeoJsonPropertiesI = {
  name: "Kahtmandu",
  rd_name: null,
  ref_rd: null,
  ward_no: null,
};

const sampleCenterPos: LatLngExpression = [27.700381, 85.312444];

const SampleMap = () => {
  return (
    <MapWrapper centerPos={sampleCenterPos}>
      <MarkerClusterGroup chunkedLoading>
        <Marker position={sampleCenterPos}>
          <InfoTooltip properties={SampleProperty} />
        </Marker>
      </MarkerClusterGroup>
    </MapWrapper>
  );
};

export default SampleMap;
