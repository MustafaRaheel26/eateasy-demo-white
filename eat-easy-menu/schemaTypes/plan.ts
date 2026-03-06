import {Rule} from 'sanity'

export default {
  name: 'plan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'e.g., "Plant Based", "Signature", "Premium", etc.',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g., "The Conscious Choice" or "The Executive Choice"',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'price',
      title: 'Price per Meal',
      type: 'string',
      description: 'e.g., "$16.49" or "$18.99"',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      description: 'e.g., "Per Meal"',
      initialValue: 'Per Meal',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of features/bullet points',
      validation: (Rule: Rule) => Rule.required().min(1)
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'e.g., "Select Plan"',
      initialValue: 'Select Plan',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Dark (Slate 900)', value: 'dark'}
        ],
        layout: 'dropdown'
      },
      description: 'Choose white for light background, dark for dark background',
      validation: (Rule: Rule) => Rule.required()
    }
  ]
}