import { useMemo, useState } from 'react'
import { Map, Navigation, MapPin } from 'lucide-react'
import { useItinerary } from '@/hooks/useItinerary'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface ItineraryMapProps {
  tripId: string
}

export default function ItineraryMap({ tripId }: ItineraryMapProps) {
  const { stops } = useItinerary(tripId)
  const [hoveredStop, setHoveredStop] = useState<string | null>(null)

  // Schematic SVG Route Map Implementation
  // Used to visualize plotted points and polylines safely without external mapping libraries.
  const { polylinePoints, projectedStops, viewBox } = useMemo(() => {
    const valid = stops.filter((s) => s.lat !== undefined && s.lng !== undefined)

    if (valid.length === 0)
      return { polylinePoints: '', projectedStops: [], viewBox: '0 0 1000 1000' }

    const lats = valid.map((s) => s.lat!)
    const lngs = valid.map((s) => s.lng!)
    const minLat = Math.min(...lats),
      maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs),
      maxLng = Math.max(...lngs)

    // Ensure we have a bounding box even for a single point
    const latDiff = maxLat - minLat || 1
    const lngDiff = maxLng - minLng || 1

    const padX = lngDiff * 0.2
    const padY = latDiff * 0.2

    const vMinX = minLng - padX
    const vMaxX = maxLng + padX
    const vMinY = minLat - padY
    const vMaxY = maxLat + padY

    // Map to an abstract 1000x1000 SVG grid
    const svgW = 1000,
      svgH = 1000

    const project = (lat: number, lng: number) => {
      // X maps to Longitude
      const x = ((lng - vMinX) / (vMaxX - vMinX)) * svgW
      // Y maps to Latitude (inverted because SVG Y goes down, but North goes up)
      const y = svgH - ((lat - vMinY) / (vMaxY - vMinY)) * svgH
      return { x, y }
    }

    const projected = valid.map((stop) => ({ ...stop, ...project(stop.lat!, stop.lng!) }))
    const pointsStr = projected.map((p) => `${p.x},${p.y}`).join(' ')

    return {
      polylinePoints: pointsStr,
      projectedStops: projected,
      viewBox: `0 0 ${svgW} ${svgH}`,
    }
  }, [stops])

  if (stops.filter((s) => s.lat && s.lng).length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-muted/20 text-muted-foreground p-6 text-center">
        <Map className="h-12 w-12 mb-4 opacity-20" />
        <h3 className="text-lg font-medium text-foreground">Mapa do Itinerário</h3>
        <p className="text-sm max-w-sm mt-2">
          Adicione paradas com coordenadas (latitude/longitude) para visualizar a rota esquemática
          da sua viagem.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 relative bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      {/* Decorative Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border text-xs font-medium flex items-center gap-2">
        <Navigation className="h-3.5 w-3.5 text-primary" /> Rota Esquemática
      </div>

      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full p-8 drop-shadow-sm"
      >
        {/* Connection Line */}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
          strokeDasharray="12 12"
        />

        {/* Nodes */}
        {projectedStops.map((stop, i) => (
          <Tooltip key={stop.id} delayDuration={100}>
            <TooltipTrigger asChild>
              <g
                className="cursor-pointer transition-transform hover:scale-110 origin-center"
                onMouseEnter={() => setHoveredStop(stop.id)}
                onMouseLeave={() => setHoveredStop(null)}
                style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
              >
                {/* Halo effect */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="24"
                  fill="hsl(var(--primary))"
                  className="opacity-10"
                />
                {/* Pin shadow */}
                <circle cx={stop.x} cy={stop.y + 4} r="10" fill="rgba(0,0,0,0.2)" />
                {/* Main pin */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={hoveredStop === stop.id ? '16' : '12'}
                  fill={
                    stop.status === 'visited' ? 'hsl(var(--primary))' : 'hsl(var(--background))'
                  }
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  className="transition-all duration-300"
                />
                {/* Number */}
                <text
                  x={stop.x}
                  y={stop.y}
                  textAnchor="middle"
                  dy=".3em"
                  className="text-[12px] font-bold fill-current"
                  fill={
                    stop.status === 'visited'
                      ? 'hsl(var(--primary-foreground))'
                      : 'hsl(var(--foreground))'
                  }
                >
                  {i + 1}
                </text>
              </g>
            </TooltipTrigger>
            <TooltipContent side="top" className="font-medium flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {stop.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </svg>
    </div>
  )
}
