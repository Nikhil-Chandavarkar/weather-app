'use client';

import { AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AlertsViewProps {
  alerts: any[];
}

export default function AlertsView({ alerts }: AlertsViewProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Active Alerts
          </h3>
          <p className="text-slate-400">
            There are no weather alerts for this location right now.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <Card
          key={index}
          className="bg-red-900/20 border-red-500/30 hover:bg-red-900/30 transition-colors"
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-red-300">
              <AlertTriangle className="w-5 h-5" />
              {alert.headline}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-100">{alert.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-red-300 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Effective
                </div>
                <div className="text-red-100">
                  {new Date(alert.effective).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-red-300 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Expires
                </div>
                <div className="text-red-100">
                  {new Date(alert.expires).toLocaleString()}
                </div>
              </div>
            </div>

            {alert.note && (
              <div className="bg-red-900/20 border border-red-500/20 rounded p-3">
                <div className="text-red-300 text-sm font-semibold mb-1">
                  Additional Information
                </div>
                <div className="text-red-100 text-sm">{alert.note}</div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
