# EmailJS Integration Documentation

## Overview

A complete EmailJS integration has been added to your Eat Easy React website for handling subscription requests. The form is fully functional with error handling, loading states, and success/error messages.

---

## Installation ✅

The `@emailjs/browser` package has been installed and is ready to use.

```bash
npm install @emailjs/browser
```

---

## Environment Variables Configuration ✅

Your `.env` file has been created with the following EmailJS credentials:

```env
VITE_EMAIL_SERVICE_ID=service_8yv17wn
VITE_EMAIL_TEMPLATE_ID=template_3fsg63p
VITE_EMAIL_PUBLIC_KEY=AGijMtUjoKGaTO_hf
```

**Never commit the `.env` file to version control!** The `.env.example` file has been updated to show what variables are needed.

---

## Form Fields

The subscription form includes the following fields that exactly match your EmailJS template:

| Field            | Type     | Required | Description                                       |
| ---------------- | -------- | -------- | ------------------------------------------------- |
| `office_name`    | Text     | Yes      | Office/Company Name                               |
| `contact_name`   | Text     | Yes      | Contact Person's Full Name                        |
| `work_email`     | Email    | Yes      | Work Email Address                                |
| `phone`          | Tel      | Yes      | Phone Number                                      |
| `team_size`      | Number   | Yes      | Number of Team Members                            |
| `preferred_plan` | Select   | Yes      | Meal Plan (Plant Based $14.99 / Signature $16.99) |
| `message`        | Textarea | No       | Optional Message                                  |

---

## Features Implemented

### ✅ EmailJS Integration

- Uses `emailjs.sendForm()` to send form data directly to your email service
- Environment variables for secure credential management
- Automatic form initialization on component load

### ✅ Form Validation

- All required fields must be filled before submission
- Email format validation
- Dynamic error messages

### ✅ User Feedback

- **Loading State**: Button shows "Sending..." with spinning loader while submitting
- **Success Message**: "Subscription request sent successfully!" with checkmark icon
- **Error Handling**: Detailed error messages if submission fails
- **Auto-clear Messages**: Status messages automatically clear after 5 seconds

### ✅ Form State Management

- Form clears automatically after successful submission
- All input fields are properly managed with React state
- Form reference (useRef) for EmailJS integration

### ✅ Modern UI

- Responsive design that works on mobile, tablet, and desktop
- Modern gradient buttons with hover effects
- Color-coded status messages (green for success, red for error, blue for loading)
- Integrated with existing Eat Easy design system (Tailwind CSS)

### ✅ Accessibility

- Proper form labels and input associations
- Clear visual feedback for form states
- Semantic HTML structure

---

## Code Structure

### Main Implementation in `App.tsx`

The SubscriptionForm component has been integrated directly into your App.tsx with:

1. **EmailJS Initialization** (Line 24):

   ```tsx
   emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY);
   ```

2. **Form Submission Handler**:
   - Validates all required fields
   - Shows loading state
   - Sends form data via EmailJS
   - Handles success and error responses
   - Automatically clears the form on success

3. **State Management**:
   - `formStatus`: Tracks loading, success, and error states
   - `formData`: Manages all input field values

### Type Definitions

TypeScript types have been configured in `src/vite-env.d.ts` to properly handle Vite environment variables.

---

## How It Works (Step by Step)

1. **User fills out the form** with their subscription details
2. **User clicks "Submit Inquiry"** button
3. **Form validation** checks all required fields are filled
4. **Loading state** is shown (button becomes disabled, shows spinner)
5. **EmailJS sends the form** to your configured email template
6. **Success/Error message** is displayed based on the result
7. **Form automatically clears** if submission was successful
8. **Status message auto-hides** after 5 seconds

---

## Testing the Form

### To Test Locally:

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to the subscription section on your website

3. Fill in the form fields:
   - Contact Name: John Doe
   - Office Name: Tech Corp
   - Work Email: john@techcorp.com
   - Phone: +1 (416) 555-0100
   - Team Size: 25
   - Preferred Plan: Plant Based $14.99

4. Click "Submit Inquiry"

5. You should receive an email at your configured EmailJS recipient address

---

## Production Deployment

### Before Deploying:

1. ✅ Ensure `.env` file is added to `.gitignore` (it should already be)
2. ✅ Update `.env.example` with placeholder values (already done)
3. ✅ Set environment variables in your hosting platform:
   - Add `VITE_EMAIL_SERVICE_ID`
   - Add `VITE_EMAIL_TEMPLATE_ID`
   - Add `VITE_EMAIL_PUBLIC_KEY`

### Common Hosting Platforms:

- **Vercel**: Environment Variables > Add new variable
- **Netlify**: Build & Deploy > Environment > New variable
- **AWS Amplify**: App Settings > Environment variables

---

## Troubleshooting

### "Failed to send subscription request"

- Check that all environment variables are correctly set
- Verify EmailJS credentials in `.env` file
- Check EmailJS dashboard for service/template configuration

### "Property 'env' does not exist on type 'ImportMeta'"

- This has been fixed with the `vite-env.d.ts` file
- If you still see this error, run:
  ```bash
  npm run lint
  ```

### Form doesn't send

- Check browser console for errors (`F12` > Console)
- Ensure Email Service ID and Template ID match your EmailJS dashboard
- Verify the Public Key is correct (not the private key)

### Styling issues

- The form uses Tailwind CSS which should be already configured
- Check that your existing Tailwind configuration includes the src directory

---

## File Changes Summary

### New Files Created:

1. `.env` - Environment variables with your EmailJS credentials
2. `src/vite-env.d.ts` - TypeScript type definitions for Vite env variables
3. `src/SubscriptionForm.tsx` - Alternative standalone component (if needed for reference)

### Modified Files:

1. `src/App.tsx` - Updated imports and integrated EmailJS form
2. `.env.example` - Added EmailJS variable documentation
3. `tsconfig.json` - Updated to include Vite client types

---

## Next Steps

1. **Test the form** in development to ensure emails are being sent
2. **Configure your EmailJS template** to format the email as desired
3. **Deploy to production** with environment variables set
4. **Monitor submissions** via your EmailJS dashboard

---

## Security Notes

- ⚠️ Never expose your EmailJS **private key** in client-side code
- ✓ Only the **public key** is used in the frontend
- ✓ The `.env` file is added to `.gitignore` automatically
- ✓ Each environment should have its own `.env` file with appropriate credentials

---

## Support Resources

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **Vite Environment Variables**: https://vitejs.dev/guide/env-and-modes.html
- **React Hooks Documentation**: https://react.dev/reference/react

---

## Version Information

- **React**: ^19.0.0
- **@emailjs/browser**: Latest
- **Vite**: ^6.2.0
- **TypeScript**: ~5.8.2

---

Enjoy your EmailJS-powered subscription form! 🚀
