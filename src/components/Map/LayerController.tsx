import { LayersControl, TileLayer } from 'react-leaflet';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { env } from '../../env';

const googleMapApiKey: string | undefined = env.google.mapApiKey;

function LayerController(): React.ReactElement {
  return (
    <LayersControl position="topright" autoZIndex={true}>
      <LayersControl.BaseLayer checked name="Google Roadmap">
        <ReactLeafletGoogleLayer type="roadmap" maxZoom={19} apiKey={googleMapApiKey} />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Google Satellite">
        <ReactLeafletGoogleLayer type="satellite" maxZoom={19} apiKey={googleMapApiKey} />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Google Hybrid">
        <ReactLeafletGoogleLayer type="hybrid" maxZoom={19} apiKey={googleMapApiKey} />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Google Terrain">
        <ReactLeafletGoogleLayer type="terrain" maxZoom={15} apiKey={googleMapApiKey} />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="CartoDB Dark Matter">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="CartoDB Positron">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Esri.WorldImagery">
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
}

export default LayerController;
