import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/Map.css';
import SearchBar from './SearchBar';

const libraries = ['places'];

const Map = forwardRef((props, ref) => {
  const [map, setMap] = useState(null);
  const [searchCenter, setSearchCenter] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const mapStyles = {
    height: "18rem",
    width: "35rem",
  };

  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchDetails, setSearchDetails] = useState({});

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
  };

  const handlePlaceSelected = (location, placeDetails) => {
    setSearchCenter(location);
    setMarkerPosition(location);
    setSearchDetails(placeDetails);
    if (map) map.panTo(location);
  };

  useImperativeHandle(ref, () => ({
    getAddress: () => searchDetails.address || '',
  }));

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyDUXMyv1HGsUOBTIIjee41qI4IO6dnCN2k" libraries={libraries}>
        <SearchBar onPlaceSelected={handlePlaceSelected} />
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={searchCenter}
          zoom={12}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
});

export default Map;
