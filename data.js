export const punjabSchemeFallback = [
  {
    id: 'punjab-old-age-pension',
    name: 'Old Age Pension Scheme',
    state_code: 'PB',
    state_name: 'Punjab',
    category: 'Old age support',
    summary: 'Punjab government service information for the Old Age Pension Scheme.',
    department: 'Department of Social Security and Women & Child Development, Government of Punjab',
    official_url: 'https://connect.punjab.gov.in/',
    source_url: 'https://punjab.gov.in/wp-content/uploads/2025/09/Old-Age-Pension-Scheme.pdf',
    required_documents: [
      'Identity proof: Aadhaar/e-Aadhaar, Voter ID, Passport, Driving Licence or PAN (as listed by the official service page)',
      'Address proof: Passport, Voter ID, Aadhaar/e-Aadhaar or a government/PSU address certificate (as listed)',
      'Date-of-birth proof: Aadhaar, Voter ID/voter list, birth certificate or matriculation certificate',
      'Bank passbook'
    ],
    application_routes: [
      'Visit a nearby Sewa Kendra',
      'Use the Punjab Connect Portal',
      'Call 1076 for the listed doorstep service information'
    ],
    support: 'Punjab service helpline: 1100',
    verified_note: 'The linked Punjab government service document lists required document categories and application routes. Confirm current eligibility conditions and any fees with the official service before applying.'
  }
]

export async function loadPunjabSchemes() {
  // The local fallback keeps the site usable before a Supabase project is connected.
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    return { data: punjabSchemeFallback, source: 'local-fallback', error: null }
  }

  const { supabase } = await import('./lib/supabaseClient.js')
  const { data, error } = await supabase
    .from('pension_schemes')
    .select('*')
    .eq('state_code', 'PB')
    .order('name')

  if (error) {
    return { data: punjabSchemeFallback, source: 'local-fallback', error }
  }
  return { data: data?.length ? data : punjabSchemeFallback, source: data?.length ? 'supabase' : 'local-fallback', error: null }
}
