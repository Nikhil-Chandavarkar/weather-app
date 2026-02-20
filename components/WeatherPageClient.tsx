'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import WeatherDashboard from '@/components/WeatherDashboard';
import { WeatherData } from '@/lib/types';

// Dynamically import SearchBar without SSR to avoid hydration issues with browser extensions
const SearchBar = dynamic(() => import('@/components/SearchBar'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-slate-800/50 rounded-lg animate-pulse" />
  ),
});

export default function WeatherPageClient() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');

  const handleSearch = async (query: string) => {
    setLocation(query);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 text-balance">
            Weather Forecast
          </h1>
          <p className="text-blue-200 text-lg">
            Real-time weather data, forecasts, and detailed metrics
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Dashboard */}
        {weatherData && (
          <WeatherDashboard weatherData={weatherData} />
        )}

        {/* Empty State */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Search for a location
            </h2>
            <p className="text-blue-200">
              Enter a city name to get started with weather information
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
          </div>
        )}
      </div>
    </main>
  );
}
