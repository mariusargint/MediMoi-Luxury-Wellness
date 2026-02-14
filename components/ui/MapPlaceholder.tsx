
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  status: 'verified' | 'pending';
}

interface MapPlaceholderProps {
  markers?: Marker[];
  center?: { lat: number; lng: number };
  onMarkerClick?: (marker: Marker) => void;
  className?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ 
  markers = [], 
  center = { lat: 51.5074, lng: -0.1278 }, // Default to London
  onMarkerClick,
  className = "" 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lng],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    // Add CartoDB Positron Tiles (Minimalist grayscale look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when they change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    markers.forEach((marker) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin ${marker.status}"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const leafletMarker = L.marker([marker.lat, marker.lng], { icon })
        .bindTooltip(`
          <div class="bg-medimoi-black text-white p-2 text-[9px] uppercase tracking-widest font-sans rounded-none shadow-xl border-none">
            ${marker.label}
          </div>
        `, {
          direction: 'top',
          offset: [0, -10],
          opacity: 1,
          className: 'custom-tooltip'
        })
        .addTo(markersLayerRef.current!);

      leafletMarker.on('click', () => {
        if (onMarkerClick) onMarkerClick(marker);
        mapInstanceRef.current?.flyTo([marker.lat, marker.lng], 15, { duration: 1.5 });
      });
    });

    // Adjust view if markers exist and no specific center was forced recently
    if (markers.length > 0) {
      const group = new L.FeatureGroup(Object.values(markersLayerRef.current.getLayers() as any));
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [markers]);

  return (
    <div className={`relative bg-[#F9F7F2] ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Visual Overlays for Luxury feel */}
      <div className="absolute inset-0 pointer-events-none border border-medimoi-black/5 z-10" />
      
      <div className="absolute bottom-8 right-8 flex flex-col space-y-2 z-20">
        <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-2 border border-medimoi-black/5 shadow-xl pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-medimoi-gold border border-white" />
          <span className="text-[9px] uppercase tracking-widest font-bold">Verified Clinics</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-2 border border-medimoi-black/5 shadow-xl pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-400 border border-white" />
          <span className="text-[9px] uppercase tracking-widest font-bold">Pending Applications</span>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
