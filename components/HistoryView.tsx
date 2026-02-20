'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface HistoryViewProps {
  forecast: any[];
}

export default function HistoryView({ forecast }: HistoryViewProps) {
  // Prepare data for history chart
  const historyChartData = forecast.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
    avgtemp: day.avgtemp_c,
    maxtemp: day.maxtemp_c,
    mintemp: day.mintemp_c,
    humidity: day.avghumidity,
    rainfall: day.rainfall_mm,
  }));

  // Prepare data for detailed daily breakdown
  const dailyBreakdown = forecast.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    data: day,
  }));

  return (
    <div className="space-y-6">
      {/* Temperature History Chart */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle>Temperature History (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historyChartData}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Legend />
              <Area
                type="monotone"
                dataKey="maxtemp"
                stroke="#ef4444"
                fillOpacity={0.3}
                fill="#ef4444"
                name="Max Temp (°C)"
              />
              <Area
                type="monotone"
                dataKey="avgtemp"
                stroke="#3b82f6"
                fill="url(#colorTemp)"
                name="Avg Temp (°C)"
              />
              <Area
                type="monotone"
                dataKey="mintemp"
                stroke="#0ea5e9"
                fillOpacity={0.3}
                fill="#0ea5e9"
                name="Min Temp (°C)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Humidity Chart */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle>Humidity & Rainfall History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historyChartData}>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#06b6d4"
                name="Humidity (%)"
                yAxisId="left"
              />
              <Line
                type="monotone"
                dataKey="rainfall"
                stroke="#8b5cf6"
                name="Rainfall (mm)"
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Breakdown Cards */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Daily Breakdown</h3>
        <div className="grid grid-cols-1 gap-4">
          {dailyBreakdown.map((day) => (
            <Card
              key={day.date}
              className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{day.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Condition</div>
                    <div className="text-sm font-semibold text-white">
                      {day.data.condition}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Avg Temp</div>
                    <div className="text-lg font-bold text-blue-300">
                      {Math.round(day.data.avgtemp_c)}°C
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">High/Low</div>
                    <div className="text-sm font-semibold text-white">
                      {Math.round(day.data.maxtemp_c)}° / {Math.round(day.data.mintemp_c)}°
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Humidity</div>
                    <div className="text-sm font-semibold text-cyan-300">
                      {day.data.avghumidity}%
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Rainfall</div>
                    <div className="text-sm font-semibold text-blue-400">
                      {day.data.rainfall_mm} mm
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Visibility</div>
                    <div className="text-sm font-semibold text-purple-300">
                      {Math.round(day.data.avgvisibility_km)} km
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
