'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ForecastViewProps {
  forecast: any[];
}

export default function ForecastView({ forecast }: ForecastViewProps) {
  // Prepare data for temperature chart
  const tempChartData = forecast.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    max: day.maxtemp_c,
    min: day.mintemp_c,
    avg: day.avgtemp_c,
  }));

  // Prepare data for precipitation chart
  const precipChartData = forecast.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    rainfall: day.rainfall_mm,
    snow: day.snowfall_cm,
  }));

  return (
    <div className="space-y-6">
      {/* 14-Day Forecast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {forecast.map((day) => (
          <Card
            key={day.date}
            className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {day.icon && (
                <img
                  src={`https:${day.icon}`}
                  alt={day.condition}
                  className="w-12 h-12"
                />
              )}
              <div>
                <div className="text-slate-400 text-xs mb-1">Condition</div>
                <div className="text-sm font-semibold text-white">
                  {day.condition}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-slate-400 mb-1">High</div>
                  <div className="text-lg font-bold text-blue-300">
                    {Math.round(day.maxtemp_c)}°C
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Low</div>
                  <div className="text-lg font-bold text-blue-400">
                    {Math.round(day.mintemp_c)}°C
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-slate-400 mb-1">Rain</div>
                  <div className="text-sm font-semibold text-cyan-300">
                    {day.chance_of_rain}%
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">UV</div>
                  <div className="text-sm font-semibold text-yellow-300">
                    {Math.round(day.uv)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Temperature Trend Chart */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle>Temperature Trend (14 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tempChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(148, 163, 184, 0.6)"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="rgba(148, 163, 184, 0.6)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="max"
                stroke="#ef4444"
                dot={false}
                name="Max Temp"
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#3b82f6"
                dot={false}
                name="Avg Temp"
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#0ea5e9"
                dot={false}
                name="Min Temp"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Precipitation Chart */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle>Precipitation Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={precipChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(148, 163, 184, 0.6)"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="rgba(148, 163, 184, 0.6)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="rainfall" fill="#0ea5e9" name="Rainfall (mm)" />
              <Bar dataKey="snow" fill="#60a5fa" name="Snowfall (cm)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
