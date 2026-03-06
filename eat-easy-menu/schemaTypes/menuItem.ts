import {Rule} from 'sanity'

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Dish Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'plan',
      title: 'Belongs to Plan',
      type: 'reference',
      to: [{type: 'plan'}],
      description: 'Select which plan this menu item belongs to',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Dish Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: Rule) => Rule.required()
    }
  ]
}