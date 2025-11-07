import { NextRequest, NextResponse } from 'next/server'
import { parseLinkedInPaste } from '@/lib/parser'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { rawText } = await request.json()

    if (!rawText) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    // Parse the LinkedIn paste
    const parsed = parseLinkedInPaste(rawText)

    if (parsed.length === 0) {
      return NextResponse.json({ error: 'No applications found in text' }, { status: 400 })
    }

    // Convert to database format
    const applications = parsed.map(app => ({
      company: app.company,
      position: app.position,
      location: app.location,
      date_applied: app.dateApplied,
      source: app.source,
      status: 'applied' as const
    }))

    // For MVP: Return parsed data (client will use localStorage)
    // Supabase integration can be added later
    return NextResponse.json({
      imported: applications.length,
      applications: applications
    })

  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Failed to import applications' },
      { status: 500 }
    )
  }
}
