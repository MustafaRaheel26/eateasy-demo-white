# EmailJS Template Field Mapping

## Form Field Names (HTML input name attributes)

These field names MUST match your EmailJS email template variables exactly:

### Required Fields:

```
office_name       → Office/Company Name
contact_name      → Contact Person's Full Name
work_email        → Work Email Address
phone             → Phone Number
team_size         → Number of Team Members
preferred_plan    → Selected Meal Plan
```

### Optional Fields:

```
message           → Customer Message / Special Requests
```

## EmailJS Template Setup

If you haven't already set up your EmailJS template, here's how to configure it:

### Step 1: Create Email Template in EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/
2. Select your Service
3. Create New Template
4. Use the following template variables in your email content:

```
Hello {{contact_name}},

Thank you for your subscription inquiry!

Office: {{office_name}}
Email: {{work_email}}
Phone: {{phone}}
Team Size: {{team_size}} employees
Preferred Plan: {{preferred_plan}}

Special Requests/Message:
{{message}}

We will contact you within 24 hours to discuss your requirements.

Best regards,
Eat Easy Team
```

### Step 2: Verify Field Names

- Make sure every `{{variable}}` in your template matches the form field names listed above
- Field names are case-sensitive
- Do NOT include extra spaces in variable names

### Step 3: Get Your IDs

- **Service ID**: Found in your EmailJS settings (e.g., `service_xxxxxxxxx`)
- **Template ID**: Found in your template details (e.g., `template_xxxxxxxxx`)
- **Public Key**: Found in your account settings > API Keys (e.g., `xxxxxxxxxxxxxxxxx`)

### Step 4: Update .env

Copy these values to your `.env` file:

```env
VITE_EMAIL_SERVICE_ID=your_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key
```

---

## Form Submission Flow

```
User Input
    ↓
Form Validation (checks all required fields)
    ↓
Loading State (button disabled, spinner shows)
    ↓
EmailJS sendForm() called with:
  - Service ID
  - Template ID
  - Form Reference (contains all field values)
  - Public Key
    ↓
Email Sent to Recipients (as configured in your template)
    ↓
Success/Error Message Displayed
    ↓
Form Clears (if successful)
    ↓
Message Auto-hides after 5 seconds
```

---

## Debugging Your EmailJS Template

If emails aren't being sent, check:

1. ✓ Field names in form match template variable names
2. ✓ Service ID is correct
3. ✓ Template ID is correct
4. ✓ Public key is correct (NOT the private key)
5. ✓ Template has recipient email configured
6. ✓ Template is published/active
7. ✓ Check EmailJS dashboard for any error logs

---

## Current Form Field Names (from src/App.tsx)

The form is already configured with these names:

```jsx
<input name="contact_name" ... />    // Contact Person's Full Name
<input name="office_name" ... />     // Office/Company Name
<input name="work_email" ... />      // Work Email Address
<input name="phone" ... />           // Phone Number
<input name="team_size" ... />       // Number of Team Members
<select name="preferred_plan" ... /> // Meal Plan Selection
<textarea name="message" ... />      // Optional Message
```

---

These field names are ready to use with your EmailJS template! 🎯
