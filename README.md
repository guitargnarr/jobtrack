<div align="center">

# 📈 Traction

### Get traction in your job search

**Stop losing applications in spreadsheet chaos.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

[**Try Traction**](https://traction-jobs.vercel.app) · [Report Bug](https://github.com/guitargnarr/traction/issues) · [Request Feature](https://github.com/guitargnarr/traction/issues)

</div>

---

## The Problem

**You've applied to 80 jobs. Maybe 100.**

Can you name all the companies?

Do you know your response rate?

Most can't.

**And that costs opportunities.**

---

## The Story

August 2025. Got laid off from my ML role at a healthcare company.

Applied to 107 jobs. Tracked them in a CSV file.

October 29: Email from "Hollie Nelson - Interview Request"

Wait. Which job was this for?

Searched my spreadsheet. Searched LinkedIn Applied tab. Searched Gmail.

Found it eventually.

**Responded too late.**

That moment cost me an interview.

That moment made me build **Traction**.

---

## The 2025 Reality (Department of Labor Data)

The job market is weird right now:

- **13.8 million layoffs** (Jan-Aug 2025, highest since 2020)
- **130 applicants per job** at top tech companies (Google, Meta, Microsoft)
- **47% of tech workers actively job searching** (up from 29% in 2024)
- **5-11% response rate** for competitive tech roles
- **4.3% unemployment rate** overall, but 2.8% for tech (paradox: layoffs + can't find talent)

**Translation:** You're sending 100 applications to get 5-11 responses.

**You can't afford to lose track of a single one.**

---

## The Solution

**Traction: Import → Track → Get Traction**

### 1. Import Applications
Paste your LinkedIn application list. Traction parses:
- Company names
- Position titles
- Application dates ("Applied 2 days ago" → 2025-11-05)
- Locations

### 2. See Your Stats
- Total applications
- Response rate (%)
- Interview rate (%)
- Which job types work

### 3. Make Smarter Decisions
- Apply to more of what works
- Avoid companies that ghost
- Never lose track again
- **Stop losing your Hollie Nelson**

---

## Features

✅ Import from LinkedIn (paste the list)
✅ Parse relative dates automatically
✅ localStorage-based (your data never leaves your device)
✅ Response rate calculation
✅ Interview tracking
✅ No login required
✅ Free forever

---

## Tech Stack

- **Next.js 16** - React framework with Turbopack (fast AF)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Client-side persistence (privacy-first, no server)

---

## Quick Start

```bash
git clone https://github.com/guitargnarr/traction
cd traction
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## How It Works

### Import Format

Traction accepts multiple LinkedIn formats:

```
Company 1 - Senior Data Analyst - Remote - Applied 2 days ago
Company 2 - ML Engineer - San Francisco, CA - Applied 1 week ago
Company 3 - Python Developer - Applied 2 weeks ago
Company 4 - Software Engineer - New York
```

**Or even just:**
```
Google - Senior SWE
Meta - ML Engineer
```

We'll default the date to today if you don't specify.

### Privacy-First

Your data stays in your browser's `localStorage`. No server. No tracking. No accounts.

We don't see your applications. We don't sell your data. We don't even HAVE your data.

---

## My Results (Real Data)

Using Traction for my own job search:

| Metric | Value | Industry Avg |
|--------|-------|--------------|
| Applications | 107 | - |
| Response Rate | 19% | 5-11% |
| Interviews | 2 | - |
| Pattern Found | Robert Half = 35% response | - |
| Action Taken | Apply to more recruiting agencies | - |
| **Result** | **More interviews** | - |

**The tool works. I'm using it every day.**

---

## Roadmap

**v0.1 (Current):**
- ✅ Import from LinkedIn
- ✅ Stats dashboard
- ✅ localStorage persistence

**v0.2 (Next):**
- Gmail integration (auto-detect responses)
- Pattern analysis (which titles/companies work best)
- Export to CSV

**v0.3:**
- Success tracking ("Did Traction help you?")
- Testimonial collection
- ROI calculator (time saved)

**v0.4:**
- Supabase backend (optional, for sync across devices)
- Chrome extension (import with one click)
- Mobile app

**But only if people actually use it.**

If this helps 10 people, I'll keep building.

If it helps 100, I'll make it a real product.

If it helps 1,000... we'll see.

---

## Contributing

**Found a bug?** Open an issue.
**Have an idea?** Open an issue.
**Want to help?** PRs welcome.

Built this in 3 hours to solve my own pain. Making it better based on what users need.

---

## Why This Matters

**The job market is brutal right now.**

13.8 million people laid off in 2025. Applications tripled since 2021. Response rates tanked.

You're not crazy. The market IS weird.

**But you still need to track your applications.**

Because the ONE interview you miss could have been your next role.

I missed mine. Don't miss yours.

---

## License

MIT - Use it, fork it, improve it, sell it, whatever.

Just help people get jobs.

---

## Author

**Matthew Scott**
- Louisville, KY
- 10 years ML/healthcare IT at Humana
- Laid off August 2025
- Tracked 107 applications (using Traction)
- Missed 1 interview (the reason Traction exists)
- Currently job searching + building in public

**Contact:**
- Email: matthewdscott7@gmail.com
- GitHub: [guitargnarr](https://github.com/guitargnarr)
- LinkedIn: [matthew-scott](https://linkedin.com/in/matthew-scott)

---

## Acknowledgments

Built with:
- ☕ Coffee
- 😤 Frustration at losing an interview
- 💪 Determination to help others avoid my mistake
- 📊 Real job search data (mine)
- 🎯 Focus on ONE customer (job searchers like me)

---

**If Traction helps you land a job, tell me. That's the only metric that matters.**

</div>
