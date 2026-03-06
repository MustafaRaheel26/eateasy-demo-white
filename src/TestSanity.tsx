import { useEffect } from 'react'
import { client } from './lib/sanityClient'

export function TestSanity() {
  console.log('🔥 TestSanity component is rendering!')
  
  useEffect(() => {
    console.log('🔥 useEffect is running!')
    
    async function testConnection() {
      try {
        console.log('🔍 About to fetch from Sanity...')
        
        const data = await client.fetch(`*[_type == "plan"]`)
        console.log('✅ Data received:', data)
        
      } catch (error) {
        console.error('❌ Error:', error)
      }
    }
    
    testConnection()
  }, [])

  return (
    <div>
      <h1>Sanity Test Component</h1>
      <p>Check the console!</p>
    </div>
  )
}