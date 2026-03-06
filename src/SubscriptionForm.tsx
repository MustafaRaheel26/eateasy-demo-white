import React, { useRef, useState, useEffect } from "react";
import { Mail, AlertCircle, CheckCircle, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useSanityQuery } from "./hooks/useSanityQuery";

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

interface Plan {
  _id: string;
  title: string;
  price: number;
}

export const SubscriptionForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });
  const [planOptions, setPlanOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const { data: plans } = useSanityQuery<Plan[]>(
    `*[_type == "plan"] | order(price asc){title, price, description}`,
  );

  const cardItems =
    plans && plans.length > 0
      ? plans
      : [
          {
            title: "Plant Based",
            price: 14.99,
            description:
              "Fresh vegetables, grains, and legumes. Perfect for vegans and health-conscious customers.",
          },
          {
            title: "Signature",
            price: 16.99,
            description:
              "Our premium selection with lean proteins, fresh produce, and gourmet preparations.",
          },
        ];

  const fallbackPlanOptions = [
    { value: "Plant Based $14.99", label: "Plant Based - $14.99/meal" },
    { value: "Signature $17.99", label: "Signature - $17.99/meal" },
  ];

  useEffect(() => {
    if (plans && plans.length > 0) {
      setPlanOptions(
        plans.map((p) => ({
          value: `${p.title} $${p.price.toFixed(2)}`,
          label: `${p.title} - $${p.price.toFixed(2)}/meal`,
        })),
      );
    } else {
      setPlanOptions(fallbackPlanOptions);
    }
  }, [plans]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    address: "",
    email: "",
    phone: "",
    employees: "",
    plan: fallbackPlanOptions[0].value,
    message: "",
  });

  // when plan options change, set default if empty
  useEffect(() => {
    if (!formData.plan && planOptions.length > 0) {
      setFormData((prev) => ({ ...prev, plan: planOptions[0].value }));
    }
  }, [planOptions]);

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
          plan: planOptions[0]?.value || fallbackPlanOptions[0].value,
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
                {planOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
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

        {/* Info Cards (dynamic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          {cardItems.map((p) => {
            const colorClass = p.title.toLowerCase().includes("plant")
              ? "text-emerald-600"
              : "text-teal-600";
            const borderColor = p.title.toLowerCase().includes("plant")
              ? "#10b981"
              : "#14b8a6";
            return (
              <div
                key={p.title}
                className="bg-white rounded-lg p-6 shadow-md border-l-4"
                style={{ borderColor }}
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {p.title} Plan
                </h3>
                <p className="text-slate-600 text-sm">{p.description}</p>
                <p className={`font-bold mt-3 ${colorClass}`}>
                  ${p.price.toFixed(2)}/meal
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
