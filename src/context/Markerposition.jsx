import { Marker, Popup, useMap } from "react-leaflet";
import icon from "../helper/icon";
import styles from "./position.module.css";
import { useEffect } from "react";

const MapRender = ({ geoData }) => {
  const position = { lat: geoData.lat, lng: geoData.lng };
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);
  /*  [51.505, -0.09] */
  return (
    <>
      <Marker icon={icon} className={styles.MapContainer} position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
};

export default MapRender;
