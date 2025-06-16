import React from 'react';
import Map, { Marker } from 'react-map-gl/mapbox'; //archivo de node_modules
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZDFlZ28tYXJ0IiwiYSI6ImNtYnU0ZDJtdzAwZHEybG45OWo1cTIyZzEifQ.8Y_DuVk8DEoD-iNp17_klQ'; //token mapa personal 
const mapStyle = "mapbox://styles/d1ego-art/cmbv4rj3l019d01s6ckfj601j"; // Puedes cambiar el estilo

const MapboxMap = ({ latitude = -33.449, longitude = -70.671, zoom = 12 , pitch = 20}) => {
  return (
    <div style={{ width: '100%', height: '600px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px #aaa' }}>
      <Map
        initialViewState={{
          longitude,
          latitude,
          zoom,
          pitch
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={longitude} latitude={latitude} color="green
        " />
      </Map>
    </div>
  );
};

export default MapboxMap;
