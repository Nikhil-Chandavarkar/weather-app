'use client';

import { Moon, Sun, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AstronomyViewProps {
  forecast: any[];
}

export default function AstronomyView({ forecast }: AstronomyViewProps) {
  const getMoonPhaseEmoji = (phase: string) => {
    const phases: { [key: string]: string } = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'First Quarter': '🌓',
      'Waxing Gibbous': '🌔',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖',
      'Last Quarter': '🌗',
      'Waning Crescent': '🌘',
    };
    return phases[phase] || '🌙';
  };

  return (
    <div className="space-y-6">
      {/* Sunrise/Sunset Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sunrise Card */}
        <Card className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border-orange-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-300">
              <Sun className="w-5 h-5" />
              Sunrise & Sunset
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {forecast.slice(0, 3).map((day) => (
              <div key={day.date} className="border-b border-orange-500/20 pb-4 last:border-0 last:pb-0">
                <div className="text-sm text-slate-400 mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-orange-300 mb-1">Sunrise</div>
                    <div className="text-lg font-semibold text-white">
                      {day.sunrise}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-yellow-300 mb-1">Sunset</div>
                    <div className="text-lg font-semibold text-white">
                      {day.sunset}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Moonrise/Moonset Card */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Moon className="w-5 h-5" />
              Moonrise & Moonset
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {forecast.slice(0, 3).map((day) => (
              <div key={day.date} className="border-b border-purple-500/20 pb-4 last:border-0 last:pb-0">
                <div className="text-sm text-slate-400 mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-blue-300 mb-1">Moonrise</div>
                    <div className="text-lg font-semibold text-white">
                      {day.moonrise}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-300 mb-1">Moonset</div>
                    <div className="text-lg font-semibold text-white">
                      {day.moonset}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Moon Phases */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Moon Phase Calendar (14 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecast.map((day) => (
              <div
                key={day.date}
                className="bg-slate-700/20 border border-slate-600/50 rounded-lg p-4 text-center hover:bg-slate-700/40 transition-colors"
              >
                <div className="text-3xl mb-2">
                  {getMoonPhaseEmoji(day.moon_phase)}
                </div>
                <div className="text-xs text-slate-400 mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="text-sm font-semibold text-white mb-2 text-balance">
                  {day.moon_phase}
                </div>
                <div className="text-xs text-blue-300">
                  Illumination: {day.moon_illumination}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Astronomy Information */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Astronomy Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Solar Information</h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc list-inside">
              <li>The sun determines day length and solar energy available</li>
              <li>Sunrise and sunset times change throughout the year</li>
              <li>Longer days occur around summer solstice (around June 21)</li>
              <li>Shorter days occur around winter solstice (around December 21)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Lunar Information</h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc list-inside">
              <li>Moon phase affects ocean tides and some natural phenomena</li>
              <li>Full moon occurs approximately every 29.5 days</li>
              <li>Moon illumination percentage shows how much is visible from Earth</li>
              <li>Moon visibility depends on moonrise and moonset times</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
