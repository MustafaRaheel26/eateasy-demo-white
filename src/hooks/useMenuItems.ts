import { useEffect, useState } from 'react'
import { client } from '../lib/sanityClient'

interface MenuItem {
  _id: string
  name: string
  description: string
  image: any
  plan: {
    _ref: string
  }
}

interface Plan {
  _id: string
  name: string
  tagline: string
  price: string
  priceLabel: string
  features: string[]
  buttonText: string
  backgroundColor: string
}

export function useMenuData() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch all plans
        const plansData = await client.fetch(`
          *[_type == "plan"] | order(name asc) {
            _id,
            name,
            tagline,
            price,
            priceLabel,
            features,
            buttonText,
            backgroundColor
          }
        `)
        
        // Fetch all menu items with their plan reference
        const menuItemsData = await client.fetch(`
          *[_type == "menuItem"] {
            _id,
            name,
            description,
            image,
            plan->{
              _id,
              name
            }
          }
        `)
        
        setPlans(plansData)
        setMenuItems(menuItemsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching Sanity data:', err)
        setError('Failed to load menu data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Group menu items by plan
  const menuItemsByPlan = menuItems.reduce((acc, item) => {
    const planId = item.plan?._ref || 'unknown'
    if (!acc[planId]) {
      acc[planId] = []
    }
    acc[planId].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return {
    plans,
    menuItems,
    menuItemsByPlan,
    loading,
    error
  }
}