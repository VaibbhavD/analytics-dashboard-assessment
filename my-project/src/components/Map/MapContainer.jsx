import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "./MapStyles.css";

import markerIconImg from "./image.png"; // Custom marker icon

const MapContainer = ({ data }) => {
  const mapRef = useRef(null); // Use ref to store the map instance

  useEffect(() => {
    // Check if the map instance already exists
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = L.map("map").setView([47.610365, -122.30839], 8); // Default to San Francisco

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Define a custom icon
    const customIcon = L.icon({
      iconUrl: markerIconImg,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // Add marker clustering
    const markers = L.markerClusterGroup();

    // Add markers to the map
    data.forEach((item) => {
      const [lng, lat] = item["Vehicle Location"]
        .replace("POINT (", "")
        .replace(")", "")
        .split(" ");

      const marker = L.marker([parseFloat(lat), parseFloat(lng)], {
        icon: customIcon,
      }).bindPopup(
        ` <img src="https://icon-library.com/images/car-icon-png/car-icon-png-23.jpg" width="50px"/> 
         <strong>Model-${item.Make} ${item.Model}</strong><br>
        <strong>Year:</strong> ${item["Model Year"]}<br>
        <strong>Postal Code:</strong> ${item["Postal Code"]}<br>
        <strong>Vehicle Type:</strong> ${item["Electric Vehicle Type"]} miles
        `
      );

      markers.addLayer(marker);
    });

    // Add marker cluster to the map
    mapRef.current.addLayer(markers);

    // Cleanup markers when the component unmounts
    return () => {
      mapRef.current.removeLayer(markers);
    };
  }, [data]); // Dependency array ensures useEffect runs when 'data' changes

  return <div id="map" className="map-container mt-10 z-0"></div>;
};

export default MapContainer;
