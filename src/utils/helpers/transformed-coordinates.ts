import { LatLngExpression } from "leaflet";
import proj4 from "proj4";
import useToastHook from "../hooks/toast/useToastHook";

type CoordinatesPointType = [number, number];
type CoordinatesPolygonType = [CoordinatesPointType[]];
const { showToast } = useToastHook();

function isProjectedCoordinates(coordinates: CoordinatesPointType) {
  const isGeographic =
    Array.isArray(coordinates) &&
    coordinates.length === 2 &&
    typeof coordinates[0] === "number" &&
    typeof coordinates[1] === "number" &&
    Math.abs(coordinates[0]) <= 90 &&
    Math.abs(coordinates[1]) <= 180;

  return !isGeographic;
}

// for point
export const TransformedPointCoordinates = (
  coordinates: CoordinatesPointType
): LatLngExpression => {
  const originalProjection =
    "+proj=utm +zone=45 +datum=WGS84 +units=m +no_defs";
  const leafletProjection = "+proj=longlat +datum=WGS84 +no_defs";

  // const transformedCoords: LatLngExpression = proj4(
  //   originalProjection,
  //   leafletProjection,
  //   coordinates
  // );

  // return transformedCoords.reverse();

  if (!isProjectedCoordinates(coordinates))
    return [coordinates[1], coordinates[0]];

  try {
    const transformedCoords: number[] | undefined = proj4(
      originalProjection,
      leafletProjection,
      coordinates
    );

    if (transformedCoords && transformedCoords.length === 2) {
      const [latitude, longitude] = transformedCoords.reverse();
      return [latitude, longitude];
    } else {
      throw new Error("Invalid transformed coordinates");
    }
  } catch (error) {
    showToast("Failed to transform coordinates", { type: "error" });
    throw new Error("Failed to transform coordinates");
  }
};

// for multi point
export const TransformedLineCoordinates = (
  coordinates: CoordinatesPointType[]
) => {
  return coordinates.map((cor) => TransformedPointCoordinates(cor));
};

// for polygon
export const TransformedPolygonCoordinates = (
  coordinates: CoordinatesPolygonType
) => {
  return coordinates.map((cor) => TransformedLineCoordinates(cor));
};

export const getPolygonCenterPoint = (coordinates: any) => {
  const transformedCoordinates = TransformedPolygonCoordinates(coordinates);
  const latitudes: number[] = transformedCoordinates[0].map(
    //@ts-ignore
    (point) => point[1]
  );
  const longitudes: number[] = transformedCoordinates[0].map(
    //@ts-ignore
    (point) => point[0]
  );

  // Calculate the average latitude and longitude
  const centerLatitude: number =
    latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
  const centerLongitude: number =
    longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;

  return [centerLongitude, centerLatitude];
};
