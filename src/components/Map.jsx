import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  // console.log("Map--searchParams", searchParams);
  // console.log("Map--mapLat", mapLat);
  // console.log("Map--mapLng", mapLng);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      console.log(geoLocationPosition);
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
        console.log("set Geo Map Position=", geoLocationPosition);
      } else {
        console.log("geoLocationPosition is still NULL");
      }
    },
    [geoLocationPosition]
  );

  // console.log("Map--mapPosition", mapPosition);

  // let centerPoint = mapPosition;
  // if (searchParams && mapLat && mapLng) centerPoint = [mapLat, mapLng];

  return (
    <div className={styles.mapContainer}>
      {console.log("Geoposition before button:", geoLocationPosition)}
      if(!geoLocationPosition) (
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>
      )
      <MapContainer
        // center={mapLat && mapLng ? [mapLat, mapLng] : mapPosition}
        // center={centerPoint}
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map((city) => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
