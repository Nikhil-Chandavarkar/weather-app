// Weather API Types
export interface CurrentWeatherData {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  pressure_mb: number;
  pressure_in: number;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    chance_of_rain: number;
    chance_of_snow: number;
    avgvis_km: number;
    avgvis_miles: number;
    avgwind_kph: number;
    avgwind_mph: number;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
  };
  hour: HourlyData[];
}

export interface HourlyData {
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph: number;
  wind_mph: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  chance_of_rain: number;
  chance_of_snow: number;
  uv: number;
  precipitation_mm: number;
  precipitation_in: number;
}

export interface Alert {
  headline: string;
  desc: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  effective: string;
  expires: string;
  note: string;
}

export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm25: number;
  pm10: number;
  us_epa_index: number;
  gb_defra_index: number;
}

export interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
  localtime_epoch: number;
}

export interface WeatherResponse {
  location: LocationData;
  current: CurrentWeatherData & {
    air_quality?: AirQuality;
  };
  forecast?: {
    forecastday: ForecastDay[];
  };
  alerts?: {
    alert: Alert[];
  };
}

export interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
