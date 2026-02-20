import { SearchResult, WeatherResponse } from './types';

const BASE_URL = 'https://api.weatherapi.com/v1';

export async function searchLocations(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Failed to search locations');
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

export async function getCurrentWeather(location: string): Promise<WeatherResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`
    );
    if (!response.ok) throw new Error('Failed to fetch current weather');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
}

export async function getWeatherForecast(
  location: string,
  days: number = 14
): Promise<WeatherResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=yes&alerts=yes`
    );
    if (!response.ok) throw new Error('Failed to fetch forecast');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}

export async function getWeatherHistory(
  location: string,
  date: string
): Promise<WeatherResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/history.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${encodeURIComponent(location)}&dt=${date}&aqi=yes`
    );
    if (!response.ok) throw new Error('Failed to fetch history');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching history:', error);
    return null;
  }
}

export async function getWeatherWithHistory(
  location: string
): Promise<WeatherResponse | null> {
  try {
    // Get today's date and last 7 days
    const today = new Date();
    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const dateStr = last7Days.toISOString().split('T')[0];
    
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${encodeURIComponent(location)}&days=8&aqi=yes&alerts=yes`
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather with history:', error);
    return null;
  }
}
