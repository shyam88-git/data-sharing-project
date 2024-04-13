import { useEffect, useState } from "react";
import MapWrapper from "../../components/map/MapWrapper";
import {
  GisFileI,
  IGisPropertiesResponse,
  useGetGisFileByIdQuery,
  useGetGisPropertiesQuery,
} from "../../store/modules/gis-file/gisFileApi";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Marker, Polygon, Polyline, useMap } from "react-leaflet";
import { GeoJsonFeatureI, Coordinate } from "../../utils/interfaces/geoJson";
import {
  TransformedLineCoordinates,
  TransformedPointCoordinates,
  TransformedPolygonCoordinates,
} from "../../utils/helpers/transformed-coordinates";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import InfoTooltip from "../../components/map/InfoTooltip";
import { LatLngExpression } from "leaflet";

import SampleMap from "../../components/map/SampleMap";
import { notEmptyObject } from "../../utils/helpers/validator";
import { SearchParamsI } from "../../utils/interfaces/common";
import useToastHook from "../../utils/hooks/toast/useToastHook";
import { dataSizeIconSelector } from "../../utils/helpers/map-icon-helper";

interface PropsI {
  activeGis: GisFileI | null;
  setGisDataInfo: React.Dispatch<React.SetStateAction<GisFileI | null>>;
  selectedPosition: LatLngExpression | null;
  selectedPositionId: string | null;
  setPropertiesList: React.Dispatch<
    React.SetStateAction<IGisPropertiesResponse | null>
  >;
  propertiesParams: SearchParamsI;
}

const ShowMap = ({
  activeGis,
  setGisDataInfo,
  selectedPosition,
  selectedPositionId,
  setPropertiesList,
  propertiesParams,
}: PropsI) => {
  const highLightOptions = { color: "red", fillColor: "red" };
  const { showToast } = useToastHook();

  // STATE
  const [features, setFeatures] = useState<GeoJsonFeatureI[]>([]);

  // REDUX
  const { data: gisData, isLoading } = useGetGisFileByIdQuery({
    id: activeGis?.id.toString() || "",
  });
  const { data: gisProperties } = useGetGisPropertiesQuery({
    id: activeGis?.id.toString() || "",
    params: propertiesParams,
  });

  // USE EFFECT
  useEffect(() => {
    if (gisData?.geojson) {
      setFeatures(gisData.geojson?.features);
      setGisDataInfo(gisData);
    } else if (!gisData && !isLoading) {
      showToast("Select file to plot  map", { type: "info" });
    }
  }, [gisData, setGisDataInfo, isLoading]);

  useEffect(() => {
    if (gisProperties && notEmptyObject(gisProperties)) {
      setPropertiesList(gisProperties);
    }
  }, [gisProperties]);

  if (!gisData) {
    return <SampleMap />;
  }

  return (
    <>
      {features.length ? (
        <MapWrapper>
          <MarkerClusterGroup chunkedLoading>
            {features?.map((feature) => {
              const geometry = feature.geometry;

              const coordinates = feature.geometry.coordinates;
              const properties = feature.properties;

              if (geometry.type.toLowerCase() === "point") {
                return (
                  <>
                    <Marker
                      position={TransformedPointCoordinates(coordinates)}
                      icon={
                        feature.id === selectedPositionId
                          ? dataSizeIconSelector(
                              feature.properties?.data_count || 0,
                              true
                            )
                          : dataSizeIconSelector(
                              feature.properties?.data_count || 0
                            )
                      }
                    >
                      <InfoTooltip properties={properties} />
                    </Marker>
                  </>
                );
              }
              if (geometry.type.toLowerCase() === "multipoint") {
                return coordinates.map((coordinate: Coordinate) => (
                  <Marker
                    position={TransformedPointCoordinates(coordinate)}
                    icon={
                      feature.id === selectedPositionId
                        ? dataSizeIconSelector(
                            feature.properties?.data_count || 0,
                            true
                          )
                        : dataSizeIconSelector(
                            feature.properties?.data_count || 0
                          )
                    }
                  >
                    <InfoTooltip properties={properties} />
                  </Marker>
                ));
              }

              if (geometry.type.toLocaleLowerCase() === "linestring") {
                const limeOptions = { color: "lime" };
                return (
                  <Polyline
                    pathOptions={
                      feature.id === selectedPositionId
                        ? highLightOptions
                        : limeOptions
                    }
                    positions={TransformedLineCoordinates(coordinates)}
                  >
                    <InfoTooltip properties={properties} />
                  </Polyline>
                );
              }
              if (geometry.type.toLocaleLowerCase() === "polygon") {
                const purpleOptions = { color: "purple" };
                return (
                  <Polygon
                    pathOptions={
                      feature.id === selectedPositionId
                        ? highLightOptions
                        : purpleOptions
                    }
                    positions={TransformedPolygonCoordinates(coordinates)}
                  >
                    <InfoTooltip properties={properties} />
                  </Polygon>
                );
              }
            })}
            {!!selectedPosition && (
              <LocationMarker position={selectedPosition} />
            )}
          </MarkerClusterGroup>
        </MapWrapper>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default ShowMap;

const LocationMarker = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 18);
    }
  }, [position, map]);
  return position === null ? null : (
    <></>
    // <Marker position={position}>{/* <Popup>You are here</Popup> */}</Marker>
  );
};
