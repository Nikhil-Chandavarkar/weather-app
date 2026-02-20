'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WeatherData } from '@/lib/types';
import CurrentWeather from './CurrentWeather';
import ForecastView from './ForecastView';
import HistoryView from './HistoryView';
import AlertsView from './AlertsView';
import AirQualityView from './AirQualityView';
import AstronomyView from './AstronomyView';

interface WeatherDashboardProps {
  weatherData: WeatherData;
}

export default function WeatherDashboard({ weatherData }: WeatherDashboardProps) {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur">
        <h2 className="text-3xl font-bold text-white mb-1">
          {weatherData.location.name}
          {weatherData.location.region && `, ${weatherData.location.region}`}
        </h2>
        <p className="text-blue-200">
          {weatherData.location.country} • {weatherData.location.timezone}
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-slate-800/30 border border-slate-700/50">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="history">7-Day History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="airquality">Air Quality</TabsTrigger>
          <TabsTrigger value="astronomy">Astronomy</TabsTrigger>
        </TabsList>

        {/* Current Weather */}
        <TabsContent value="current" className="space-y-6">
          <CurrentWeather current={weatherData.current} />
        </TabsContent>

        {/* Forecast */}
        <TabsContent value="forecast" className="space-y-6">
          <ForecastView forecast={weatherData.forecast} />
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-6">
          <HistoryView forecast={weatherData.forecast.slice(0, 7)} />
        </TabsContent>

        {/* Alerts */}
        <TabsContent value="alerts" className="space-y-6">
          <AlertsView alerts={weatherData.alerts} />
        </TabsContent>

        {/* Air Quality */}
        <TabsContent value="airquality" className="space-y-6">
          <AirQualityView current={weatherData.current} />
        </TabsContent>

        {/* Astronomy */}
        <TabsContent value="astronomy" className="space-y-6">
          <AstronomyView forecast={weatherData.forecast} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
