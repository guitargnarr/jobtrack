'use client'

import { useState } from 'react'

export default function Home() {
  const [rawText, setRawText] = useState('')
  const [importing, setImporting] = useState(false)
  const [imported, setImported] = useState<number | null>(null)

  const handleImport = async () => {
    setImporting(true)

    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText })
      })

      const data = await response.json()

      if (response.ok) {
        // Store in localStorage for MVP
        const existing = JSON.parse(localStorage.getItem('jobtrack_applications') || '[]')
        const all = [...existing, ...data.applications]
        localStorage.setItem('jobtrack_applications', JSON.stringify(all))

        setImported(data.imported)
        setRawText('') // Clear textarea

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        alert('Error: ' + (data.error || 'Failed to import'))
      }
    } catch (error) {
      console.error('Import error:', error)
      alert('Failed to import applications')
    } finally {
      setImporting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Stop Losing Job Applications
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Import from LinkedIn. Track responses. Know what's working.
          </p>
          <p className="text-sm text-gray-600">
            Built by someone who tracked 107 applications and missed an interview request
          </p>
        </div>

        {/* Import Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 1: Paste Your LinkedIn Applications
          </h2>
          <p className="text-gray-600 mb-4">
            Go to LinkedIn → Jobs → My Jobs → Copy the list
          </p>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={`Company 1 - Senior Data Analyst - Remote - Applied 2 days ago
Company 2 - ML Engineer - San Francisco, CA - Applied 1 week ago
Company 3 - Python Developer - New York, NY - Applied 2 weeks ago`}
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {rawText.split('\n').filter(line => line.trim()).length} applications detected
            </span>
            <button
              onClick={handleImport}
              disabled={!rawText.trim() || importing}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importing ? 'Importing...' : 'Import Applications →'}
            </button>
          </div>

          {imported !== null && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
              <p className="text-green-800 font-bold">
                ✅ {imported} applications imported! <a href="/dashboard" className="underline">View Dashboard →</a>
              </p>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-bold text-lg mb-2">1. Import</h3>
            <p className="text-gray-600 text-sm">
              Paste from LinkedIn or add manually
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-bold text-lg mb-2">2. See Stats</h3>
            <p className="text-gray-600 text-sm">
              Response rate, interview rate, patterns
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold text-lg mb-2">3. Apply Smarter</h3>
            <p className="text-gray-600 text-sm">
              Focus on what's actually working
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
