import React, { useState, useEffect } from 'react';

import { Map as GoogleMap, ControlPosition, MapControl, AdvancedMarker } from '@vis.gl/react-google-maps';
import MarkerForm from "./MarkerForm.tsx";

const mapContainerStyle = {
  width: "70vw",
  height: "70vh",
};



const Map = ({ center, markers }) => {

    const [selectedMarker, setSelectedMarker] = useState(null);

    const geocodeLatLng = async (lat, lng) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: lat, lng: lng };

      let addressComponents;
      
      await geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK") {
              if (results[0]) {
                  // Get the unformatted address components
                  addressComponents = results[0].address_components;

                  console.log(addressComponents);
                  // You can extract individual components as needed
                  const addressData = {
                      street_number: '',
                      street: '',
                      city: '',
                      state: '',
                      postal_code: '',
                      country: ''
                  };
  
                  console.log(addressData); // This will contain the individual components

              } else {
                  console.log("No results found");
              }
          } else {
              console.log("Geocoder failed due to: " + status);
          }
      });

      
      return addressComponents;
  }

  return (
    <>
        <GoogleMap
        style={mapContainerStyle}
        defaultCenter={center}
        defaultZoom={12}
        mapId={"DEMO_MAP_ID"}
        >
        <MapControl position={ControlPosition.TOP_LEFT}>
        </MapControl>

        {markers.map((marker) => (
            <AdvancedMarker 
                key={marker.place_id}
                position={{
                    lat: marker.geometry.location.lat(), 
                    lng: marker.geometry.location.lng() 
                }} 
                onClick={async () => {
                    console.log("marker selected: ", marker)

                    let addyData = await geocodeLatLng(marker.geometry.location.lat(), marker.geometry.location.lng());

                    console.log("addyyy: ", addyData)
                    // make geocoding request here for detailed addy data?
                    //

                    const testData = {...marker, detailedAddyData: addyData};

                    console.log("this hwo it lok: ",testData)

                    setSelectedMarker({...marker, detailedAddyData: addyData})
                }}
            />
        ))}

        </GoogleMap>
    

    {selectedMarker && 
      <MarkerForm 
        name={selectedMarker.name}
        address={`${selectedMarker.detailedAddyData.find((component) => component.types.includes('street_number'))?.long_name} ${selectedMarker.detailedAddyData.find((component) => component.types.includes('route'))?.long_name}`}
        city={selectedMarker.detailedAddyData.find((component) => component.types.includes('locality'))?.long_name}
        state={selectedMarker.detailedAddyData.find((component) => component.types.includes("administrative_area_level_1"))?.long_name}
        zip={selectedMarker.detailedAddyData.find((component) => component.types.includes("postal_code"))?.long_name}
      />
    }

    </>
  );
};

export default Map;