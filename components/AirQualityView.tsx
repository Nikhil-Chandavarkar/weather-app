'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Leaf } from 'lucide-react';

interface AirQualityViewProps {
  current: any;
}

export default function AirQualityView({ current }: AirQualityViewProps) {
  const aqi = current.aqi;

  const getAQIStatus = (value: number) => {
    if (value <= 50) return { label: 'Good', color: 'bg-green-900/20 border-green-500/30', textColor: 'text-green-300' };
    if (value <= 100) return { label: 'Moderate', color: 'bg-yellow-900/20 border-yellow-500/30', textColor: 'text-yellow-300' };
    if (value <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-900/20 border-orange-500/30', textColor: 'text-orange-300' };
    if (value <= 200) return { label: 'Unhealthy', color: 'bg-red-900/20 border-red-500/30', textColor: 'text-red-300' };
    if (value <= 300) return { label: 'Very Unhealthy', color: 'bg-purple-900/20 border-purple-500/30', textColor: 'text-purple-300' };
    return { label: 'Hazardous', color: 'bg-red-950/40 border-red-600/50', textColor: 'text-red-400' };
  };

  const aqiStatus = aqi?.us_epa_index ? getAQIStatus(aqi.us_epa_index) : null;

  const pollutants = [
    { name: 'PM2.5', value: aqi?.pm2_5, unit: 'μg/m³', label: 'Fine Particles' },
    { name: 'PM10', value: aqi?.pm10, unit: 'μg/m³', label: 'Coarse Particles' },
    { name: 'NO₂', value: aqi?.no2, unit: 'ppb', label: 'Nitrogen Dioxide' },
    { name: 'O₃', value: aqi?.o3, unit: 'ppb', label: 'Ozone' },
    { name: 'SO₂', value: aqi?.so2, unit: 'ppb', label: 'Sulfur Dioxide' },
    { name: 'CO', value: aqi?.co, unit: 'ppm', label: 'Carbon Monoxide' },
  ];

  if (!aqi) {
    return (
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="pt-12 pb-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Air Quality Data Unavailable
          </h3>
          <p className="text-slate-400">
            Air quality data is not available for this location.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AQI Status Card */}
      {aqiStatus && (
        <Card className={`${aqiStatus.color} border`}>
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-300 mb-2">US EPA Air Quality Index</div>
                <div className={`text-5xl font-bold ${aqiStatus.textColor}`}>
                  {aqi.us_epa_index}
                </div>
                <div className={`text-lg font-semibold ${aqiStatus.textColor} mt-2`}>
                  {aqiStatus.label}
                </div>
              </div>
              <Leaf className={`w-20 h-20 ${aqiStatus.textColor}`} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pollutants Grid */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Pollutant Levels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pollutants.map((pollutant) => {
            if (!pollutant.value && pollutant.value !== 0) return null;

            return (
              <Card
                key={pollutant.name}
                className="bg-slate-800/30 border-slate-700/50"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    {pollutant.name}
                  </CardTitle>
                  <p className="text-xs text-slate-400 mt-1">{pollutant.label}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(pollutant.value * 100) / 100}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{pollutant.unit}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Air Quality Guidelines */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Health Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-white font-semibold mb-1">What does this mean?</div>
            <div className="text-slate-300 text-sm">
              {aqi.us_epa_index <= 50 &&
                'Air quality is satisfactory, and air pollution poses little or no risk.'}
              {aqi.us_epa_index > 50 && aqi.us_epa_index <= 100 &&
                'Air quality is acceptable. However, there may be risk for some people, particularly those who are unusually sensitive to air pollution.'}
              {aqi.us_epa_index > 100 && aqi.us_epa_index <= 150 &&
                'Members of sensitive groups may experience health effects. The general public is not as likely to be affected at this levels.'}
              {aqi.us_epa_index > 150 && aqi.us_epa_index <= 200 &&
                'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'}
              {aqi.us_epa_index > 200 && aqi.us_epa_index <= 300 &&
                'Health alert: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'}
              {aqi.us_epa_index > 300 &&
                'Health warning of emergency conditions: the entire population is more likely to be affected.'}
            </div>
          </div>
          <div>
            <div className="text-white font-semibold mb-1">Recommendations:</div>
            <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
              {aqi.us_epa_index <= 100 && (
                <li>Enjoy outdoor activities as normal.</li>
              )}
              {aqi.us_epa_index > 100 && aqi.us_epa_index <= 150 && (
                <>
                  <li>Sensitive groups should limit outdoor activities.</li>
                  <li>Consider using N95 masks during outdoor activities.</li>
                </>
              )}
              {aqi.us_epa_index > 150 && (
                <>
                  <li>Avoid outdoor activities if possible.</li>
                  <li>Use air purifiers indoors.</li>
                  <li>Wear N95 masks if going outside.</li>
                  <li>Keep windows closed.</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
