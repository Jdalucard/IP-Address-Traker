import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import position from "./position.module.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Markerposition from "./Markerposition";
import back from "../assets/ip-address-tracker-master/images/pattern-bg-desktop.png";
import backMobile from "../assets/ip-address-tracker-master/images/pattern-bg-mobile.png";
import Title from "../Components/Title/Title";
import arrow from "../assets/ip-address-tracker-master/images/icon-arrow.svg";

const Contextmap = () => {
  const [address, setAdress] = useState(null);
  const [IpAddress, setIpAddress] = useState("");
  const [geoData, setGeoData] = useState({ lat: null, lng: null });

  /* address.location.lat, address.location.lng */

  useEffect(() => {
    try {
      const getInitialdata = async () => {
        const rest = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${
            import.meta.env.VITE_APP_KEY
          }&ipAddress=8.8.8.8`
        );
        const data = await rest.json();
        setAdress(data);
        setGeoData(data.location);
      };
      getInitialdata();
    } catch (error) {
      console.trace(error);
    }
  }, []);

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  const getEnteredData = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        import.meta.env.VITE_APP_KEY
      }&${
        checkIpAddress.test(IpAddress)
          ? `ipAddress=${IpAddress}`
          : checkDomain.test(IpAddress)
          ? `domain=${IpAddress}`
          : ""
      }`
      // https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=8.8.8.8&domain=google.com
    );
    const data = await res.json();
    setAdress(data);
    setGeoData(data.location);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredData();
    setIpAddress("");
  };

  return (
    <>
      <section className={styles.containerInput}>
        <div className={styles.imageBack}>
          <picture className="product__img">
            <source srcSet={backMobile} media="(max-width: 768px)" />
            <img src={back} alt="imagen" />
          </picture>
          <div className={styles.container}>
            <Title title="IP Address Traker" />
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <div>
                <input
                  type="text"
                  name="IpAddress"
                  id="IpAddress"
                  placeholder="Search for any IP address or domain"
                  value={IpAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                />
              </div>

              <button type="submit">
                <div className={styles.imgsubmit}>
                  <img src={arrow} alt="" />
                </div>
              </button>
            </form>

            {address && (
              <article className={styles.containerApi}>
                <div>
                  <h2>Ip Adress</h2>
                  <p>{address.ip}</p>
                </div>
                <div className={styles.child}>
                  <h2>Location</h2>
                  <p>
                    {address.location.city},{address.location.region}
                  </p>
                </div>
                <div className={styles.child}>
                  <h2>Time Zone </h2>
                  <p>{address.location.timezone}</p>
                </div>
                <div className={styles.child}>
                  <h2>Isp</h2>
                  <p>{address.isp}</p>
                </div>
              </article>
            )}
          </div>
        </div>

        <MapContainer
          className={position.MapContainer}
          center={{ lat: geoData.lat, lng: geoData.lng }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markerposition geoData={geoData} />
        </MapContainer>
      </section>
    </>
  );
};

export default Contextmap;
