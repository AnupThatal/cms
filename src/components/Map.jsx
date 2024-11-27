import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = () => {
  const position = [27.7172, 85.3240]; // Example position

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Kathmandu</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
