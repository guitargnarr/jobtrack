'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { Application } from '@/lib/supabase'

interface IndustryData {
  name: string
  value: number
  percentage: number
  [key: string]: string | number // Index signature for Recharts
}

const INDUSTRY_COLORS: Record<string, string> = {
  'Healthcare': '#EF4444',
  'Tech/SaaS': '#3B82F6',
  'Finance': '#10B981',
  'Data/Analytics': '#8B5CF6',
  'AI/ML': '#EC4899',
  'Consulting': '#F59E0B',
  'Marketing/Sales': '#06B6D4',
  'Education': '#6366F1',
  'Retail/E-commerce': '#84CC16',
  'Manufacturing/Logistics': '#64748B',
  'Government/Non-Profit': '#78716C',
  'Other': '#9CA3AF'
}

export default function IndustryGraph({ applications }: { applications: Application[] }) {
  // Calculate distribution
  const distribution = applications.reduce((acc, app) => {
    const industry = app.industry || 'Other'
    acc[industry] = (acc[industry] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData: IndustryData[] = Object.entries(distribution)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / applications.length) * 100)
    }))
    .sort((a, b) => b.value - a.value)

  const topIndustry = chartData[0]
  const insights = generateInsights(chartData, applications)

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Industry Distribution
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={INDUSTRY_COLORS[entry.name] || INDUSTRY_COLORS.Other}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Breakdown */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-900">Industry Breakdown</h3>
          <div className="space-y-3">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: INDUSTRY_COLORS[item.name] || INDUSTRY_COLORS.Other }}
                  ></div>
                  <span className="font-semibold text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-black text-lg text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-2">Insights</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            {insights.map((insight, i) => (
              <li key={i}>• {insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function generateInsights(chartData: IndustryData[], applications: Application[]): string[] {
  const insights: string[] = []
  const topIndustry = chartData[0]
  const total = applications.length

  // Concentration
  if (topIndustry.percentage >= 60) {
    insights.push(`Heavily concentrated in ${topIndustry.name} (${topIndustry.percentage}%). Consider diversifying.`)
  } else if (topIndustry.percentage >= 40) {
    insights.push(`Primary focus: ${topIndustry.name} (${topIndustry.percentage}%).`)
  }

  // Diversification
  if (chartData.length >= 5) {
    insights.push(`${chartData.length} industries - consider focusing on top 3.`)
  }

  // Volume
  if (total < 50) {
    insights.push(`${total} applications. Industry avg 5-11% response = need 50-100 apps for results.`)
  }

  return insights
}
