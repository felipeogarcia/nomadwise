import { useEffect, useRef, useState } from 'react'
import { useOvernightStore } from '@/stores/useOvernightStore'

export default function OvernightMap({ tripId }: { tripId: string }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)
  const { overnights } = useOvernightStore()

  const tripOvernights = overnights.filter(
    (o) => o.tripId === tripId && typeof o.lat === 'number' && typeof o.lng === 'number',
  )

  useEffect(() => {
    if ((window as any).L) {
      setIsLeafletLoaded(true)
      return
    }

    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(css)

    const script = document.createElement('script')
    script.id = 'leaflet-script'
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => setIsLeafletLoaded(true)
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!isLeafletLoaded || !mapRef.current) return
    const L = (window as any).L
    if (!L) return

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([-15.7801, -47.9292], 4)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current)
    }

    const map = mapInstanceRef.current

    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) map.removeLayer(layer)
    })

    if (tripOvernights.length === 0) return

    const bounds = L.latLngBounds()
    const tentSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary fill-primary/10"><path d="M19 20 10 4"/><path d="m5 20 9-16"/><path d="M3 20h18"/><path d="m12 15-3 5"/><path d="m12 15 3 5"/></svg>`

    const customIcon = L.divIcon({
      html: `<div class="bg-background rounded-full p-1.5 shadow-md border border-primary/40 flex items-center justify-center text-primary hover:scale-110 transition-transform cursor-pointer">${tentSvg}</div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    })

    tripOvernights.forEach((o) => {
      if (o.lat === undefined || o.lng === undefined) return
      const marker = L.marker([o.lat, o.lng], { icon: customIcon }).addTo(map)
      bounds.extend([o.lat, o.lng])

      const costStr = o.cost > 0 ? `R$ ${o.cost.toFixed(2)}` : 'Gratuito'
      const popupContent = `
        <div class="p-1 min-w-[150px] font-sans">
          <h3 class="font-bold text-sm mb-0.5">${o.name}</h3>
          <p class="text-xs text-muted-foreground mb-2 capitalize">${o.type}</p>
          <div class="flex justify-between items-center">
            <span class="text-xs font-semibold">${costStr}</span>
            <span class="text-yellow-500 text-xs font-medium flex items-center">★ ${o.rating}</span>
          </div>
        </div>
      `
      marker.bindPopup(popupContent)
    })

    if (tripOvernights.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [isLeafletLoaded, tripOvernights])

  return (
    <div className="w-full h-full relative bg-muted/20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .leaflet-pane { z-index: 10 !important; }
        .leaflet-top, .leaflet-bottom { z-index: 10 !important; }
        .leaflet-popup-content-wrapper { border-radius: 0.5rem; background: hsl(var(--background)); color: hsl(var(--foreground)); border: 1px solid hsl(var(--border)); }
        .leaflet-popup-tip { background: hsl(var(--background)); border: 1px solid hsl(var(--border)); }
        .leaflet-container { font-family: inherit; }
      `,
        }}
      />
      {!isLeafletLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground text-sm font-medium animate-pulse">
            Carregando mapa interativo...
          </span>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full z-0" />
    </div>
  )
}
