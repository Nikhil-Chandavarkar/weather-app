# Weather Application

A comprehensive React-based weather application that provides real-time weather information, 14-day forecasts, historical data, air quality indices, and astronomical information using the WeatherAPI.com API.

## Features

### 🌡️ Current Weather
- Real-time temperature and conditions
- "Feels like" temperature
- Wind speed and gusts
- Humidity levels
- Visibility and pressure data
- UV index
- Precipitation data

### 📊 14-Day Forecast
- Daily high/low temperatures
- Weather conditions and icons
- Precipitation probability
- UV index trends
- Temperature trend visualization
- Precipitation forecast charts

### 📅 7-Day Weather History
- Historical temperature data
- Humidity and rainfall tracking
- Daily condition summaries
- Visual trend analysis with area charts
- Hourly breakdown for each day

### ⚠️ Weather Alerts
- Active weather warnings
- Alert descriptions and timings
- Severity indicators
- Duration information

### 💨 Air Quality
- EPA Air Quality Index (AQI)
- Pollutant level details (PM2.5, PM10, NO₂, O₃, SO₂, CO)
- Health recommendations based on AQI
- Visual quality indicators

### 🌙 Astronomy
- Sunrise and sunset times
- Moonrise and moonset times
- Moon phase information
- Moon illumination percentage
- 14-day lunar calendar

## Setup Instructions

### 1. Get API Key
1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 2. Configure Environment Variables
Add your API key to your project environment variables:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

You can add this in:
- `.env.local` file in the project root
- Vercel project settings (Environment Variables)
- Your development environment variables

### 3. Installation & Running

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

## Usage

1. **Search for a Location**: Enter a city name in the search bar and click "Search"
2. **Quick Search**: Click on any of the suggested cities (New York, London, Tokyo, Paris, Sydney)
3. **View Tabs**: Navigate between different weather information tabs:
   - **Current**: Real-time weather conditions
   - **Forecast**: 14-day forecast with detailed charts
   - **7-Day History**: Historical weather data
   - **Alerts**: Active weather alerts
   - **Air Quality**: AQI and pollutant levels
   - **Astronomy**: Sunrise, sunset, and moon information

## Technology Stack

- **Frontend**: React 19, Next.js 16
- **Styling**: Tailwind CSS, Shadcn/UI
- **Charts**: Recharts
- **API**: WeatherAPI.com
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
/app
  /api/weather          # Weather API route handler
  /page.tsx            # Main page with search
  /layout.tsx          # Root layout
  /globals.css         # Global styles and theme

/components
  /ui                  # Shadcn/ui components
  SearchBar.tsx        # Location search component
  WeatherDashboard.tsx # Main dashboard wrapper
  CurrentWeather.tsx   # Current conditions view
  ForecastView.tsx     # Forecast charts and cards
  HistoryView.tsx      # Historical weather view
  AlertsView.tsx       # Weather alerts display
  AirQualityView.tsx   # Air quality information
  AstronomyView.tsx    # Astronomy information

/lib
  types.ts            # TypeScript type definitions
  weatherApi.ts       # Weather API utilities
  utils.ts            # General utilities
```

## API Endpoints

### POST /api/weather
Fetches comprehensive weather data for a location.

**Request Body:**
```json
{
  "location": "New York"
}
```

**Response includes:**
- Current weather conditions
- 14-day forecast
- Weather alerts
- Air quality data
- Astronomical information

## Features Breakdown

### Real-time Data
- Updates on every search
- Live weather conditions

### Visual Analytics
- Temperature trend charts
- Precipitation forecast charts
- Humidity tracking
- Air quality visualization

### Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimized
- Adaptive layout for all screen sizes

### Dark Theme
- Eye-friendly dark mode
- Weather-themed color palette
- Optimized contrast for readability

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Limitations

- WeatherAPI.com free plan includes:
  - Current weather and forecasts
  - Historical weather data
  - Air quality information
  - Astronomy data
- Rate limit: Check WeatherAPI.com documentation for current limits
- Historical data: Available based on API plan

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Add `NEXT_PUBLIC_WEATHER_API_KEY` to Environment Variables
4. Deploy!

### Deploy Elsewhere

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Set environment variables on your hosting platform

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues with:
- **WeatherAPI.com**: Visit [their documentation](https://www.weatherapi.com/docs/)
- **This application**: Check the GitHub repository
- **General questions**: Open an issue on the repository

## Troubleshooting

### "API key not configured" error
- Ensure `NEXT_PUBLIC_WEATHER_API_KEY` is set in your environment variables
- Restart the development server after adding the variable
- Check that your API key is correct from WeatherAPI.com

### No data displaying
- Verify your internet connection
- Check your WeatherAPI.com account is active
- Ensure you haven't exceeded the API rate limit
- Try searching for a different location

### Charts not displaying
- Clear your browser cache
- Try a different browser
- Check browser console for errors

## Future Enhancements

- [ ] Location-based weather (geolocation)
- [ ] Favorite locations
- [ ] Weather notifications
- [ ] Multiple unit systems (metric/imperial toggle)
- [ ] Weather comparison between locations
- [ ] Historical year-over-year comparison
- [ ] Pollen and allergy information
- [ ] Severe weather notifications
