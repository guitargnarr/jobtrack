// LinkedIn paste parser - converts relative dates to absolute dates

export interface ParsedApplication {
  company: string
  position: string
  location?: string
  dateApplied: string // ISO format
  source: string
  industry: string // Auto-classified for insights
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
      source: 'LinkedIn',
      industry: classifyIndustry(position, company)
    })
  }

  return applications
}

export function classifyIndustry(position: string, company: string): string {
  const text = `${position} ${company}`.toLowerCase()

  // Healthcare (specific companies + keywords)
  if (text.match(/humana|anthem|cigna|unitedhealth|cvs health|health|medical|hospital|pharma|clinic|patient|care|doctor|nurse/)) {
    return 'Healthcare'
  }

  // Tech/SaaS (specific companies + keywords)
  if (text.match(/google|meta|facebook|amazon|microsoft|apple|netflix|uber|airbnb|stripe|software|engineer|developer|sre|devops|frontend|backend|fullstack|tech|saas|programmer|coding/)) {
    return 'Tech/SaaS'
  }

  // Finance (specific companies + keywords)
  if (text.match(/jpmorgan|goldman|morgan stanley|wells fargo|bank of america|citi|finance|bank|trading|investment|fintech|capital|wealth|credit|insurance/)) {
    return 'Finance'
  }

  // Data/Analytics (position-focused)
  if (text.match(/data|analyst|analytics|business intelligence|bi |tableau|power bi|sql|database|insights|metrics/)) {
    return 'Data/Analytics'
  }

  // AI/ML (specific, high-value)
  if (text.match(/\bai\b|machine learning|\bml\b|artificial intelligence|deep learning|nlp|computer vision|llm|model|pytorch|tensorflow/)) {
    return 'AI/ML'
  }

  // Consulting
  if (text.match(/mckinsey|bcg|bain|deloitte|accenture|pwc|ey|kpmg|consult|advisory|strategy/)) {
    return 'Consulting'
  }

  // Marketing/Sales
  if (text.match(/marketing|sales|growth|customer success|account manager|sdr|bdr|demand gen|content|brand/)) {
    return 'Marketing/Sales'
  }

  // Education
  if (text.match(/teacher|education|professor|tutor|instructor|university|school|college|academic|student/)) {
    return 'Education'
  }

  // Retail/E-commerce
  if (text.match(/retail|ecommerce|e-commerce|store|shop|walmart|target|merchandise/)) {
    return 'Retail/E-commerce'
  }

  // Manufacturing/Logistics
  if (text.match(/manufacturing|factory|production|supply chain|logistics|warehouse|operations|industrial/)) {
    return 'Manufacturing/Logistics'
  }

  // Government/Non-Profit
  if (text.match(/government|federal|state|nonprofit|ngo|public sector|civic|policy/)) {
    return 'Government/Non-Profit'
  }

  // Default
  return 'Other'
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
