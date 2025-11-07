'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Application, Stats } from '@/lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    responses: 0,
    interviews: 0,
    responseRate: 0,
    interviewRate: 0
  })
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    // For MVP: Use localStorage
    const stored = localStorage.getItem('traction_applications')

    if (stored) {
      const data = JSON.parse(stored)
      setApplications(data)
      setStats(calculateStats(data))
    } else {
      // Use mock data for demo
      setApplications(mockApplications)
      setStats(calculateStats(mockApplications))
    }

    setLoading(false)
  }

  function calculateStats(apps: Application[]): Stats {
    const total = apps.length
    const responses = apps.filter(a => a.status === 'response' || a.status === 'interview').length
    const interviews = apps.filter(a => a.status === 'interview').length

    return {
      total,
      responses,
      interviews,
      responseRate: total > 0 ? Math.round((responses / total) * 100) : 0,
      interviewRate: responses > 0 ? Math.round((interviews / responses) * 100) : 0
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Your Job Search Dashboard</h1>
          <p className="text-gray-600">Track what's working. Apply smarter.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            number={stats.total}
            label="Applications"
            icon="📋"
            gradient="from-blue-500 to-blue-600"
          />
          <StatCard
            number={stats.responses}
            label="Responses"
            icon="📧"
            gradient="from-purple-500 to-purple-600"
          />
          <StatCard
            number={`${stats.responseRate}%`}
            label="Response Rate"
            icon="📊"
            gradient="from-green-500 to-green-600"
          />
          <StatCard
            number={stats.interviews}
            label="Interviews"
            icon="🎯"
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Applications</h2>
            <a
              href="/"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add More
            </a>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No applications yet</p>
              <a href="/" className="text-blue-600 font-semibold hover:underline">
                Import from LinkedIn →
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Applied</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{app.company}</td>
                      <td className="py-3 px-4 text-gray-700">{app.position}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{app.location || '-'}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{app.date_applied}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({ number, label, icon, gradient }: {
  number: number | string
  label: string
  icon: string
  gradient: string
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-lg`}>
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-black mb-1">{number}</div>
      <div className="text-sm font-semibold opacity-90 uppercase tracking-wide">{label}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    applied: 'bg-gray-100 text-gray-700',
    response: 'bg-blue-100 text-blue-700',
    interview: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || styles.applied}`}>
      {status}
    </span>
  )
}

// Mock data for testing before Supabase is set up
const mockApplications: Application[] = [
  {
    id: '1',
    company: 'TechCorp',
    position: 'Senior Data Analyst',
    location: 'Remote',
    date_applied: '2025-11-05',
    source: 'LinkedIn',
    status: 'response',
    created_at: '2025-11-05T00:00:00Z'
  },
  {
    id: '2',
    company: 'StartupXYZ',
    position: 'ML Engineer',
    location: 'San Francisco, CA',
    date_applied: '2025-11-04',
    source: 'LinkedIn',
    status: 'applied',
    created_at: '2025-11-04T00:00:00Z'
  },
  {
    id: '3',
    company: 'Robert Half',
    position: 'Python Developer',
    location: 'Louisville, KY',
    date_applied: '2025-11-03',
    source: 'Robert Half',
    status: 'interview',
    created_at: '2025-11-03T00:00:00Z'
  }
]
