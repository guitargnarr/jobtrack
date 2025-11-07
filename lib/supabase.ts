import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co'
}

export interface Application {
  id?: string
  company: string
  position: string
  location?: string
  date_applied: string
  source: string
  status: 'applied' | 'response' | 'interview' | 'rejected'
  response_date?: string
  notes?: string
  created_at?: string
}

export interface Stats {
  total: number
  responses: number
  interviews: number
  responseRate: number
  interviewRate: number
}
