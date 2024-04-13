import { Popup, Tooltip } from "react-leaflet";
import { GeoJsonPropertiesI } from "../../utils/interfaces/geoJson";

interface PropsI {
  properties: GeoJsonPropertiesI;
}

const InfoTooltip = ({ properties }: PropsI) => {
  return (
    <>
      {properties.name && <Popup>{properties.name}</Popup>}
      <Tooltip>
        <div>
          <strong>Name</strong>: {properties?.name || "NULL"}
          <br />
          <strong>Ref RD</strong>: {properties?.ref_rd || "NULL"}
          <br />
          <strong>RD Name</strong>: {properties?.rd_name || "NULL"}
          <br />
          <strong>Ward No</strong>: {properties?.ward_no || "NULL"}
        </div>
      </Tooltip>
    </>
  );
};

export default InfoTooltip;
