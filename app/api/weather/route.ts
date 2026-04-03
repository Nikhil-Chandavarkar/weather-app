import { NextRequest, NextResponse } from 'next/server';

const API_KEY = ' YOUR :::                   API-KEY';
const BASE_URL = 'https://api.openweathermap.org';

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { location } = await request.json();

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    // First, get coordinates from the location name
    const geoResponse = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    const geoData = await geoResponse.json();
    if (!geoData || geoData.length === 0) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    const { lat, lon, name, country, state } = geoData[0];

    // Fetch current weather with all features
    const currentResponse = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!currentResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch current weather' },
        { status: currentResponse.status }
      );
    }

    const currentData = await currentResponse.json();

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const forecastData = await forecastResponse.json();

    // Fetch one call data for detailed info (alerts, hourly, daily)
    const oneCallResponse = await fetch(
      `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const oneCallData = await oneCallResponse.json();

    // Fetch air quality data
    const airQualityResponse = await fetch(
      `${BASE_URL}/data/2.5/air_quality?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const airQualityData = airQualityResponse.ok ? await airQualityResponse.json() : null;

    // Format the response to match our types
    const formattedData = {
      location: {
        name: name,
        region: state || '',
        country: country,
        lat: lat,
        lon: lon,
        timezone: oneCallData.timezone || 'UTC',
      },
      current: {
        temp_c: currentData.main.temp,
        temp_f: (currentData.main.temp * 9) / 5 + 32,
        condition: currentData.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`,
        wind_kph: currentData.wind.speed * 3.6,
        wind_mph: currentData.wind.speed * 2.237,
        humidity: currentData.main.humidity,
        feelslike_c: currentData.main.feels_like,
        feelslike_f: (currentData.main.feels_like * 9) / 5 + 32,
        visibility_km: (currentData.visibility || 10000) / 1000,
        visibility_miles: ((currentData.visibility || 10000) / 1000) * 0.621371,
        pressure_mb: currentData.main.pressure,
        pressure_in: currentData.main.pressure * 0.02953,
        precipitation_mm: currentData.rain?.['1h'] || 0,
        precipitation_in: (currentData.rain?.['1h'] || 0) * 0.03937,
        uv: oneCallData.current?.uvi || 0,
        gust_kph: (currentData.wind.gust || 0) * 3.6,
        gust_mph: (currentData.wind.gust || 0) * 2.237,
        aqi: airQualityData?.list?.[0]?.main?.aqi || 0,
      },
      forecast: (oneCallData.daily || []).slice(0, 14).map((day: any, index: number) => ({
        date: new Date(day.dt * 1000).toISOString().split('T')[0],
        maxtemp_c: day.temp.max,
        maxtemp_f: (day.temp.max * 9) / 5 + 32,
        mintemp_c: day.temp.min,
        mintemp_f: (day.temp.min * 9) / 5 + 32,
        avgtemp_c: day.temp.day,
        avgtemp_f: (day.temp.day * 9) / 5 + 32,
        condition: day.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
        chance_of_rain: (day.pop || 0) * 100,
        chance_of_snow: 0,
        rainfall_mm: day.rain || 0,
        rainfall_in: (day.rain || 0) * 0.03937,
        snowfall_cm: (day.snow || 0) / 10,
        avgvisibility_km: 10,
        avghumidity: day.humidity,
        uv: day.uvi,
        sunrise: new Date(day.sunrise * 1000).toISOString().split('T')[1],
        sunset: new Date(day.sunset * 1000).toISOString().split('T')[1],
        moonrise: new Date(day.moonrise * 1000).toISOString().split('T')[1],
        moonset: new Date(day.moonset * 1000).toISOString().split('T')[1],
        moon_phase: day.moon_phase,
        moon_illumination: day.moon_phase * 100,
        hourly: (oneCallData.hourly || [])
          .filter((hour: any, idx: number) => idx < (index + 1) * 24 && idx >= index * 24)
          .map((hour: any) => ({
            time: new Date(hour.dt * 1000).toISOString(),
            temp_c: hour.temp,
            temp_f: (hour.temp * 9) / 5 + 32,
            condition: hour.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
            wind_kph: hour.wind_speed * 3.6,
            humidity: hour.humidity,
            feelslike_c: hour.feels_like,
            precipitation_mm: hour.rain?.['1h'] || 0,
            chance_of_rain: (hour.pop || 0) * 100,
            uv: hour.uvi || 0,
          })),
      })),
      alerts: (oneCallData.alerts || []).map((alert: any) => ({
        headline: alert.event,
        desc: alert.description || alert.event,
        severity: 'unknown',
        urgency: 'unknown',
        areas: alert.tags?.join(', ') || 'Unknown',
        category: alert.event,
        effective: new Date(alert.start * 1000).toISOString(),
        expires: new Date(alert.end * 1000).toISOString(),
        note: alert.description || '',
      })),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
