import React, { useState } from 'react';
import Map, { GeolocateControl } from 'react-map-gl/mapbox'; //archivo de node_modules
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZDFlZ28tYXJ0IiwiYSI6ImNtYnU0ZDJtdzAwZHEybG45OWo1cTIyZzEifQ.8Y_DuVk8DEoD-iNp17_klQ'; //token mapa personal 
const mapStyle = "mapbox://styles/d1ego-art/cmbzabkwd01hs01s20pqp566c"; // Puedes cambiar el estilo

const MapboxMap = () => { 
 
  return (
    <div style={{ 
      width: '100%',
       height: '600px',
        borderRadius: '10px',
         overflow: 'hidden',
          boxShadow: '0 8px 8px #aaa'
           }}>
      <Map
         initialViewState={{
          longitude: -70.651,
          latitude: -33.438,
          zoom: 10,
          pitch: 60
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        >
        <GeolocateControl
        position='top-left' //ubicación geoicon
        positionOptions={{enableHighAccuracy: true}}
         trackUserLocation={true}
        showUserHeading={true}
        />


      </Map>
    </div>
  );
};

export default MapboxMap;
