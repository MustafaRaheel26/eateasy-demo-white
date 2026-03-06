import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'quztwy52',
  dataset: 'production',
  apiVersion: '2026-03-06', // Use current date
  useCdn: true, // Set to false if statically generating
})

export default client