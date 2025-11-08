'use client'

import type { Application } from '@/lib/supabase'

interface IndustryRate {
  industry: string
  total: number
  responses: number
  rate: number
}

export default function IndustryResponseRates({ applications }: { applications: Application[] }) {
  // Calculate response rate by industry
  const byIndustry = applications.reduce((acc, app) => {
    const industry = app.industry || 'Other'
    if (!acc[industry]) {
      acc[industry] = { total: 0, responses: 0 }
    }
    acc[industry].total++
    if (app.status === 'response' || app.status === 'interview') {
      acc[industry].responses++
    }
    return acc
  }, {} as Record<string, { total: number, responses: number }>)

  const rates: IndustryRate[] = Object.entries(byIndustry)
    .map(([industry, data]) => ({
      industry,
      total: data.total,
      responses: data.responses,
      rate: data.total > 0 ? Math.round((data.responses / data.total) * 100) : 0
    }))
    .sort((a, b) => b.rate - a.rate)

  const hotSectors = rates.filter(r => r.rate >= 20)
  const coldSectors = rates.filter(r => r.rate === 0 && r.total >= 5)

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Response Rate by Industry
      </h2>

      <div className="space-y-4">
        {rates.map((item) => (
          <div key={item.industry} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-900 text-lg">{item.industry}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {item.responses}/{item.total} apps
                </span>
                <span className={`text-3xl font-black ${
                  item.rate >= 20 ? 'text-green-600' :
                  item.rate >= 10 ? 'text-yellow-600' :
                  item.rate > 0 ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {item.rate}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  item.rate >= 20 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  item.rate >= 10 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                  item.rate > 0 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                  'bg-gradient-to-r from-red-500 to-red-600'
                }`}
                style={{ width: `${Math.max(item.rate, 3)}%` }}
              ></div>
            </div>

            {/* Status label */}
            <div className="mt-2">
              {item.rate >= 20 && (
                <span className="text-sm font-bold text-green-600">
                  🔥 HOT SECTOR - Apply to more of these
                </span>
              )}
              {item.rate === 0 && item.total >= 5 && (
                <span className="text-sm font-bold text-red-600">
                  ❄️ COLD SECTOR - Stop wasting time here or change your approach
                </span>
              )}
              {item.rate > 0 && item.rate < 10 && (
                <span className="text-sm font-bold text-orange-600">
                  ⚠️ LUKEWARM - Below industry avg (5-11%)
                </span>
              )}
              {item.rate >= 10 && item.rate < 20 && (
                <span className="text-sm font-bold text-yellow-600">
                  ✓ DECENT - At or above industry average
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Strategy */}
      {(hotSectors.length > 0 || coldSectors.length > 0) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-3">Strategy</h4>

          {hotSectors.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-green-700 mb-1">Focus on:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {hotSectors.map(sector => (
                  <li key={sector.industry}>
                    • {sector.industry} ({sector.rate}% response)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {coldSectors.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-red-700 mb-1">Reduce:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {coldSectors.map(sector => (
                  <li key={sector.industry}>
                    • {sector.industry} (0% after {sector.total} apps)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
