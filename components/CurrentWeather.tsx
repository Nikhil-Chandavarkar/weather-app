'use client';

import { Cloud, Wind, Droplets, Eye, Gauge, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CurrentWeatherProps {
  current: any;
}

export default function CurrentWeather({ current }: CurrentWeatherProps) {
  const weatherMetrics = [
    {
      label: 'Feels Like',
      value: `${Math.round(current.feelslike_c)}°C`,
      icon: Cloud,
      color: 'text-blue-400',
    },
    {
      label: 'Wind Speed',
      value: `${Math.round(current.wind_kph)} km/h`,
      icon: Wind,
      color: 'text-cyan-400',
    },
    {
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: Droplets,
      color: 'text-blue-300',
    },
    {
      label: 'Visibility',
      value: `${Math.round(current.visibility_km)} km`,
      icon: Eye,
      color: 'text-purple-400',
    },
    {
      label: 'Pressure',
      value: `${Math.round(current.pressure_mb)} mb`,
      icon: Gauge,
      color: 'text-indigo-400',
    },
    {
      label: 'UV Index',
      value: `${Math.round(current.uv)}`,
      icon: Zap,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Weather Display */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-7xl font-bold text-white mb-2">
                {Math.round(current.temp_c)}°C
              </div>
              <div className="text-2xl text-blue-200 mb-4">
                {current.condition}
              </div>
              <div className="text-slate-300">
                Feels like {Math.round(current.feelslike_c)}°C
              </div>
            </div>
            {current.icon && (
              <img
                src={`https:${current.icon}`}
                alt={current.condition}
                className="w-32 h-32"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherMetrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card
              key={metric.label}
              className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <IconComponent className={`w-4 h-4 ${metric.color}`} />
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Details */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <div className="text-slate-400 text-sm mb-1">Precipitation</div>
              <div className="text-xl font-semibold text-white">
                {current.precipitation_mm} mm
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Wind Gust</div>
              <div className="text-xl font-semibold text-white">
                {Math.round(current.gust_kph)} km/h
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Temperature</div>
              <div className="text-xl font-semibold text-white">
                {Math.round(current.temp_f)}°F
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
