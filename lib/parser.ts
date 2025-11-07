// LinkedIn paste parser - converts relative dates to absolute dates

export interface ParsedApplication {
  company: string
  position: string
  location?: string
  dateApplied: string // ISO format
  source: string
}

export function parseLinkedInPaste(rawText: string): ParsedApplication[] {
  const lines = rawText.split('\n').filter(line => line.trim())
  const applications: ParsedApplication[] = []

  for (const line of lines) {
    // Try to parse in multiple formats

    // Format 1: "Company - Position - Location - Applied X ago"
    // Format 2: "Company - Position - Applied X ago"
    // Format 3: Just "Company - Position" (default to today)

    const parts = line.split(' - ').map(p => p.trim())
    if (parts.length < 2) continue // Need at least company and position

    const company = parts[0]
    const position = parts[1]

    // Find "Applied X ago" part (if exists)
    const appliedIndex = parts.findIndex(p => p.toLowerCase().includes('applied'))

    let dateApplied: string
    let location: string | undefined

    if (appliedIndex !== -1) {
      // Has "Applied X ago"
      location = appliedIndex > 2 ? parts[2] : undefined
      const appliedText = parts[appliedIndex]
      dateApplied = parseRelativeDate(appliedText)
    } else {
      // No "Applied" text, check if there's a location
      location = parts.length > 2 ? parts[2] : undefined
      // Default to today
      dateApplied = new Date().toISOString().split('T')[0]
    }

    applications.push({
      company,
      position,
      location,
      dateApplied,
      source: 'LinkedIn'
    })
  }

  return applications
}

function parseRelativeDate(text: string): string {
  const today = new Date()

  // Extract number and unit from "Applied 2 days ago", "Applied 1 week ago", etc.
  const match = text.match(/(\d+)\s*(minute|min|hour|hr|day|week|wk|month|mo)s?\s*ago/i)

  if (!match) {
    // Default to today if can't parse
    return today.toISOString().split('T')[0]
  }

  const amount = parseInt(match[1])
  const unit = match[2].toLowerCase()

  let daysAgo = 0

  if (unit.startsWith('min')) {
    daysAgo = 0 // Same day
  } else if (unit.startsWith('hour') || unit === 'hr') {
    daysAgo = 0 // Same day
  } else if (unit.startsWith('day')) {
    daysAgo = amount
  } else if (unit.startsWith('week') || unit === 'wk') {
    daysAgo = amount * 7
  } else if (unit.startsWith('month') || unit === 'mo') {
    daysAgo = amount * 30
  }

  const appliedDate = new Date(today)
  appliedDate.setDate(appliedDate.getDate() - daysAgo)

  return appliedDate.toISOString().split('T')[0]
}
