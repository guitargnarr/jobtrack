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
        const existing = JSON.parse(localStorage.getItem('traction_applications') || '[]')
        const all = [...existing, ...data.applications]
        localStorage.setItem('traction_applications', JSON.stringify(all))

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
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">📈</span>
            </div>
            <span className="text-3xl font-black text-white">TRACTION</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            Stop Losing
            <br />
            Job Applications
          </h1>

          {/* Real Data */}
          <div className="flex flex-wrap items-center gap-8 mb-8">
            <div>
              <div className="text-5xl font-black text-white mb-1">107</div>
              <div className="text-white/80">apps tracked by builder</div>
            </div>
            <div>
              <div className="text-5xl font-black text-green-400 mb-1">19%</div>
              <div className="text-white/80">response rate (vs 5-11% avg)</div>
            </div>
            <div>
              <div className="text-5xl font-black text-yellow-400 mb-1">1</div>
              <div className="text-white/80">missed interview (the reason this exists)</div>
            </div>
          </div>

          {/* Subheadline */}
          <p className="text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            You've applied to 80 jobs. Can you name all 80 companies?
            <br />
            Do you know your response rate?
            <br />
            <span className="font-bold text-white">Most can't. That costs opportunities.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href="#import"
              className="px-8 py-4 bg-white text-blue-600 font-black rounded-xl hover:shadow-2xl transition-all text-lg hover:scale-105"
            >
              Start Tracking Free →
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              See Demo Dashboard
            </a>
          </div>

          {/* Trust */}
          <p className="text-sm text-white/60">
            Built by Matthew Scott, laid off Aug 2025, tracked 107 applications, missed an interview request
            <br />
            Free forever • No login • Your data stays on your device
          </p>
        </div>
      </div>

      {/* Reality Check Section */}
      <div className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-6">The 2025 Job Market Reality</h2>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div>
              <p className="text-red-400 font-bold mb-2">📊 13.8 million layoffs</p>
              <p className="text-gray-400 text-base">Jan-Aug 2025 (highest since 2020)</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold mb-2">🎯 130 applicants per job</p>
              <p className="text-gray-400 text-base">at top tech companies (Google, Meta)</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold mb-2">💼 47% actively job searching</p>
              <p className="text-gray-400 text-base">of tech workers (up from 29% in 2024)</p>
            </div>
            <div>
              <p className="text-green-400 font-bold mb-2">📉 5-11% response rate</p>
              <p className="text-gray-400 text-base">for competitive tech roles</p>
            </div>
          </div>

          <p className="mt-8 text-xl text-white/90 italic border-l-4 border-yellow-400 pl-6">
            "The market is weird. Layoffs everywhere. Companies can't find talent. You're sending 100 applications.
            <br />
            <span className="font-bold text-yellow-400">You need every advantage you can get."</span>
          </p>
        </div>
      </div>

      {/* Import Section */}
      <div id="import" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Import Your Applications (It Takes 10 Seconds)
            </h2>
            <p className="text-xl text-gray-600">
              LinkedIn → Jobs → My Jobs → Copy the list → Paste below
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl p-8">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Company 1 - Senior Data Analyst - Remote - Applied 2 days ago
Company 2 - ML Engineer - San Francisco, CA - Applied 1 week ago
Company 3 - Python Developer - Louisville, KY - Applied 2 weeks ago

Or any format with at least: Company - Position"
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl font-mono text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none bg-white"
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-700 font-semibold">
                {rawText.split('\n').filter(line => line.trim()).length} applications detected
              </span>
              <button
                onClick={handleImport}
                disabled={!rawText.trim() || importing}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 text-lg"
              >
                {importing ? '⏳ Importing...' : '🚀 Get Traction →'}
              </button>
            </div>

            {imported !== null && (
              <div className="mt-6 p-6 bg-green-500 text-white rounded-xl shadow-xl animate-pulse">
                <p className="font-black text-lg">
                  ✅ {imported} applications imported! Redirecting to dashboard...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            Three Steps to Traction
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="font-black text-2xl mb-3 text-gray-900">1. Import</h3>
              <p className="text-gray-600 leading-relaxed">
                Paste from LinkedIn or type manually. We parse the dates, companies, positions.
                No formatting required.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="font-black text-2xl mb-3 text-gray-900">2. See Stats</h3>
              <p className="text-gray-600 leading-relaxed">
                Response rate, interview rate, patterns. Know what's working.
                Stop guessing. Start knowing.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-black text-2xl mb-3 text-gray-900">3. Apply Smarter</h3>
              <p className="text-gray-600 leading-relaxed">
                Focus on what works. Avoid what doesn't. Get traction instead of spinning wheels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <div className="bg-white py-16 px-6 border-t-4 border-blue-600">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-6 text-gray-900">Why Traction Exists</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl mb-4">
              August 2025. Laid off from my ML role at a healthcare company.
            </p>
            <p className="text-xl mb-4">
              Applied to 107 jobs. Tracked them in a CSV file. It worked... until October 29.
            </p>
            <p className="text-xl mb-4 font-bold text-red-600">
              Got an email: "Hollie Nelson - Interview Request"
            </p>
            <p className="text-xl mb-4">
              Couldn't remember which job. Searched my spreadsheet. Searched LinkedIn.
              Found it eventually.
            </p>
            <p className="text-xl mb-4 font-bold text-gray-900">
              Responded too late.
            </p>
            <p className="text-xl mb-8">
              That moment made me build Traction. So you don't lose YOUR Hollie Nelson.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <p className="text-lg font-semibold text-blue-900 mb-2">
                The truth about 2025 job searching:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>• You're competing with 130 applicants per job (Google, Meta, etc.)</li>
                <li>• Response rates are 5-11% for competitive roles</li>
                <li>• 47% of tech workers are job searching (up from 29% last year)</li>
                <li>• Layoffs hit 13.8M people (Jan-Aug 2025, highest since 2020)</li>
              </ul>
              <p className="mt-4 font-bold text-blue-900 text-lg">
                You can't afford to lose track. Every application matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-6 text-center text-white">
        <h3 className="text-3xl font-black mb-4">Ready to Get Traction?</h3>
        <p className="text-xl mb-6 text-white/90">Free forever. No login. Your data stays private.</p>
        <a
          href="#import"
          className="inline-block px-12 py-4 bg-white text-blue-600 font-black rounded-xl hover:shadow-2xl transition-all text-xl hover:scale-105"
        >
          Start Now →
        </a>
      </div>
    </main>
  )
}
