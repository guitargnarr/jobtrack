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
    // LinkedIn format: "Company - Position - Location - Applied X ago"
    // or: "Company - Position - Applied X ago"

    const parts = line.split(' - ').map(p => p.trim())
    if (parts.length < 3) continue

    const company = parts[0]
    const position = parts[1]

    // Find "Applied X ago" part
    const appliedIndex = parts.findIndex(p => p.toLowerCase().startsWith('applied'))
    if (appliedIndex === -1) continue

    const location = appliedIndex > 2 ? parts[2] : undefined
    const appliedText = parts[appliedIndex]

    // Parse relative date
    const dateApplied = parseRelativeDate(appliedText)

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
