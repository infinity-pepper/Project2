import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const SearchBar = ({ onPlaceSelected }) => {
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      const placeDetails = {
        name: place.name, 
        address: place.formatted_address, 
      };

      onPlaceSelected(location, placeDetails); 
    }
  };

  return (
    <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect}>
      <input
        type="text"
        placeholder="Search for address"
        style={{
          width: '100%',
          height: '40px',
          fontSize: '16px',
        }}
      />
    </Autocomplete>
  );
};

export default SearchBar;