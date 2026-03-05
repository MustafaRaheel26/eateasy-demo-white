import React, { useRef, useState } from "react";
import { Mail, AlertCircle, CheckCircle, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY);

interface FormData {
  name: string;
  company: string;
  address: string;
  email: string;
  phone: string;
  employees: string;
  plan: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export const SubscriptionForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    address: "",
    email: "",
    phone: "",
    employees: "",
    plan: "Plant Based $14.99",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.address ||
      !formData.phone ||
      !formData.employees ||
      !formData.plan
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    setFormStatus({
      type: "loading",
      message: "Sending your subscription request...",
    });

    try {
      if (!formRef.current) {
        throw new Error("Form reference not found");
      }

      const response = await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY,
      );

      if (response.status === 200) {
        setFormStatus({
          type: "success",
          message: "Subscription request sent successfully!",
        });

        // Clear form
        setFormData({
          name: "",
          company: "",
          address: "",
          email: "",
          phone: "",
          employees: "",
          plan: "Plant Based $14.99",
          message: "",
        });

        if (formRef.current) {
          formRef.current.reset();
        }

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus({
            type: "idle",
            message: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send subscription request. Please try again.",
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          type: "idle",
          message: "",
        });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Join Eat Easy
          </h1>
          <p className="text-lg text-slate-600">
            Subscribe to our meal delivery service and enjoy fresh, plant-based
            or signature meals delivered to your door.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Status Messages */}
          {formStatus.type !== "idle" && (
            <div
              className={`p-4 sm:p-6 flex items-start gap-4 ${
                formStatus.type === "success"
                  ? "bg-emerald-50 border-b border-emerald-200"
                  : formStatus.type === "error"
                    ? "bg-red-50 border-b border-red-200"
                    : "bg-blue-50 border-b border-blue-200"
              }`}
            >
              <div className="flex-shrink-0">
                {formStatus.type === "success" && (
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                )}
                {formStatus.type === "error" && (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
                {formStatus.type === "loading" && (
                  <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                )}
              </div>
              <div className="flex-grow">
                <p
                  className={`font-semibold ${
                    formStatus.type === "success"
                      ? "text-emerald-900"
                      : formStatus.type === "error"
                        ? "text-red-900"
                        : "text-blue-900"
                  }`}
                >
                  {formStatus.type === "success"
                    ? "Success"
                    : formStatus.type === "error"
                      ? "Error"
                      : "Processing"}
                </p>
                <p
                  className={`text-sm ${
                    formStatus.type === "success"
                      ? "text-emerald-700"
                      : formStatus.type === "error"
                        ? "text-red-700"
                        : "text-blue-700"
                  }`}
                >
                  {formStatus.message}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Company */}
            <div className="mb-6">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Office Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St, City, State, ZIP"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Number of Employees */}
            <div className="mb-6">
              <label
                htmlFor="employees"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Number of Employees *
              </label>
              <input
                type="number"
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                placeholder="Enter number of employees"
                min="1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Plan Selection */}
            <div className="mb-8">
              <label
                htmlFor="plan"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Meal Plan *
              </label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white cursor-pointer"
                required
              >
                <option value="Plant Based $14.99">
                  Plant Based - $14.99/meal
                </option>
                <option value="Signature $16.99">
                  Signature - $16.99/meal
                </option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your dietary preferences or special requests..."
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus.type === "loading"}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                formStatus.type === "loading"
                  ? "bg-slate-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg active:shadow-md"
              }`}
            >
              {formStatus.type === "loading" ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Subscribe Now
                </>
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-center text-sm text-slate-500 mt-6">
              We respect your privacy. Your information will only be used to
              process your subscription.
            </p>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-emerald-500">
            <h3 className="font-semibold text-slate-900 mb-2">
              Plant Based Plan
            </h3>
            <p className="text-slate-600 text-sm">
              Fresh vegetables, grains, and legumes. Perfect for vegans and
              health-conscious customers.
            </p>
            <p className="text-emerald-600 font-bold mt-3">$14.99/meal</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-500">
            <h3 className="font-semibold text-slate-900 mb-2">
              Signature Plan
            </h3>
            <p className="text-slate-600 text-sm">
              Our premium selection with lean proteins, fresh produce, and
              gourmet preparations.
            </p>
            <p className="text-teal-600 font-bold mt-3">$16.99/meal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
